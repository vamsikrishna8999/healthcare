import React, {useState} from 'react';
import DisplayComponent from '../DisplayComponent';
import BtnComponent from '../BtnComponent';
import './Zen.css';
import Myaudio from '../chase.mp3'

function Zen() {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();


  return (
    <div className="main-section">
      <div className="header">
      <p className="display-4 text-white text-center fw-bold header ">Welcome to Zen! Meditate to relax your mind</p>
      </div>
     <div className="clock-holder bg-opacity-75 bg-dark mb-3">
     
          <div className="stopwatch">
            
               <DisplayComponent time={time}/>
               <BtnComponent status={status} resume={resume} reset={reset} stop={stop} start={start}/>
          </div>

          
          
     </div>
     <div className='mb-3 text-center'>
          <audio controls>
            <source src={Myaudio} type="audio/ogg" />
          </audio>

          </div>
    </div>
  );
}

export default Zen;
