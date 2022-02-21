import React from "react";
import { formatRank } from "../../functions/formatRank";

function findPlayerCountryCode(zone){
    let zoneName = zone.name;
    let zoneList = [zone]
    while(zoneName !== 'World'){
        zone = zone.parent;
        zoneName = zone.name;
        zoneList.push(zone)
    }
    if(zoneList[zoneList.length -3] !== undefined){
        return (zoneList[zoneList.length -3].flag).toLowerCase();
    } else {
        return (zoneList[zoneList.length-1].flag).toLowerCase();
    }
    
}

function Player(props){
    const data = props.data;
    function handleClick(){
        props.onClick(data.player.name)
    }

    // findPlayerCountryCode(data.player.zone);

    return(
        <tr onClick={handleClick}>
            <td>
            {data.player.zone !== undefined && (
                <img
                    src={`${process.env.PUBLIC_URL}/img/flag/4x3/${findPlayerCountryCode(data.player.zone)}.svg`}
                    style={{width:'1rem', outline:'1px solid black'}}
                    title={findPlayerCountryCode(data.player.zone)}
                    alt={findPlayerCountryCode(data.player.zone)}
                />
            )}
            
            </td>
            <td className="player-list-player">
            {data.player.name}
            </td>
            <td>
                {data.matchmaking[0] !== undefined && (
                    <span>{formatRank(data.matchmaking[0].rank)}</span>
                )}
            </td>
            <td>
                {data.matchmaking[1] !== undefined && (
                    <span>{formatRank(data.matchmaking[1].rank)}</span>
                )}
                
            </td>
        </tr>
        
    )
}


export function PlayerList(props){
    const players = props.data;

    function handleClick(player){
        props.onClick(player)
    }

    return(
        <React.Fragment>
            <table className="player-list-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Player</th>
                        <th>Matchmaking rank</th>
                        <th>Royal rank</th>
                    </tr>
                </thead>
                <tbody>
                    
                {players.map(function(player, index){
                    return(
                        <Player key={player.player.name} data={player} onClick={handleClick}/>
                    )
                })}    
                </tbody>
            </table>
            {/* <div className="player-list">
                {players.map(function(player, index){
                    return(
                        <Player key={player.player.name} name={player.player.name} onClick={handleClick}/>
                    )
                })}
            </div> */}

        </React.Fragment>
    )
}