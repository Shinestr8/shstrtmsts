import { useState } from 'react';
import './App.css';
import { Trackmania } from './Trackmania/Trackmania';
import {Route, Routes, HashRouter } from 'react-router-dom';
import { GeneralStats } from './Trackmania/GeneralStats/GeneralStats';
import { COTDStats } from './Trackmania/COTDStats/COTDStats';
import { Matchmaking } from './Trackmania/Matchmaking/Matchmaking';
import { Error404 } from './Component/UpdateButton/404';
import { GlobalStyle } from './StyledComponents/GlobalStyle';


import { lightTheme, darkTheme } from './theme';
import { ThemeSwitch } from './StyledComponents/Input/ThemeSwitch';

import styled,{ ThemeProvider} from 'styled-components';

const page_background = process.env.PUBLIC_URL + '/img/background/page_background.png'


const Page  = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${page_background});
`

const Title = styled.div`
  min-height: 10%;
  text-align: center;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: Lobster;
  color: white;
  font-size: ${(props)=>props.titleSize ==='big' ? '5rem' : '2.5rem'};
  transition-property: font-size;
  transition-duration: 0.4s;
  @media screen and (max-width: 1024px){
    font-size: ${(props)=>props.titleSize ==='big' ? '3rem' : '2.5rem'};
  }
`

function App() {
  const [titleSize, setTitleSize] = useState('big');
  const [currentTheme, setTheme] = useState(lightTheme)

  function changeTitleSize(newClass){
    setTitleSize(newClass)
  }

  function toggle(checked){
    
    if(checked){
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle/>
      <Page>
      <Title titleSize={titleSize}>
        Trackmania Stats
      </Title>
      <ThemeSwitch handleClick={toggle}/>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="*" element={<Error404/>}/>
          <Route path="/" element={<Trackmania changeTitle={changeTitleSize}/>}>
            
            <Route path="player">
              
              <Route path=":player" element={<GeneralStats/>}/>
              <Route path=":player/General" element={<GeneralStats/>}/>
              <Route path=":player/COTD" element={<COTDStats/>}/>
              <Route path=":player/Matchmaking" element={<Matchmaking/>}/>
            </Route>
            
          </Route>
          
        </Routes>
        
    </HashRouter>
    </Page>
    </ThemeProvider>
    
  );
}

export default App;
