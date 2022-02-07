import { useState } from "react"

export function Trackmania(props){
    let [player, setPlayer] = useState("");
    let [submitted, setSubmitted] = useState(""); 


    function changePlayer(e){
        setPlayer(e.target.value);
    }

    function fetchPlayerInfo(e){
        e.preventDefault();
        setSubmitted(player);
    }

    return(
        <div>
            <form>
                <input type="text" placeholder="Player" value={player} onChange={changePlayer}/>
                <button type="submit" onClick={fetchPlayerInfo}>
                    Submit
                </button>
            </form>
            Looking at info from player: {submitted}
        </div>
    )
}