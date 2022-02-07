import { useState } from "react"

export function Trackmania(props){
    let [textInput, setTextInput] = useState("");
    let [player, setPlayer] = useState(""); 


    function updateTextInput(e){
        setTextInput(e.target.value);
    }

    function fetchPlayerInfo(e){
        e.preventDefault();
        setPlayer(textInput);
    }

    return(
        <div>
            <form>
                <input type="text" placeholder="Player" value={textInput} onChange={updateTextInput}/>
                <button type="submit" onClick={fetchPlayerInfo}>
                    Submit
                </button>
            </form>
            Looking at info from player: {player}
        </div>
    )
}