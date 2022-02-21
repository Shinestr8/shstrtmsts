import { formatRank } from "../../functions/formatRank";

export function PlayerRank(props){
    const data = props.data;
    const regions = props.regions;

    return(
        <div className="player-rank">
            <div className="regional-rank">
                <table>
                    <tbody>
                        {regions.map(function(region, index){
                            let imgsrc = index === regions.length - 3 ? process.env.PUBLIC_URL + "/img/flag/4x3/" + region.flag.toLowerCase() + ".svg" : "https://trackmania.io/img/flags/" + region.flag + ".jpg"
                            return(
                                <tr key={"rank-" + region.name}>
                                    <td>
                                        <img 
                                            className="rank-flag" 
                                            title={region.name}
                                            alt={"flag-" + region.flag} 
                                            src={imgsrc}
                                        />
                                    </td>
                                    <td>{region.name}</td>
                                    <td style={{paddingLeft: '1rem'}}>
                                        {formatRank(data.trophies.zonepositions[index])}
                                    </td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="echelon-type">
                <img 
                    className="player-rank-echelon"
                    title={"echelon-" + data.trophies.echelon}
                    alt={"echelon-" + data.trophies.echelon}
                    src={process.env.PUBLIC_URL + '/img/echelon/' + data.trophies.echelon + '.png'}
                />
            </div>
        </div>
    )
}