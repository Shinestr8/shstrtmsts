import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import { PlayerRank } from "./PlayerRank";
import { TrophyDistribution } from "./TrophyDistribution";

import { UpdateButton } from "../../Component/UpdateButton/UpdateButton";
import { useEffect, useState, useRef } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { remoteServer } from "../../config";
import { LoadingIcon } from "../../Component/UpdateButton/LoadingIcon";

export function GeneralStats(props){
    // const data = props.data;
    // const loading = props.loading;
    // const regions = props.regions;

    const [load, setLoad] = useState(false);
    const [data, setData] = useState(null);
    const [regions, setRegions] = useState(null);
    

    let [showUpdate, setShowUpdate] = useState(false);
    let playerNameParam = useParams().player;
    const prevPlayer = useRef();
    const navigate = useNavigate();

    function findPlayerRegions(zone){
        // console.log("entering findPlayerRegions")
        let zoneName = zone.name;
        let zoneList = [zone]
        while(zoneName !== 'World'){
            zone = zone.parent;
            zoneName = zone.name;
            zoneList.push(zone)
        }
        setRegions (zoneList);
    }


    useEffect(()=>{
        if(prevPlayer.current !== playerNameParam){
            setLoad(true);
            setData(null);
            setRegions(null);
            const url  = (`${remoteServer}/findTrokmoniPlayer?player=${playerNameParam}`).toLowerCase();

            if(localStorage.getItem(url) !== null){ 
                let cached = JSON.parse(localStorage.getItem(url));
                let timestamp = new Date(cached.timestamp).getTime();
                let now = new Date().getTime();
                if(timestamp + 12*60*60*1000 < now){
                    // console.log("local storage is too old");
                    localStorage.removeItem(url); //ditch the stored value if it is more than 12 hours old
                } else {                          //Otherwise, if the player is found and data is less than 12 hours old, set data in the state
                    // console.log("local storage is less than 12 hours old");
                    setData(cached.data);
                    findPlayerRegions(cached.data.trophies.zone);
                    setLoad(false);
                    return;
                }
    
                //If nothing is found in the localstorage for the requested player, send a fetch request to the backend server
            }
            // console.log("nothing in the localstorage, gonna fetch");
            fetch(url)
            .then(function(result){
                // console.log("first then");
                return result.json();
            })
            .then(function(result){
                // console.log("second then");
                if(result.length){ //If the length of result is defined, we're in the case of a list of player
                    // console.log("data is a list of player");
                    navigate('/');
                    setLoad(false);
                    return; //exit the function
                }
                // console.log("data isnt a list");
                //otherwise, set the data state with fetched data. It can be player details or a message
                setData(result);
                if(result.trophies){ //only try to process the regions if result isnt just an error message
                    findPlayerRegions(result.trophies.zone);
                }
                setLoad(false);
                // console.log("saving to cache");
                // navigate(`${result.displayname}/General`);
                if(!result.displayname){
                    navigate('/');
                }
                localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result})); //set the result to the locaslstorage
            })
            .catch(function(error){
                setData({message: 'An error occured, server might be offline'}); //set message in case catch is called
                navigate('/');
                console.log(error);
            })
            prevPlayer.current = playerNameParam;
        }
    }, [playerNameParam, navigate])


    return(
        <div className="content-body">
                    {load && (
                        <LoadingIcon/>
                    )}
                    {data && !load && regions && (
                        <div>
                            <h1 
                                className="player-name" 
                                onMouseEnter={()=>setShowUpdate(true)} 
                                onMouseLeave={()=>setShowUpdate(false)}
                            >
                                {data.displayname} 
                                {/* <UpdateButton show={showUpdate} onClick={props.forceUpdate}/> */}
                            </h1>
                            
                            <div className="section">
                                <h2 className="section-title">General</h2>
                                <GeneralPlayerInfo data={data} regions={regions}/>
                            </div>

                            <div className="section">
                                <h2 className="section-title">Rank</h2>
                                <PlayerRank data={data} regions={regions}/>
                            </div>

                            <div className="section">
                                <h2 className="section-title">Trophy Distribution</h2>
                                <TrophyDistribution data={data}/>
                            </div>
                            
                        </div>
                    )}
        </div>
    )
}