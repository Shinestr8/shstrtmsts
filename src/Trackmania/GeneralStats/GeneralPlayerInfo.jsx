import styled from "styled-components";
import { formatNumber } from "../../functions/formatNumber";

const Flag = styled.img`
    width: 9rem;
    height: 5rem;
    outline: 1px solid #000000;
`

const PlayerInfo = styled.div`
    display: flex;
    justify-content: space-around;
`

const TrophyCount = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    font-size: 1.2rem;
    font-weight: 600;
`

export function GeneralPlayerInfo(props){

    const data = props.data;
    const regions = props.regions


    
    return(
            <PlayerInfo>
                    <Flag
                        alt={"flag-" + regions[regions.length -3].flag} 
                        src={process.env.PUBLIC_URL + "/img/flag/4x3/" + (regions[regions.length -3].flag).toLowerCase() + ".svg"}
                    />
                <TrophyCount>
                    Trophies: {formatNumber(data.trophies.points)}
                </TrophyCount>
                
            </PlayerInfo>
    )
}