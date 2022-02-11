import { useEffect, useState, useRef } from "react"


export function COTDStats(props){

    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true)
    const accountID = props.accountID;
    const prevPlayer = useRef();

    function buildChartData(rawData){
        let lineChartData = [];
        for(let i = 0; i < rawData.length; ++i){
            if(rawData[i].name.includes("#1")){
                let date = new Date(rawData[i].timestamp)
                let formattedDate = date.getDate() + '/' + (date.getMonth() +1) + '/' + (date.getFullYear());
                lineChartData.push({
                    'name': rawData[i].id, 
                    'div': rawData[i].div, 
                    'divrank': rawData[i].divrank === 0 ? 64 : rawData[i].divrank, 
                    'percent': (Math.floor(100*rawData[i].rank/rawData[i].totalplayers)),
                    'totalplayers': rawData[i].totalplayers,
                    'timestamp': formattedDate
                })
            }
        }
        console.log(lineChartData);
        setChartData(lineChartData.reverse());
        return
    }


    useEffect(() => {
        
        if(prevPlayer.current !== props.accountID){
            
            let url = 'COTDStats?accountid=' + props.accountID;
            url = url.toLowerCase();
            
            if(localStorage.getItem(url) !== null){  
                console.log('cached')
                let response = JSON.parse(localStorage.getItem(url)).data;
                
                let timestamp = new Date(JSON.parse(localStorage.getItem(url)).timestamp).getTime();
                let now = new Date().getTime();
                if(timestamp + 24*60*60*1000 < now){
                    localStorage.removeItem(url); // remove the current url from localStorage if it is more than 24 hours old (24*60*60*1000 ms)
                } else {
                    setData(response)
                    setLoading(false);
                    buildChartData(response.cotds);
                }
            } else {
                fetch(url)  
                .then(function(result){
                    return(result.json())
                })
                .then((result) => {
                    setData(result);
                    setLoading(false);
                    buildChartData(result.cotds);                    
                    localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result}));
                })
                .catch(function(error){
                    console.log(error);
                });    

            }
            
            prevPlayer.current = props.accountID;
        }
        
    }, [props.accountID]);
    console.log(chartData);


    return(
        <div>Work In Progress {props.playerID}</div>
    )
}