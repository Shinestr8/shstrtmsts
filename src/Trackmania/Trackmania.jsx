import { useEffect, useState } from "react"

import { remoteServer } from "../config";
import useWindowDimensions from "../WindowDimensions";
import { MenuList } from "./MenuList";
import { PlayerList } from "./GeneralStats/PlayerList";
import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";



import "./trackmania.css";
import "./responsive.css";

// import { UpdateButton } from "../Component/UpdateButton/UpdateButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { LoadingIcon } from "../Component/UpdateButton/LoadingIcon";

export function Trackmania(props){

    let [textInput, setTextInput] = useState("");
    let [player, setPlayer] = useState("");
    let [data, setData] = useState(null);
    let [loading, setLoading] = useState(false);
    let [playerList, setPlayerList] = useState(null);
    let [menu, setMenu] = useState('General');
    let ParamPlayer = useParams().player;

    let location = useLocation().pathname;
    let [prevLoc, setPrevLoc] = useState('/')

    const navigate = useNavigate();

    function selectMenu(newMenu){
        setMenu(newMenu);
    }

    useEffect(()=> {
        if(location !== prevLoc){
            if(location !== '/' || player || ParamPlayer){
                props.changeTitle('small');
            } else {
                props.changeTitle('big')
            }
            setPrevLoc(location);
        } 
    }, [ParamPlayer, player, location, prevLoc, props])

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

    //function called to update the general info and ignore the 12 hours cache life
    


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
        let loc = 'General';
        if(location.includes('/player')){
            let splitted = location.split('/');
            loc = splitted[splitted.length -1]
        }
        navigate('/');
        setLoading(true); 
        setData(null);
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
                navigate(`player/${cached.data.displayname}/${loc}`);
                setLoading(false);
                return;
            }

            //If nothing is found in the localstorage for the requested player, send a fetch request to the backend server
        }
        fetch(url)
        .then(function(result){
            return result.json();
        })
        .then(function(result){
            if(result.length){ //If the length of result is defined, we're in the case of a list of player
                navigate('/');
                setPlayerList(result);
                setLoading(false);
                return; //exit the function
            }
            //otherwise, set the data state with fetched data. It can be player details or a message
            setData(result);
            setLoading(false);
            navigate(`player/${result.displayname}/${loc}`);
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
    

    
    }

    //function called on button click.
    //set the player to current textInput, and call the findTrokmoniPlayer function
    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setPlayer(textInput);
        findTrokmoniPlayer(textInput);
    }


    const {width} = useWindowDimensions();
    let buttonText = <span><FontAwesomeIcon icon={faMagnifyingGlass}/> Search Player</span>
    if(width < 1024){
        buttonText = <FontAwesomeIcon icon={faMagnifyingGlass}/>
    } 

    return(
        <div>
            <form 
                className={player || ParamPlayer ? "input-group-small" : "input-group-big"}>
                <input 
                    className="text-input" 
                    type="text" 
                    placeholder="Search a player" 
                    value={textInput} 
                    onChange={updateTextInput}
                />
                <button 
                    className="submit-button" 
                    type="submit" onClick={handleSubmit} 
                    disabled={textInput.length < 4 ? true : false}
                >
                    <div className="button-text">
                        {buttonText}
                        
                    </div>
                </button>
            </form>
        
            
            <div className="content">
                <div className="content-header">
                    {ParamPlayer && !(data && data.message) && (
                        <MenuList playername={(data && data.displayname) || ParamPlayer} menus={['General', 'COTD', 'Matchmaking']} handleClick={selectMenu} selected={menu}/>
                    )}
                </div>
                     
                
                {(loading || playerList) && (
                    <div 
                        className="content-body" 
                >

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
                    
                </div>
                
                )}
                
                
                <Outlet/>
            </div>
                
        </div> 
    )
}