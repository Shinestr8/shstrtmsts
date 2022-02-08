export function PlayerRank(props){
    const data = props.data;
    const regions = props.regions;

    function formatRank(rank){
        let lastDigit = rank.toString().slice(-1);
        let suffix = 'th';
        if(lastDigit === '1'){
            suffix = 'st';
        } else if(lastDigit === '2'){
            suffix= 'nd';
        } else if (lastDigit === '3'){
            suffix = 'rd'
        }
        return rank + suffix
    }

    return(
        <div className="player-rank">
            <div className="regional-rank">
                <table>
                    <tbody>
                        {regions.map(function(region, index){
                            return(
                                <tr key={"rank-" + region.name}>
                                    <td>{region.name}</td>
                                    <td style={{paddingLeft: '1rem'}}>{formatRank(data.trophies.zonepositions[index])}</td>
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