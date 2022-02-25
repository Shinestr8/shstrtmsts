import { useState } from 'react';
import './App.css';
import { Trackmania } from './Trackmania/Trackmania';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GeneralStats } from './Trackmania/GeneralStats/GeneralStats';
import { COTDStats } from './Trackmania/COTDStats/COTDStats';
import { Matchmaking } from './Trackmania/Matchmaking/Matchmaking';


// const header_background = process.env.PUBLIC_URL + '/img/background/header_background.png';
const page_background = process.env.PUBLIC_URL + '/img/background/page_background.png'

function App() {
  const [title, setTitle] = useState('big');

  function changeTitle(){
    console.log('yepcock')
    setTitle('small')
  }

  return (
    <div className="app" style={{backgroundImage: `url(${page_background})`}}>
      <div className={title + ' header'}>
        Trackmania Stats
      </div>
      <div className='wrapper' >
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<div style={{color:'white', padding: '5rem', textAlign: 'center', fontSize: 'larger', fontWeight: 'bold'}}>404</div>}/>
            <Route path="/" element={<Trackmania changeTitle={changeTitle}/>}>
              
              <Route path="player">
                
                <Route path=":player" element={<GeneralStats/>}/>
                <Route path=":player/General" element={<GeneralStats/>}/>
                <Route path=":player/COTD" element={<COTDStats/>}/>
                <Route path=":player/Matchmaking" element={<Matchmaking/>}/>
              </Route>
              
            </Route>
            
          </Routes>
          
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
