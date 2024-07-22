import { useRef, useState } from 'react';
import Button from './UI/Button.tsx';
import Form, { FormHandle } from './UI/Form.tsx';
import Input from './UI/Input.tsx';
import { userTimersContext } from '../store/timers-context.tsx';
import '../index.css';
export default function AddTimer() {
  const form = useRef<FormHandle>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const durationInputRef = useRef<HTMLInputElement>(null);  
  const {addTimer} = userTimersContext();
  const [errorMessage, setErrorMessage] = useState<string | null >(null);

  function handleSaveTimer(data: unknown) {
    const extractedData = data as { name: string; duration: number };
    
    if (!validaDados(extractedData)){
      return;
    }

    addTimer({
        name: extractedData.name, 
        duration: extractedData.duration * 60
    });

    setErrorMessage(null);
    form.current?.clear();
  }

function validaDados(timerData: { name:string; duration: number}): boolean {
  if(!timerData.name || !timerData.duration ) {
    setErrorMessage('Preencha todos os dados!');

    if (!timerData.name) {
      nameInputRef.current?.focus();
    } 
    else if (!timerData.duration) {
      durationInputRef.current?.focus();
    }
    return false;
  }
  return true;
}

  return (
    <Form ref={form} onSave={handleSaveTimer} id="add-timer" className='form-container'>
      <Input ref={nameInputRef}  type="text" label="Nome" id="name" />
      <Input ref={durationInputRef} type="number" label="Duração" id="duration" />
      <p>
        <Button>Adicionar Timer</Button>
      </p>

      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </Form>
  );
}
