import styled from "styled-components";

export const StyledButton = styled.button`
    background-color: ${props=>props.theme.button.active_bg};
    width:fit-content;
    min-width: 3rem;
    color: ${props=>props.theme.button.active_color};
    border: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: inherit;

    &:disabled{
        background-color: ${props=>props.theme.button.disabled_bg};
        color: ${props=>props.theme.button.disabled_color};;
    }  

    @media screen and (max-width: 1024px){
        width: 5rem;
    }
`