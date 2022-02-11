import { useEffect, useState, useRef } from "react"

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { remoteServer } from "../../config";

function COTDLineShart(props){

    return(
        <div style={{"marginTop": '1em', "marginBottom": '1em'}}>
            <h2 style={{marginTop: '2em', marginBottom: '2em', textDecoration: 'underline'}}>Evolution of Div and DivRank</h2>
            <ResponsiveContainer width="99%" height={400}>
                <LineChart
                width={500}
                height={300}
                data={props.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                    <XAxis tickSize={10} minTickGap={1}/>
                
                    <YAxis 
                        domain={[0, 64]} 
                        label={{ value: 'Rank', position: 'outsideLeft', dx:-20}}
                    />
                    <YAxis 
                        yAxisId='1' 
                        orientation='right' 
                        label={{ value: 'Div', position: 'insideRight', dx:20}}
                    />
                    <Tooltip labelFormatter={(totalplayers) => 'Date: '+ props.data[totalplayers].timestamp}/>
                    <Legend />
                    
                    <Line type="monotone" dataKey="divrank" stroke="#82ca9d" strokeWidth={2}/>
                    <Line 
                        type="monotone" 
                        dataKey="div" 
                        stroke="#8884d8" 
                        yAxisId='1' 
                        strokeWidth={4}
                    />
                </LineChart>    
            </ResponsiveContainer>

            <h2 style={{marginTop: '2em', marginBottom: '2em', textDecoration: 'underline'}}>Evolution of top percentage</h2>
            <ResponsiveContainer width="99%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <XAxis tickSize={10}/>
                
                    <YAxis 
                        domain={[0, 64]} 
                        label={{ value: 'Percent', position: 'outsideLeft' }}
                    />
                    <YAxis 
                        yAxisId='1' 
                        orientation='right' 
                        axisLine={false} //hidden YAxis to keep the charts to the same size, same for next one
                    />
                    <Tooltip labelFormatter={(totalplayers) => 'Date: '+ props.data[totalplayers].timestamp}/>
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="percent" 
                        stroke="#8884d8"  
                        strokeWidth={4}
                    />
                </LineChart>    
            </ResponsiveContainer>

            <h2 style={{marginTop: '2em', marginBottom: '2em', textDecoration: 'underline'}}>Amount of Players</h2>
            <ResponsiveContainer width="99%" height={400}>
                <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <XAxis tickSize={10}/>
                
                    <YAxis 
                        domain={[0, 64]} 
                        label={{ value: 'players', position: 'outsideLeft', dx:-20}}
                    />
                    <YAxis 
                        yAxisId='1' 
                        orientation='right' 
                        axisLine={false}
                    />
                    <Tooltip labelFormatter={(totalplayers) => 'Date: '+ props.data[totalplayers].timestamp}/>
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="totalplayers" 
                        stroke="#8884d8"  
                        strokeWidth={4}
                    />
                </LineChart>    
            </ResponsiveContainer>


        </div>
        
    )
}


export function COTDStats(props){

    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(props.loading)
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
        console.log("entering useeffect");
        console.log(prevPlayer.current, props.accountID);
        if(prevPlayer.current !== props.accountID){
            setLoading(true);
            console.log("passed if statement")
            // let url = 'COTDStats?accountid=' + props.accountID;
            const url  = (`${remoteServer}/COTDStats?accountID=${accountID}`).toLowerCase();
            // url = 'https://tm-stats-bknd.herokuapp.com/COTDstats?accountid=957c9eb3-228b-4244-8e6c-834f7300dca5'
            if(localStorage.getItem(url) !== null){  
                console.log(`checking if ${url} is in cache`);
                let response = JSON.parse(localStorage.getItem(url)).data;
                
                let timestamp = new Date(JSON.parse(localStorage.getItem(url)).timestamp).getTime();
                let now = new Date().getTime();
                if(timestamp + 24*60*60*1000 < now){
                    console.log(`${url} is in cache but more than 24 hours old, deleting`)
                    localStorage.removeItem(url); // remove the current url from localStorage if it is more than 24 hours old (24*60*60*1000 ms)
                } else {
                    console.log(`${url} is in cache and still valid, Okayge`)
                    setData(response)
                    setLoading(false);
                    buildChartData(response.cotds);
                }
            } else {
                console.log(`${url} not in cache, fetching`);
                fetch(url)  
                .then(function(result){
                    return(result.json())
                })
                .then((result) => {
                    console.log(`setting result from ${url} as data`)
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
    // console.log(chartData);


    return(
        <div className='trackmania-player-details'>
            <div>
                {loading && (
                    <span>Loading...</span>
                )}
            </div>
            <div>
                {data !== null && loading === false && (
                    <div>
                        <div>Player: {props.player}</div>
                        <div>Total played COTDs: {data.total}</div>
                        <div>Average div: {(Math.round(data.stats.avgdiv * 100) / 100).toFixed(2)}</div>
                    </div>
                )}
            </div>
            <div>
                {chartData !== null && loading === false && (
                    <COTDLineShart data={chartData}/>
                )}
            </div>
            <div>
                {props.accountID}
            </div>
            
        </div>
        
    )
}