import React, {useState} from 'react';

const Eventos = () => {
  
  const [text, setText] = useState('Este es un evento');

  const eventoClick = () => {
    setText('este tambien');
  }

  return (
    <>
      <h2>{text}</h2>
      <button onClick={() => eventoClick()} >click me</button>
    </>
    )
}

export default Eventos;
