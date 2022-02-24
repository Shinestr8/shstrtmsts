import React, { useEffect, useState, useRef } from "react"

import { remoteServer } from "../../config";

import { LoadingIcon } from "../../Component/UpdateButton/LoadingIcon";

import { COTDLineChart } from "./COTDLineChart";

import { useParams, useNavigate } from "react-router-dom";

import { UpdateButton } from "../../Component/UpdateButton/UpdateButton";

export function COTDStats(props){
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoad] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);
    // const accountID = props.accountID;

    const prevPlayer = useRef();
    const playerNameParam = useParams().player;
    const navigate = useNavigate();


    // function forceUpdateCOTD(){
    //     setLoad(true);
    //     setData(null);
    //     setChartData(null);
    //     const url  = (`${remoteServer}/COTDStats?accountID=${accountID}`).toLowerCase();
    //     if(localStorage.getItem(url) !== null){
    //         localStorage.removeItem(url); // remove the current url from localStorage if it is more than 24 hours old (24*60*60*1000 ms)
    //     }
            
    //         fetch(url + '&forceupdate=true')  
    //         .then(function(result){
    //             return(result.json())
    //         })
    //         .then((result) => {
    //             if(!result){
    //                 setData(null);
    //                 setLoad(false);
    //                 return;
    //             }
    //             setData(result);
    //             buildChartData(result.cotds);            
    //             setLoad(false);        
    //             localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result}));
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         });    
    //     }

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
        return
    }

    function findPlayerID(player){
        const url  = (`${remoteServer}/findTrokmoniPlayer?player=${player}`).toLowerCase();
        if(localStorage.getItem(url) !== null){
            let cached = JSON.parse(localStorage.getItem(url));
            return cached.data.accountid;
        } else {
            fetch(url)
            .then(function(result){
                return result.json();
            })
            .then(function(result){
                localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result}));

                return result.accountid;
            })
        }
    }


    useEffect(() => {
        if(prevPlayer.current !== playerNameParam){
            setLoad(true);
            setData(null);
            setChartData(null);

            let id = findPlayerID(playerNameParam);

            const url  = (`${remoteServer}/COTDStats?accountID=${id}`).toLowerCase();
            if(localStorage.getItem(url) !== null){
                let response = JSON.parse(localStorage.getItem(url)).data;
                
                let timestamp = new Date(JSON.parse(localStorage.getItem(url)).timestamp).getTime();
                let now = new Date().getTime();
                if(timestamp + 24*60*60*1000 < now){
                    localStorage.removeItem(url); // remove the current url from localStorage if it is more than 24 hours old (24*60*60*1000 ms)
                } else {
                    if(!response){
                        setData(null);
                        setLoad(false);
                        return;
                    }
                    setData(response)
                    buildChartData(response.cotds);
                    setLoad(false);
                    return
                }
            }
                
                fetch(url)  
                .then(function(result){
                    return(result.json())
                })
                .then(async (result) => {
                    if(!result){
                        setData(null);
                        setLoad(false);
                        return;
                    }
                    setData(result);
                    buildChartData(result.cotds);            
                    setLoad(false);        
                    localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result}));
                })
                .catch(function(error){
                    setData({message: 'An error occured, server might be offline'}); //set message in case catch is called
                    console.log(error);
                });    

            
            prevPlayer.current = playerNameParam;
        }
        
    }, [playerNameParam]);
    

    return(
        <div className='trackmania-player-details'>
            <div>
                {loading && !data && (
                    <LoadingIcon/>
                )}
                {!data && !loading && (
                    <div className="error-message">No data to display for this player</div>
                )}
                {data && data.message && (
                    <div className="error-message">{data.message}</div>
                )}
            </div>
            {data && !data.message && (
                <React.Fragment>
                    <h1 
                        className="player-name" 
                        onMouseEnter={()=>setShowUpdate(true)} 
                        onMouseLeave={()=>setShowUpdate(false)}
                    >
                        {playerNameParam} 
                        {/* <UpdateButton show={showUpdate} onClick={forceUpdateCOTD}/> */}
                    </h1>
                    <div className="top-infos">
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
                            <COTDLineChart data={chartData}/>
                        )}
                     </div>
                </React.Fragment>
            )}
            
            
        </div>
        
    )
}