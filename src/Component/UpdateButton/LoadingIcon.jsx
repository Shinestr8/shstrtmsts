import {faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from "styled-components"


const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 3rem;
`

export function LoadingIcon(){
    return(
        <StyledDiv>
            <FontAwesomeIcon icon={faSpinner} size="2x"spin/>
        </StyledDiv>
    )
}