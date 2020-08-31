import React, {useState} from 'react'

const Contador = () => {
    const [contador, setContador] = useState(0);

    const handleAumentar = () => {
        setContador(contador + 1);
    };

    return (
        <>
           <h2>Este es un contador {contador}</h2>
           <button onClick={() => handleAumentar()}>Aumentar</button> 
        </>
    )
}

export default Contador;
