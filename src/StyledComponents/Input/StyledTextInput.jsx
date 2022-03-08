//external
import styled from 'styled-components';

export const StyledTextInput = styled.input`
    display: inline-block;
    width: 60%;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: none;
    font-size: inherit;

    &:focus{
        outline: none;
    }

    @media screen and (max-width: 1024px){
        width: 100%;
    }
`