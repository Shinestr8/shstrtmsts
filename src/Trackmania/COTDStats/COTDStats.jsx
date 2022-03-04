import React, { useEffect, useState, useRef } from "react"

import { remoteServer } from "../../config";

import { LoadingIcon } from "../../Component/UpdateButton/LoadingIcon";

import { COTDLineChart } from "./COTDLineChart";

import { useParams} from "react-router-dom";

import { UpdateButton } from "../../Component/UpdateButton/UpdateButton";
import { ErrorMessage } from "../../StyledComponents/General/Error";

export function COTDStats(props){
    const [data, setData] = useState(null);
    const [displayname, setDisplayname] = useState('');
    const [accountid, setAccountid] = useState('');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoad] = useState(true);
    const [showUpdate, setShowUpdate] = useState(false);

    const prevPlayer = useRef();
    const playerNameParam = useParams().player;


    function forceUpdate(){
        setLoad(true);
        setData(null);
        setChartData(null);
        const url  = (`${remoteServer}/COTDStats?accountID=${accountid}`).toLowerCase();
        if(localStorage.getItem(url) !== null){
            localStorage.removeItem(url); // remove the current url from localStorage if it is more than 24 hours old (24*60*60*1000 ms)
        }
            
            fetch(url + '&forceupdate=true')  
            .then(function(result){
                return(result.json())
            })
            .then((result) => {
                setData(result);
                buildChartData(result.cotds);            
                setLoad(false);        
                localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result}));
            })
            .catch(function(error){
                console.log(error);
            });    
        }

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
            setDisplayname(cached.data.displayname);
            setAccountid(cached.data.accountid);
            return cached.data.accountid;

        } else {
            fetch(url)
            .then(function(result){
                return result.json();
            })
            .then(function(result){
                setDisplayname(result.displayname);
                setAccountid(result.accountid);
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
                    setLoad(false);
                    console.log(error);
                });    

            
            prevPlayer.current = playerNameParam;
        }
        
    }, [playerNameParam]);
    

    return(
        <div className='content-body'>
            <div>
                {loading && !data && (
                    <LoadingIcon/>
                )}
                {!data && !loading && (
                    <ErrorMessage>No data to display for this player</ErrorMessage>
                )}
                {data && data.message && (
                    <ErrorMessage className="error-message">{data.message}</ErrorMessage>
                )}
            </div>
            {data && !data.message && (
                <React.Fragment>
                    <h1 
                        className="player-name" 
                        onMouseEnter={()=>setShowUpdate(true)} 
                        onMouseLeave={()=>setShowUpdate(false)}
                    >
                        {displayname} 
                        <UpdateButton show={showUpdate} onClick={forceUpdate}/>
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