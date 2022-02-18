import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import { PlayerRank } from "./PlayerRank";
import { TrophyDistribution } from "./TrophyDistribution";

import { UpdateButton } from "../../Component/UpdateButton/UpdateButton";
import { useState } from "react";

export function GeneralStats(props){
    const data = props.data;
    const loading = props.loading;
    const regions = props.regions;

    let [showUpdate, setShowUpdate] = useState(false);



    return(
        <div>
                    {data && !loading && regions && (
                        <div>
                            
                            <h1 className="player-name" onMouseEnter={()=>setShowUpdate(true)} onMouseLeave={()=>setShowUpdate(false)}>{data.displayname} {showUpdate && (<UpdateButton/>)}</h1>
                            
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