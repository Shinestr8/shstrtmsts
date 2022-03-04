import styled from "styled-components";

export const InfoBox = styled.div`
    display: flex;
    justify-content: space-around;
`

export const Cells = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    margin-top: 1em;
    width: 50%;
    background-color: rgb(21, 52, 38);
    color: rgb(131, 213, 159);
    padding: 1rem;
    border: 1px solid rgb(131, 213, 159);
`

export const CellTitle = styled.div`
    font-size: larger;
`

export const CellData = styled.div`
    font-size: medium;
`