import { useState } from "react"
import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import { PlayerRank } from "./PlayerRank";
import "./trackmania.css";

export function Trackmania(props){
    let [textInput, setTextInput] = useState("");
    let [player, setPlayer] = useState(""); 
    let [data, setData] = useState(null);
    let [regions, setRegions] = useState(null);

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
        setPlayer(textInput);
        fetch('https://tm-stats-bknd.herokuapp.com/findTrokmoniPlayer?player=' + textInput)
        .then(function(result){
            return result.json();
        })
        .then(function(result){
            setData(result)
            findPlayerRegions(result.trophies.zone)
        })
        .catch(function(error){
            console.log(error);
        })
    }

    return(
        <div>
            <form>
                <input type="text" placeholder="Player" value={textInput} onChange={updateTextInput}/>
                <button type="submit" onClick={fetchPlayerInfo}>
                    Submit
                </button>
            </form>
            fetch info for {player}
            {data !== null && regions !== null && (
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

                </div>
            )}
        </div>
    )
}