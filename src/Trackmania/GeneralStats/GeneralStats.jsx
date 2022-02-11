import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import { PlayerRank } from "./PlayerRank";
import { TrophyDistribution } from "./TrophyDistribution";

import { LoadingIcon } from "../../Component/UpdateButton/LoadingIcon";

export function GeneralStats(props){
    const data = props.data;
    const loading = props.loading;
    const regions = props.regions;



    return(
        <div>
                    {loading &&(
                        <LoadingIcon/>
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