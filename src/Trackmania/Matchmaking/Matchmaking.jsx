import { useState } from "react";
import { MainMM } from "./MainMM";
import { Royal } from "./Royal";

import { UpdateButton } from "../../Component/UpdateButton/UpdateButton";

export function Matchmaking(props){
    const data = props.data;
    const displayname = props.displayname;
    const [showUpdate, setShowUpdate] = useState(false);

    if(!data[0] && !data[1]){
        return(
            <div className="error-message">This user has never played matchmaking, super sorry alexander</div>
        )
    }

    return(
        <div>
            <h1 
                className="player-name" 
                onMouseEnter={()=>setShowUpdate(true)} 
                onMouseLeave={()=>setShowUpdate(false)}
            >
                {displayname} 
                <UpdateButton show={showUpdate} onClick={props.forceUpdate}/>
            </h1>
            {data[0] && (
                <div className="section">
                    <h2 className="section-title">3v3</h2>
                    <MainMM data={data[0]}/>
                </div>
            )}
            
            {data[1] && (
                <div className="section">
                    <h2 className="section-title">Royal</h2>
                    <Royal data={data[1]}/>
                </div>
            )}
            
        </div>
    )
}