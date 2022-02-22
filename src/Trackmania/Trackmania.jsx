import { useState } from "react"

import { remoteServer } from "../config";
import useWindowDimensions from "../WindowDimensions";


import { GeneralStats } from "./GeneralStats/GeneralStats";
import { COTDStats } from "./COTDStats/COTDStats";
import { MenuList } from "./MenuList";
import { PlayerList } from "./GeneralStats/PlayerList";
import { Matchmaking } from "./Matchmaking/Matchmaking";



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




    //function called to update the general info and ignore the 12 hours cache life
    function forceUpdateGeneralInfo(){
        //keep the original url for interaction with the local storage
        const url  = (`${remoteServer}/findTrokmoniPlayer?player=${player}`).toLowerCase();
        //reset previous search: data = null, loading = true
        setLoading(true); 
        setData(null);
        setRegions(null);
        setPlayerList(null);

        //if the item exists, remove it as it will be updated
        if(localStorage.getItem(url) !== null){ 
            localStorage.removeItem(url); 
        }
        
        //whatever happens, fetch the original url with argument forceupdate = true
        fetch(url + '&forceupdate=true')
        .then(function(result){
            return result.json();
        })
        .then(async function(result){
            if(result.length){ 
                setPlayerList(result);
                setLoading(false);
                return; 
            }
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

    async function switchLoad(newLoad){
        // console.log("setting load to " + newLoad);
        setLoading(newLoad);
    }


    //This function only takes a player name as an argument
    //It will first check if the player is stored in the localstorage and if the stored data is less than 12 hours long
    //If not, it will make a call to the backend server to fetch the data
    //Expected data is:
    //1) if there are player with similar names, a list of players
    //2) if there is an exact match, the details of the specific player
    //3) if there is no match, an object with the message "player not found"
    async function findTrokmoniPlayer(player){
        // console.log("entering findTrokmoniPlayer function with parameter " + player);
        const url  = (`${remoteServer}/findTrokmoniPlayer?player=${player}`).toLowerCase();
        //reset previous search: data = null, loading = true
        await switchLoad(true); 
        setData(null);
        setRegions(null);
        setPlayerList(null);

        //First, check the local storage for the requested url
        if(localStorage.getItem(url) !== null){ //
            // console.log("local storag for " + url + " is not null");
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
                await switchLoad(false);
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
        .then(async function(result){
            // console.log("second then");
            if(result.length){ //If the length of result is defined, we're in the case of a list of player
                // console.log("data is a list of player");
                setPlayerList(result);
                await switchLoad(false);
                return; //exit the function
            }
            // console.log("data isnt a list");
            //otherwise, set the data state with fetched data. It can be player details or a message
            setData(result);
            if(result.trophies){ //only try to process the regions if result isnt just an error message
                findPlayerRegions(result.trophies.zone);
            }
            await switchLoad(false);
            // console.log("saving to cache");
            localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result})); //set the result to the locaslstorage
        })
        .catch(function(error){
            setData({message: 'An error occured, server might be offline'}); //set message in case catch is called
            console.log(error);
        })
    

    
    }

    //function called on button click.
    //set the player to current textInput, and call the findTrokmoniPlayer function
    async function fetchPlayerInfo(e){
        // console.log("calling fetchPlayerInfo")
        e.preventDefault();
        await switchLoad(true);
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
            </form>
        
            
            <div className="content">
                <div className="content-header">
                    {data && !data.message && (
                        <MenuList menus={['general', 'cotd', 'matchmaking']} handleClick={selectMenu} selected={menu}/>
                    )}
                </div>
                     
                {
                    // playerList || loading || data &&(
                        <div className="content-body" style={loading || playerList || data ? {} : {display: 'none'}}>

                    {playerList && (
                        <div>
                            <div>No exact match for player <strong>{player}</strong>, is it one of the following ?</div>
                            <PlayerList data={playerList} onClick={playerSelect}/>
                        </div>
                    )}

                    {loading && (
                        <LoadingIcon/>
                    )}
                
                    {data && data.message &&(
                        <div className="error-message">{data.message}</div>
                    )}
                
                    {menu === 'general' && (
                        <GeneralStats
                            player={player}
                            data={data}
                            loading={loading}
                            playerList={playerList}
                            regions={regions}
                            forceUpdate={forceUpdateGeneralInfo}
                        />
                    )}
                    {menu === 'cotd'  && data && data.accountid && (
                        <COTDStats 
                            accountID={data.accountid}
                            player={data.displayname}
                            loading={loading}
                    />
                    )}
                    {menu === 'matchmaking' && data && data.matchmaking && (
                        <Matchmaking data={data.matchmaking} displayname={data.displayname} forceUpdate={forceUpdateGeneralInfo}/>
                    )}
                    </div>
                    // )
                }
                
                </div>
            </div> 
    )
}