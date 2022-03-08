import React from "react";
import styled from "styled-components";
import { formatRank } from "../../functions/formatRank";

const Flag = styled.img`
    width: 1rem;
    outline: 1px solid #000000;
`

const PlayerTable = styled.table`
    text-align: center;
    width: 100%;
    padding: 1rem;

    >tr{
        height: 2rem;
    }

    >tbody tr:nth-child(2n+1) {
        background-color: #ccc;
    }

    >tbody tr:hover{
        background-color: #007bff;
        color: white;
        cursor: pointer;
        text-decoration: underline;
    }

    @media screen and (max-width: 1024px){
        padding: 0.1rem;
    }
`


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

    return(
        <tr onClick={handleClick}>
            <td>
            {data.player.zone !== undefined && (
                <Flag
                    src={`${process.env.PUBLIC_URL}/img/flag/4x3/${findPlayerCountryCode(data.player.zone)}.svg`}
                    title={findPlayerCountryCode(data.player.zone)}
                    alt={findPlayerCountryCode(data.player.zone)}
                />
            )}
            
            </td>
            <td>
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
            <PlayerTable>
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
            </PlayerTable>

        </React.Fragment>
    )
}