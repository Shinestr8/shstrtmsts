import { GeneralPlayerInfo } from "./GeneralPlayerInfo";
import { PlayerRank } from "./PlayerRank";
import { TrophyDistribution } from "./TrophyDistribution";
import { PlayerList } from "./PlayerList";


import {faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function GeneralStats(props){
    const player = props.player;
    const data = props.data;
    const loading = props.loading;
    const playerList = props.playerList;
    const regions = props.regions;



    function handlePlayerClick(selectedPlayer){
        props.handlePlayerClick(selectedPlayer);
    }

    return(
        <div>
            {playerList && (
                        <div>
                            <div>No exact match for player <strong>{player}</strong>, is it one of the following ?</div>
                            <PlayerList data={playerList} onClick={handlePlayerClick}/>
                        </div>
                    )}

                    {data && data.message &&(
                        <div>
                            <div>{data.message}</div>
                            <img 
                                title="marcINSPECT" 
                                alt='marcINSPECT' 
                                src={`${process.env.PUBLIC_URL}/gif/marc-inspect-inspect.gif`} 
                                style={{"width": "20em"}}
                            />
                        </div>
                    )}
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