import React from "react";

export function GeneralPlayerInfo(props){

    const data = props.data;
    const regions = props.regions


    
    return(
            <div className="general-player-info">
                
                <div className="general-country">
                    <img 
                        className="general-flag-picture"
                        alt={"flag-" + regions[regions.length -3].flag} 
                        src={"https://trackmania.io/img/flags/" + regions[regions.length -3].flag + ".jpg"}
                    />
                    <span className="general-country-name">
                        Country: {regions[regions.length -3].name}
                    </span>
                    
                </div>
                <div className="general-trophy-count">
                    Trophies: {data.trophies.points}
                </div>
                
            </div>
    )
}