import React from "react";

function Player(props){

    function handleClick(){
        props.onClick(props.name)
    }

    return(
        <div className="player-list-player" onClick={handleClick}>
            {props.name}
        </div>
    )
}


export function PlayerList(props){
    const players = props.data;

    function handleClick(player){
        props.onClick(player)
    }

    return(
        <React.Fragment>
            <div>
                {players.map(function(player, index){
                    return(
                        <Player key={player.player.name} name={player.player.name} onClick={handleClick}/>
                    )
                })}
            </div>

        </React.Fragment>
    )
}