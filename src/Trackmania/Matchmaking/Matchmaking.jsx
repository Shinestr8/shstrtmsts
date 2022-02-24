import { useState, useRef, useEffect } from "react";
import { MainMM } from "./MainMM";
import { Royal } from "./Royal";

import { useParams, useNavigate } from "react-router-dom";

import { UpdateButton } from "../../Component/UpdateButton/UpdateButton";

import { remoteServer } from "../../config";

export function Matchmaking(){
    const [showUpdate, setShowUpdate] = useState(false);

    const [data, setData] = useState(null);
    const [load, setLoad]  = useState(true);
    const playerNameParam = useParams().player;
    const prevPlayer = useRef();
    const navigate = useNavigate();

    useEffect(()=>{
        if(prevPlayer.current !== playerNameParam){
            setLoad(true);
            setData(null);
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

    // if(!load && !data[0] && !data[1]){
    //     return(
    //         <div className="error-message">This user has never played matchmaking, super sorry alexander</div>
    //     )
    // }

    return(
        <div className="content-body">
            <h1 
                className="player-name" 
                onMouseEnter={()=>setShowUpdate(true)} 
                onMouseLeave={()=>setShowUpdate(false)}
            >
                {playerNameParam} 
                {/* <UpdateButton show={showUpdate} onClick={props.forceUpdate}/> */}
            </h1>
            {data && data.matchmaking[0] && (
                <div className="section">
                    <h2 className="section-title">3v3</h2>
                    <MainMM data={data.matchmaking[0]}/>
                </div>
            )}
            
            {data && data.matchmaking[1] && (
                <div className="section">
                    <h2 className="section-title">Royal</h2>
                    <Royal data={data.matchmaking[1]}/>
                </div>
            )}
            
        </div>
    )
}