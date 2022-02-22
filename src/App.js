import { useState } from 'react';
import './App.css';
import { Trackmania } from './Trackmania/Trackmania';

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
        <div>
          <Trackmania changeTitle={changeTitle}/>
        </div>
      </div>
    </div>
  );
}

export default App;
