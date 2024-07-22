import { useContext } from 'react';
import Button from './UI/Button.tsx';
import { TimersContext, userTimersContext } from '../store/timers-context.tsx';
import '../index.css'
import backgroundImg from '../assets/0.png';


export default function Header() {
  const timerCtx = userTimersContext();


  useContext(TimersContext)
  return (
    <header className='header'>
          <h1>Cronometro múltiplo</h1>
          <h3>Ideal para gerenciar diferentes timers para o seu churrasco, hamburgada ou pizzada...</h3>
          <Button onClick={timerCtx.isRunning ? timerCtx.stopTimer : timerCtx.startTimer}>
            {timerCtx.isRunning ? 'Parar todos!' : 'Iniciar'}
          </Button>
        </header>
  );
}
