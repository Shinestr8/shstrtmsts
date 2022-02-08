import React from "react";

export function GeneralPlayerInfo(props){

    const data = props.data;

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function findPlayerRegions(zone){
        let zoneName = zone.name;
        let zoneList = [zone]
        while(zoneName !== 'World'){
            zone = zone.parent;
            zoneName = zone.name;
            zoneList.push(zone)
        }
        return(zoneList);
    }

    let regions = findPlayerRegions(data.trophies.zone);


    
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