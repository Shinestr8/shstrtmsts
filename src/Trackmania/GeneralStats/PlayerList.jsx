import React from "react";

function Player(props){
    const data = props.data;
    function handleClick(){
        props.onClick(props.name)
    }

    return(
        <tr>
            <td className="player-list-player" onClick={handleClick}>
            {data.player.name}
            </td>
            <td>
                {data.matchmaking[0].rank}
            </td>
            <td>
                {data.matchmaking[1].rank}
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