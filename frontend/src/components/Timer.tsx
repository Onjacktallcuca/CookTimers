import Container from './UI/Container.tsx';
import { userTimersContext, type Timer as TimerProps} from '../store/timers-context.tsx'
import { useEffect, useRef, useState } from 'react';
import Button from './UI/Button.tsx';

export default function Timer( {name, duration}: TimerProps) {

  const interval = useRef< number | null >(null);
  const [remainingTime, setRemainingTime] = useState(duration * 1000);
  const { isRunning, removeTimer, tozeroTimer } = userTimersContext();

  if(remainingTime <= 0 && interval.current){
    clearInterval(interval.current);
  }

  useEffect( ()=> {
    let timer: number;
    if(isRunning){
      timer = setInterval(function (){

        setRemainingTime((prevTime) => {
          if(prevTime <= 0){
            return prevTime;
          }
          return prevTime -50;
        })

      }, 50);
      interval.current = timer;
    }
    else if(interval.current){
      clearInterval(interval.current);
    }
    
    return ()=> clearInterval(timer);
  }, [isRunning]);

  
  const formattedRemainingTime = (remainingTime: number) => {
    
    const totalSeconds = Math.floor(remainingTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const handleRemoveTimer = ()=> {

    if(window.confirm('Tem certeza que deseja excluir esse timer?'))
    removeTimer(name);
  }

  const handleToZeroTimer = ()=> {


    if(window.confirm('Tem certeza que deseja zerar esse timer?'))
      setRemainingTime(0);
      tozeroTimer(name);
  }
  

  return (
    <Container as="article" className='form-container'>
      <h2>{name}</h2>
      <p> 
        <progress max={duration * 1000} value={remainingTime} />
        
      </p>
      <p>
        {formattedRemainingTime(remainingTime)}
      </p>
       <div className='button-container'>
          <Button className='button' onClick={handleRemoveTimer}>Excluir</Button>
          <Button className='button' onClick={handleToZeroTimer}>Zerar</Button>
        </div>
        
      
    </Container>
  );
}
