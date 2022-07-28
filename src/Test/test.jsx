import styled from "styled-components";

// const Container = styled.div`
//     display: flex;
//     height: 50%;
//     background-color:red;
//     justify-content: center;

// `

// const Title = styled.div`
//     background-color:blue;
//     margin-left:auto;
//     /* justify-self: start; */
// `
// const Switch = styled.div`
//     background-color:green;
//     width: 10%;
//     margin-left: auto;
// `

// export function Test(props){
//     return(
//         <Container>
//             <Title>Trokmoni</Title>
//             <Switch>A</Switch>
//         </Container>
//     )
// }

const Container = styled.div`
    background-color: green;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const Title = styled.div`
    background-color: pink;
    width: 20%; 
`

const Yes = styled.div`
    background-color: black;
    align-self: flex-end;
    color: white;
`


export function Test(props){
    return(
        <Container>
            <Yes>
                Switch
            </Yes>
            <Title>
                Title
            </Title>
            
        </Container>
    )
}