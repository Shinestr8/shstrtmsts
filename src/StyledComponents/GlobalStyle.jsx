import { createGlobalStyle } from "styled-components";

import lobster from '../font/Lobster-Regular.ttf'

export const GlobalStyle = createGlobalStyle`
    body, html, #root{
        height: 100%;
        margin: 0;
        background-color: ${(props)=>props.theme.background};
    }

    @font-face {
        font-family: "Lobster";
        src: local("Lobster"),
        url(${lobster}) format("truetype");
  }
`
    
