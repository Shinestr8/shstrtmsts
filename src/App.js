import { useState } from 'react';
import './App.css';
import { Trackmania } from './Trackmania/Trackmania';
import {Route, Routes, HashRouter } from 'react-router-dom';
import { GeneralStats } from './Trackmania/GeneralStats/GeneralStats';
import { COTDStats } from './Trackmania/COTDStats/COTDStats';
import { Matchmaking } from './Trackmania/Matchmaking/Matchmaking';
import { Error404 } from './Component/UpdateButton/404';

// const header_background = process.env.PUBLIC_URL + '/img/background/header_background.png';
const page_background = process.env.PUBLIC_URL + '/img/background/page_background.png'

function App() {
  const [title, setTitle] = useState('big');

  function changeTitle(newClass){
    setTitle(newClass)
  }

  return (
    <div className="app" style={{backgroundImage: `url(${page_background})`}}>
      <div className={title + ' header'}>
        Trackmania Stats
      </div>
      <div className='wrapper' >
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="*" element={<Error404/>}/>
            <Route path="/" element={<Trackmania changeTitle={changeTitle}/>}>
              
              <Route path="player">
                
                <Route path=":player" element={<GeneralStats/>}/>
                <Route path=":player/General" element={<GeneralStats/>}/>
                <Route path=":player/COTD" element={<COTDStats/>}/>
                <Route path=":player/Matchmaking" element={<Matchmaking/>}/>
              </Route>
              
            </Route>
            
          </Routes>
          
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
