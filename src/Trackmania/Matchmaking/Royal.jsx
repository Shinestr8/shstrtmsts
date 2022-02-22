import { formatNumber } from "../../functions/formatNumber";
import { formatRank } from "../../functions/formatRank";
export function Royal(props){
    const data = props.data;
    const ranks = [
        'Unranked', 
        'Bronze', 
        'Silver', 
        'Gold', 
        'Master', 
        'Royal Master'
    ];

    function computePercentage(rank, total){
        return parseFloat(100*rank/total).toPrecision(1);
    }

    return(
        <div id="main-mm-stats">
            <div className="mm-rank">
                <img 
                    className="mm-rank-img"
                    alt={ranks[data.info.division.position -1]}
                    title={ranks[data.info.division.position -1]}
                    src={process.env.PUBLIC_URL + '/img/royalrank/' + data.info.division.position + '.png'}
                />
                <div className="mm-rank-name">{ranks[data.info.division.position -1]}</div>
            </div>

            <div className="mm-detail">
                <div>Rank: {formatRank(data.info.rank)} (top {computePercentage(data.info.rank, data.total)}%)</div>
                <div>Total Players: {formatNumber(data.total)}</div>
                <div>Wins: {formatNumber(data.info.progression)}</div>
                {data.info.division_next && (
                    <div>next rank ({ranks[data.info.division.position]}) in {data.info.division_next.minwins - data.info.progression} Wins</div>
                )}
                
            </div>
            
        </div>
    )
}