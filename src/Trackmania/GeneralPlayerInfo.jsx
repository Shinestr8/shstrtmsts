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
        <div>Country: {regions[regions.length -3].name} Trophies: {data.trophies.points}</div>
    )
}