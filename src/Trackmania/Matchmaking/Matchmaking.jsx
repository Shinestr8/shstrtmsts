import { MainMM } from "./MainMM";
import { Royal } from "./Royal";

export function Matchmaking(props){
    const data = props.data;

    return(
        <div>
            <div className="section">
                <h2 className="section-title">3v3</h2>
                <MainMM data={data[0]}/>
            </div>
            <div className="section">
                <h2 className="section-title">Royal</h2>
                <Royal data={data[1]}/>
            </div>
        </div>
    )
}