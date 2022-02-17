import { useEffect, useState, useRef } from "react"

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { remoteServer } from "../../config";

import { LoadingIcon } from "../../Component/UpdateButton/LoadingIcon";

import useWindowDimensions from "../../WindowDimensions";

function COTDLineShart(props){
    const {width} = useWindowDimensions();
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
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
                >
                    <XAxis tickSize={10} minTickGap={1}/>
                
                    <YAxis 
                        domain={[0, 64]} 
                        // label={{ value: width > 1024 ? 'rank' : 'r', position: 'outsideLeft', dx:-20}}
                    />
                    <YAxis 
                        yAxisId='1' 
                        orientation='right' 
                        // label={{ value: width > 1024 ? 'Div' : 'd', position: 'insideRight', dx:20}}
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
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                    >
                    <XAxis tickSize={10}/>
                
                    <YAxis 
                        domain={[0, 64]} 
                        // label={{ value: '%', position: 'outsideLeft' }}
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
                        right: 0,
                        left: 0,
                        bottom: 5,
                    }}
                    >
                    <XAxis tickSize={10}/>
                
                    <YAxis 
                        domain={[0, 64]} 
                        // label={{ value: width > 1024 ? 'players' : '', position: 'outsideLeft', dx:-20}}
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
    const [loading, setLoading] = useState(true);
    const accountID = props.accountID;
    const prevPlayer = useRef();

    function buildChartData(rawData){
        console.log("buildChartData");
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
            //case where data is too old and doesnt contain the cotd type (main, rerun)
            if(!rawData[i].name.includes('#')){
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
        
        setChartData(lineChartData.reverse());
        console.log("buildChartdata... done")
        return
    }


    useEffect(async () => {
        console.log("entering useEffect");
        if(prevPlayer.current !== props.accountID){
            console.log("new player")
            await switchLoad(true);
            setData(null);
            setChartData(null);
            const url  = (`${remoteServer}/COTDStats?accountID=${accountID}`).toLowerCase();
            if(localStorage.getItem(url) !== null){
                console.log("localstorage isnt empty")
                let response = JSON.parse(localStorage.getItem(url)).data;
                
                let timestamp = new Date(JSON.parse(localStorage.getItem(url)).timestamp).getTime();
                let now = new Date().getTime();
                if(timestamp + 24*60*60*1000 < now){
                    console.log("localstorage outdated")
                    localStorage.removeItem(url); // remove the current url from localStorage if it is more than 24 hours old (24*60*60*1000 ms)
                } else {
                    if(!response){
                        console.log("no data to displa");
                        setData(null);
                        await switchLoad(false);
                        return;
                    }
                    console.log("local storage is up to date, setting data");
                    setData(response)
                    buildChartData(response.cotds);
                    await switchLoad(false);
                    return
                }
            }
                console.log("nothing in localstorage, fetching")
                fetch(url)  
                .then(function(result){
                    console.log("fetch step 1")
                    return(result.json())
                })
                .then(async (result) => {
                    if(!result){
                        console.log("fetched data has nothing to show");
                        setData(null);
                        await switchLoad(false);
                        return;
                    }
                    console.log("setting data with fetched result")
                    setData(result);
                    buildChartData(result.cotds);            
                    await switchLoad(false);        
                    localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result}));
                    console.log("cached")
                })
                .catch(function(error){
                    console.log(error);
                });    

            
            prevPlayer.current = props.accountID;
        }
        
    }, [props.accountID, accountID]);

    async function switchLoad(newLoad){
        console.log("setting load to " + newLoad);
        setLoading(newLoad);
    }
    

    return(
        <div className='trackmania-player-details'>
            <div>
                {loading && (
                    <LoadingIcon/>
                )}
                {!data && (
                    <div>No data to display for this player</div>
                )}
            </div>
            <div style={{display: 'flex', 'justifyContent': 'space-around'}}>
                {data !== null && (
                    <div className="cells">
                        <div className="data-display">
                            <div className="cell-title">Total played</div> 
                            <div className="cell-data">{data.total}</div>
                        </div>
                        <div className="data-display">
                            <div className="cell-title"> Average div: </div>
                            <div className="cell-data">{(Math.round(data.stats.avgdiv * 100) / 100).toFixed(2)}</div>
                        </div>
                        <div className="data-display">
                            <div className="cell-title"> Best pos: </div>
                            <div className="cell-data">{data.stats.bestoverall.bestrank}</div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {chartData !== null && (
                    <COTDLineShart data={chartData}/>
                )}
            </div>
            <div>
                {props.accountID}
            </div>
            
        </div>
        
    )
}