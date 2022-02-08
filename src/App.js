import './App.css';
import { Trackmania } from './Trackmania/Trackmania';

// const header_background = process.env.PUBLIC_URL + '/img/background/header_background.png';
const page_background = process.env.PUBLIC_URL + '/img/background/page_background.png'

function App() {
  return (
    <div className="app">
      <div className='header'>
        Trackmania Stats
      </div>
      <div className='wrapper' style={{backgroundImage: `url(${page_background})`}}>
        <div className='content'>
          <Trackmania/>
        </div>
      </div>
    </div>
  );
}

export default App;
