import { useState } from "react"
import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import "./trackmania.css";

export function Trackmania(props){
    let [textInput, setTextInput] = useState("");
    let [player, setPlayer] = useState(""); 
    let [data, setData] = useState(null);

    function updateTextInput(e){
        setTextInput(e.target.value);
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
            {data !== null && (
                <div>
                    <h1 className="player-name">{data.displayname}</h1>
                    <div className="section">
                        <h2 className="section-title">General</h2>
                        <GeneralPlayerInfo data={data}/>
                    </div>
                </div>
            )}
        </div>
    )
}