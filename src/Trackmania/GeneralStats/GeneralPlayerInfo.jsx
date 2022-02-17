import React from "react";

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function GeneralPlayerInfo(props){

    const data = props.data;
    const regions = props.regions


    
    return(
            <div className="general-player-info">
                
                <div className="general-country">
                    <img 
                        style={{outline: '1px solid black'}}
                        className="general-flag-picture"
                        alt={"flag-" + regions[regions.length -3].flag} 
                        src={process.env.PUBLIC_URL + "/img/flag/4x3/" + regions[regions.length -3].flag + ".svg"}
                    />
                </div>
                <div className="general-trophy-count">
                    Trophies: {formatNumber(data.trophies.points)}
                </div>
                
            </div>
    )
}