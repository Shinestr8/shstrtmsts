import { formatNumber } from "../../functions/formatNumber";
import { formatRank } from "../../functions/formatRank";
import { MatchmakingStats, RankImage, Details, RankText, Rank } from "./StyledMatchmaking";
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
        <MatchmakingStats>
            <Rank>
                <RankImage
                    alt={ranks[data.info.division.position -1]}
                    title={ranks[data.info.division.position -1]}
                    src={process.env.PUBLIC_URL + '/img/royalrank/' + data.info.division.position + '.png'}
                />
                <RankText>{ranks[data.info.division.position -1]}</RankText>
            </Rank>

            <Details>
                <div>Rank: {formatRank(data.info.rank)} (top {computePercentage(data.info.rank, data.total)}%)</div>
                <div>Total Players: {formatNumber(data.total)}</div>
                <div>Wins: {formatNumber(data.info.progression)}</div>
                {data.info.division_next && (
                    <div>next rank ({ranks[data.info.division.position]}) in {data.info.division_next.minwins - data.info.progression} Wins</div>
                )}
                
            </Details>
            
        </MatchmakingStats>
    )
}