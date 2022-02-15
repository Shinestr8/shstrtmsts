import { useState } from "react"

import { remoteServer } from "../config";
import useWindowDimensions from "../WindowDimensions";


import { GeneralStats } from "./GeneralStats/GeneralStats";
import { COTDStats } from "./COTDStats/COTDStats";
import { MenuList } from "./MenuList";
import { PlayerList } from "./GeneralStats/PlayerList";



import "./trackmania.css";
import "./responsive.css";

// import { UpdateButton } from "../Component/UpdateButton/UpdateButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { LoadingIcon } from "../Component/UpdateButton/LoadingIcon";

export function Trackmania(){

    let [textInput, setTextInput] = useState("");
    let [player, setPlayer] = useState("");
    let [data, setData] = useState(null);
    let [regions, setRegions] = useState(null);
    let [loading, setLoading] = useState(false);
    let [playerList, setPlayerList] = useState(null);
    let [menu, setMenu] = useState('general');


    function selectMenu(newMenu){
        setMenu(newMenu);
    }

    //function called on click of a player in player list
    function playerSelect(player){
        findTrokmoniPlayer(player);
        setPlayer(player);
        setTextInput(player);
    }


    //state change on input
    function updateTextInput(e){
        setTextInput(e.target.value);
    }



    //function that fills the Region state
    function findPlayerRegions(zone){
        let zoneName = zone.name;
        let zoneList = [zone]
        while(zoneName !== 'World'){
            zone = zone.parent;
            zoneName = zone.name;
            zoneList.push(zone)
        }
        setRegions (zoneList);
    }




    //function similar to findTrokmoniPlayer, except it bypasses the caching
    function forceUpdate(){
        const url  = (`${remoteServer}/forceUpdate?player=${textInput}`).toLowerCase();
        //reset previous search: data = null, loading = true
        setLoading(true); 
        setData(null);
        setRegions(null);
        
        fetch(url)
        .then(function(result){
            return result.json();
        })
        .then(function(result){
            setData(result);
            setLoading(false);
            localStorage.setItem((`${remoteServer}/findTrokmoniPlayer?player=${textInput}`).toLowerCase(), JSON.stringify({timestamp: new Date(), data: result}));
            findPlayerRegions(result.trophies.zone);
        })
        .catch(function(error){
            console.log(error);
        })
    }




    //This function only takes a player name as an argument
    //It will first check if the player is stored in the localstorage and if the stored data is less than 12 hours long
    //If not, it will make a call to the backend server to fetch the data
    //Expected data is:
    //1) if there are player with similar names, a list of players
    //2) if there is an exact match, the details of the specific player
    //3) if there is no match, an object with the message "player not found"
    function findTrokmoniPlayer(player){

        const url  = (`${remoteServer}/findTrokmoniPlayer?player=${player}`).toLowerCase();
        //reset previous search: data = null, loading = true
        setLoading(true); 
        setData(null);
        setRegions(null);
        setPlayerList(null);

        //First, check the local storage for the requested url
        if(localStorage.getItem(url) !== null){ //
            let cached = JSON.parse(localStorage.getItem(url));
            let timestamp = new Date(cached.timestamp).getTime();
            let now = new Date().getTime();
            if(timestamp + 12*60*60*1000 < now){
                localStorage.removeItem(url); //ditch the stored value if it is more than 12 hours old
            } else {                          //Otherwise, if the player is found and data is less than 12 hours old, set data in the state
                setData(cached.data);
                findPlayerRegions(cached.data.trophies.zone);
                setLoading(false);
            }

            //If nothing is found in the localstorage for the requested player, send a fetch request to the backend server
        } else {
            fetch(url)
            .then(function(result){
                return result.json();
            })
            .then(function(result){
                if(result.length){ //If the length of result is defined, we're in the case of a list of player
                    setPlayerList(result);
                    setLoading(false);
                    return; //exit the function
                }
                //otherwise, set the data state with fetched data. It can be player details or a message
                setData(result);
                if(result.trophies){ //only try to process the regions if result isnt just an error message
                    findPlayerRegions(result.trophies.zone);
                }
                setLoading(false);
                localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result})); //set the result to the locaslstorage
            })
            .catch(function(error){
                setData({message: 'An error occured, server might be offline'}); //set message in case catch is called
                console.log(error);
            })
        }

        
    }

    //function called on button click.
    //set the player to current textInput, and call the findTrokmoniPlayer function
    function fetchPlayerInfo(e){
        e.preventDefault();
        setLoading(true);
        setPlayer(textInput);
        findTrokmoniPlayer(textInput);
    }


    const {width} = useWindowDimensions();

    return(
        <div>
            <form className={player ? "input-group-small" : "input-group-big"}>
                <input 
                    className="text-input" 
                    type="text" 
                    placeholder="Search a player" 
                    value={textInput} 
                    onChange={updateTextInput}
                />
                <button 
                    className="submit-button" 
                    type="submit" onClick={fetchPlayerInfo} 
                    disabled={textInput.length < 4 ? true : false}
                >
                    <div className="button-text">
                        {width > 1024 ? <span><FontAwesomeIcon icon={faMagnifyingGlass}/> Search Player</span> : <FontAwesomeIcon icon={faMagnifyingGlass}/>}
                        
                    </div>
                </button>
                {/* {data && !data.message && !loading &&(
                    <UpdateButton onClick={forceUpdate}/>
                )} */}
            </form>
        
            
            <div className="content">
                    {loading && (
                        <LoadingIcon/>
                    )}
                     {playerList && (
                        <div>
                            <div>No exact match for player <strong>{player}</strong>, is it one of the following ?</div>
                            <PlayerList data={playerList} onClick={playerSelect}/>
                        </div>
                    )}
                    
                    
                {data && (
                    <MenuList menus={['general', 'cotd']} handleClick={selectMenu} selected={menu}/>
                )}


                    {data && data.message &&(
                        <div>
                            <div>{data.message}</div>
                            <img 
                                title="marcINSPECT" 
                                alt='marcINSPECT' 
                                src={`${process.env.PUBLIC_URL}/gif/marc-inspect-inspect.gif`} 
                                style={{"width": "20em"}}
                            />
                        </div>
                    )}

                    {player.toLowerCase() === 'agonix' && (
                        <img 
                        title="winke" 
                        alt='winke' 
                        src={`${process.env.PUBLIC_URL}/gif/winke.gif`} 
                        style={{"width": "20em"}}
                    />
                    )}
                
                {menu === 'general' && (
                    <GeneralStats
                        player={player}
                        data={data}
                        loading={loading}
                        playerList={playerList}
                        regions={regions}
                     />
                )}
                {menu === 'cotd'  && data && data.accountid && (
                    <COTDStats 
                        accountID={data.accountid}
                        loading={loading}
                />
                )}  
                </div>
            </div> 
    )
}