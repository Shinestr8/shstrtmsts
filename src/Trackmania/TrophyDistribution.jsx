import { TrophyPieChart } from "./TrophyPieChart";

export function TrophyDistribution(props){
    
    const data = props.data;


    function computePercentage(partial, type, total){
        let percentage = partial*(10**type)/total*100;
        return parseFloat(percentage).toPrecision(2);
    }

    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return(
        
        <div className="trophy-distribution">
            <table className="trophy-distribution-table">
                <tbody>
                    {data.trophies.counts.map(function(count, index){
                        return(
                            <tr>
                                <td>
                                    <img 
                                        title={"T" + index+1}
                                        alt={"Trophy" + index+1}
                                        className="trophy-distribution-img" 
                                        src={process.env.PUBLIC_URL + '/img/trophies/' + index + '.png'}
                                    />
                                </td>
                                <td>Tier {index+1}:</td>
                                <td>{count}</td>
                                <td>{computePercentage(count, index, data.trophies.points)}%</td>
                                <td>{formatNumber(count*(10**index))}</td>
                            </tr>
                            
                        )
                    })}
                    <tr>
                        <td></td>
                        <td>Total</td>
                        <td></td>
                        <td>100%</td>
                        <td>{formatNumber(data.trophies.points)}</td>
                    </tr>
                </tbody>
            </table>
            <TrophyPieChart data={data.trophies.counts}/>
        </div>
    )
}