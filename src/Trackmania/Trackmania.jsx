import { useState } from "react"
import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import { PlayerRank } from "./PlayerRank";
import { TrophyDistribution } from "./TrophyDistribution";
import "./trackmania.css";
import "./responsive.css";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export function Trackmania(){

    let [textInput, setTextInput] = useState("");
    let [data, setData] = useState(null);
    let [regions, setRegions] = useState(null);
    let [loading, setLoading] = useState(false);

    function updateTextInput(e){
        setTextInput(e.target.value);
    }

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


    function fetchPlayerInfo(e){
        e.preventDefault();
        const url = ("https://tm-stats-bknd.herokuapp.com/findTrokmoniPlayer?player=" + textInput).toLowerCase();

        //reset previous search: data = null, loading = true
        setLoading(true); 
        setData(null);
        setRegions(null);

        //if there is a localstorage if that url
        if(localStorage.getItem(url) !== null){ //
            let cached = JSON.parse(localStorage.getItem(url));
            let timestamp = new Date(cached.timestamp).getTime();
            let now = new Date().getTime();
            if(timestamp + 12*60*60*1000 < now){
                localStorage.removeItem(url); // remove the current url from localStorage if it is more than 12 hours old
            } else {
                console.log(`${textInput} found in the local storage`);
                console.log(cached);
                setData(cached.data);
                setLoading(false);
                findPlayerRegions(cached.data.trophies.zone)
            }
        } else {
            //if nothing in the localstorage, request the data to the server and cache it for 12 hours
            fetch('https://tm-stats-bknd.herokuapp.com/findTrokmoniPlayer?player=' + textInput)
            .then(function(result){
                return result.json();
            })
            .then(function(result){
                setData(result);
                setLoading(false);
                findPlayerRegions(result.trophies.zone);
                localStorage.setItem(url, JSON.stringify({timestamp: new Date(), data: result}));
            })
            .catch(function(error){
                console.log(error);
            })
        }

        
        
    }

    return(
        <div>
            <form>
                <input type="text" placeholder="Player" value={textInput} onChange={updateTextInput}/>
                <button type="submit" onClick={fetchPlayerInfo}>
                    Submit
                </button>
            </form>
            {data && data.message &&(
                <span>{data.message}</span>
            )}
            {loading &&(
                <div className="loading"><FontAwesomeIcon icon={faSpinner} size="2x"spin/></div>
            )}
            {data && !loading && regions && (
                <div>
                    
                    <h1 className="player-name">{data.displayname}</h1>
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