import mist0 from './mist0.png';
import mist1 from './mist1.png';

import './App.css';
import ShitpostRoot from "./Shitposting/ShitpostRoot";
import Translator from "./42Translator/translator";

function startbgmusic(){
  console.log("click first");
  const audioElement = new Audio("http://knucklessux.com/PuzzleBox/SoundFX/weirdambient.mp3");
  audioElement.volume = 0.1;
  audioElement.loop = true;
  audioElement.play();
  document.removeEventListener("click",startbgmusic);
}

document.addEventListener('click', startbgmusic);


function App() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const mode = urlParams.get('mode')
  return (
    <div className="App">
      <ShitpostRoot/>
      {mode==="42" ? <Translator/>:null}
    </div>
  );
}

export default App;
