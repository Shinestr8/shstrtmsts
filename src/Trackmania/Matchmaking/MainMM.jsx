import { formatNumber } from "../../functions/formatNumber";
import { formatRank } from "../../functions/formatRank";

import { MatchmakingStats, RankImage, Details, RankText, Rank } from "./StyledMatchmaking";

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

    function computePercentage(rank, total){
        return parseFloat(100*rank/total).toPrecision(1);
    }


    return(
        <MatchmakingStats>
            <Rank>
                <RankImage
                    alt={ranks[data.info.division.position]}
                    title={ranks[data.info.division.position]}
                    src={process.env.PUBLIC_URL + '/img/mmrank/' + data.info.division.position + '.png'}
                />
                <RankText>{ranks[data.info.division.position]}</RankText>
            </Rank>

            <Details>
                <div>Rank: {formatRank(data.info.rank)} (top {computePercentage(data.info.rank, data.total)}%)</div>
                <div>Total Players: {formatNumber(data.total)}</div>
                <div>MMR: {formatNumber(data.info.progression)} points</div>
                {data.info.division_next && (
                    <div>next rank ({ranks[data.info.division.position +1]}) in {data.info.division_next.minpoints - data.info.progression} points</div>
                )}
                
            </Details>
            
        </MatchmakingStats>
    )
}