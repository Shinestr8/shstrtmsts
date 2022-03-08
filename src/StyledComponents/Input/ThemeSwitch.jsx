//external
import styled from "styled-components";
import {faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledDiv = styled.div`
    position: absolute;
    display:flex;
    top: 1rem;
    right: 1rem;
`

const StyledSwitch = styled.div`
    background-color: ${(props) => props.checked ? props.theme.button.active_bg: props.theme.button.disabled_bg};
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

const StyledIcon = styled(FontAwesomeIcon)`
    margin-left: 0.5rem;
    color: ${(props) => props.checked ? "yellow" : "lightgrey"};
    @media screen and (max-width: 1024px){
        display: none;
    }
`


export function ThemeSwitch(props){

    function handleClick(){
        props.handleClick();
    }

    return(
        <StyledDiv>
            <StyledSwitch onClick={handleClick} checked={props.checked}>
                <Round checked={props.checked}>
                </Round>
            </StyledSwitch>
            <StyledIcon checked={props.checked} icon={faMoon} size="2x"/>
        </StyledDiv>
    )
}