import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './timer.css'
{/*let the user enter time to focus.keep max focus time for 25min and break time for 5min in between */}

const FocusTimer = () =>{
    const [needTimer,setNeedTimer] = useState(false);
    const [Break,setBreak] = useState(false);

    const [inputHours,setInputHours] = useState(0);
    const [inputMin,setInputMin] = useState(25);

    const [sec,setSec] = useState(25*60);

    const format = (seconds) => {
        const hour = Math.floor(seconds/(60*60));
        const min = Math.floor((seconds - hour*60*60)/60);
        const remSec = seconds - (hour*3600 + min*60);
        const hD = hour > 0 ? `${hour}:`:'';
        const mD = hour>0 ?(min <10 ? `0${min}:`:`${min}:`):`${min}:`;
        const sD = remSec < 10 ? `0${remSec}`: remSec; 
        return `${hD}${mD}${sD}`;
    };

    useEffect(() => {
        let interval=null;
        if(needTimer && sec>0){
            interval = setInterval(()=>{
                setSec((prev)=>prev-1);
            },1000); {/*1sec=1000msec*/}
        }
        else if(sec===0 && needTimer){
            const mode = !Break;
            setBreak(mode);
            setSec(mode ? 5*60 : (inputHours*3600)+(inputMin*60));
            setNeedTimer(false);
            alert(mode ? "break" : "focus")            
        }
        return ()=> clearInterval(interval);
    },[needTimer,Break,inputHours,inputMin,sec]);
    
    const handleTime = (h,m) =>{
        setInputHours(h);
        setInputMin(m);
        setSec(h*3600 + m*60);
    };

    return(
        <div className='timer-page' style={{flexGrow:1}}>
            <div className='navigate'>
                <Link to="/" style={{color:"white", textDecoration:"none"}}>Back to Home</Link>
            </div>
            <p className="time-format" style={{color:"white",textAlign:"center"}}>{format(sec)}</p>
            <div className='actual-content'>
                            <div className={`mode ${Break ? 'break' : 'focus'}`}>

             {!needTimer && !Break && (
                <div className='input' style={{color:"white"}}>
                    <div>
                        <label>Hours : </label>
                        <input type = "number"
                               min = '0'
                               max = '5'
                               value = {inputHours}
                               onChange={(e) => handleTime(Math.min(5,parseInt(e.target.value)|| 0),inputMin)}
                            />                          
                    </div>
                    <div>
                        <label >Minutes : </label>
                            <input 
                                type="number" 
                                min="0" 
                                max="59" 
                                value={inputMin}
                                onChange={(e) => handleTime(inputHours, Math.min(59, parseInt(e.target.value) || 0))}
                            />
                    </div>
                </div>
             )}

                <div className='control'>
                    <button onClick={() => setNeedTimer(!needTimer)}>
                            {needTimer ? 'PAUSE' : 'START'}
                        </button>
                        <button 
                            onClick={() => {
                                setNeedTimer(false);
                                setSec(Break ? 5 * 60 : (inputHours * 3600) + (inputMin * 60));
                            }}
                        >
                            RESET
                        </button>
                </div>
            </div>
            </div>
        </div>
    );

}

export default FocusTimer;