export function PlayerRank(props){
    const data = props.data;
    const regions = props.regions;

    return(
        <div className="player-rank">
            <div className="regional-rank">
                <table>
                <tbody>
                {regions.map(function(region, index){
                    return(
                        <tr key={"rank-" + region.name}>
                            <td>{region.name}</td>
                            <td style={{paddingLeft: '1rem'}}>{data.trophies.zonepositions[index]}</td>
                        </tr>

                    );
                })}
                </tbody>
                </table>
            </div>
            <div className="echelon-type">
                Echelon {data.trophies.echelon}
            </div>
        </div>
    )
}