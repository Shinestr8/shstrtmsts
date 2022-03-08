import '../../Trackmania/trackmania.css';
import styled from "styled-components";
import { useState } from 'react';

const StyledDiv = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`

const StyledSwitch = styled.div`
    background-color: ${(props) => props.checked ? "#2196F3": "#CCCCCC"};
    width: 3.2rem;
    height: 2rem;
    border-radius: 34px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    cursor: pointer;
    transition-property: background-color;
    transition-duration: 0.3s;
`

const Round = styled.div`
    border-radius: 50%;
    background-color: #ffffff;
    width: 1.5rem;
    height: 1.5rem;
    margin-left: ${(props) => props.checked ? "1.6rem" : "0rem"};
    transition-property: margin;
    transition-duration:0.3s;   
`


export function ThemeSwitch(props){

    const [checked, setChecked] = useState(false);

    function handleClick(){
        setChecked(!checked);
        props.handleClick(checked);
    }

    return(
        <StyledDiv>
            <StyledSwitch onClick={handleClick} checked={checked}>
                <Round checked={checked}>
                </Round>
            </StyledSwitch>
        </StyledDiv>
    )
}