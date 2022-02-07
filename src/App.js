import './App.css';
import { Trackmania } from './Trackmania/Trackmania';


function App() {
  return (
    <div className="app">
      <div className='header'>
        Trackmania Stats
      </div>
      <div className='wrapper'>
        <div className='content'>
          <Trackmania/>
        </div>
      </div>
    </div>
  );
}

export default App;
