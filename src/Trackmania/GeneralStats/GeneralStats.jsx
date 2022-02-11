import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import { PlayerRank } from "./PlayerRank";
import { TrophyDistribution } from "./TrophyDistribution";

import {faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function GeneralStats(props){
    const data = props.data;
    const loading = props.loading;
    const regions = props.regions;



    return(
        <div>
                    {loading &&(
                        <div className="loading">
                            <FontAwesomeIcon icon={faSpinner} size="2x"spin/>
                        </div>
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