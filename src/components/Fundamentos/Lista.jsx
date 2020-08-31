import React, {useState} from 'react';

const Lista = () => {
    const estadoInicial = [
        {id: 1, text: 'tarea 1'},
        {id: 2, text: 'tarea 2'},
        {id: 3, text: 'tarea 3'}

    ];
    const [list, setList] = useState(estadoInicial);
    const handleAdd = () => {
        setList([
            ...list,
            {id: 4, text: 'tarea 4'}
        ]);
    }
    return (
      <>
          <h3>Listas</h3>
          <ul>
          {
              list.map((item, index) => {
                return <li key={index}> { item.text } </li>
              })
          }
          </ul>
          <button onClick={handleAdd}>Agregar item</button>
      </>
    )
}

export default Lista;
