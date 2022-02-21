import { MainMM } from "./MainMM";
import { Royal } from "./Royal";

export function Matchmaking(props){
    const data = props.data;

    if(!data[0] && !data[1]){
        return(
            <div>This user has never played matchmaking, super sorry alexander</div>
        )
    }

    return(
        <div>
            {data[0] && (
                <div className="section">
                    <h2 className="section-title">3v3</h2>
                    <MainMM data={data[0]}/>
                </div>
            )}
            
            {data[1] && (
                <div className="section">
                    <h2 className="section-title">Royal</h2>
                    <Royal data={data[1]}/>
                </div>
            )}
            
        </div>
    )
}