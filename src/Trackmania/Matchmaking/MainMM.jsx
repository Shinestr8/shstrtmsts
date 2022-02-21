import { formatNumber } from "../../functions/formatNumber";
import { formatRank } from "../../functions/formatRank";
export function MainMM(props){
    const data = props.data;
    const ranks = [
        'Unranked', 
        'Bronze I', 
        'Bronze II', 
        'Bronze III', 
        'Silver I', 
        'Silver II', 
        'Silver III', 
        'Gold I', 
        'Gold II', 
        'Gold III', 
        'Master I', 
        'Master II', 
        'Master III', 
        'TrackMaster'
    ];

    return(
        <div id="main-mm-stats">
            <div className="mm-rank">
                <img 
                    className="mm-rank-img"
                    src={process.env.PUBLIC_URL + '/img/mmrank/' + data.info.division.position + '.png'}
                />
                <div className="mm-rank-name">{ranks[data.info.division.position]}</div>
            </div>

            <div className="mm-detail">
                <div>Rank: {formatRank(data.info.rank)}</div>
                <div>Total Players: {formatNumber(data.total)}</div>
                <div>MMR: {formatNumber(data.info.progression)} points</div>
                <div>next rank in {data.info.division_next.minpoints - data.info.progression} points</div>
            </div>
            
        </div>
    )
}