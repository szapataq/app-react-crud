import React, { useState } from 'react'

const Formulario = () => {

    const [fruta, setFruta] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [almacenado, setAlmacenado] = useState([]);

    const addFruta = (e) => {
        e.preventDefault();
        if (!fruta.trim()) {
            console.log('no hay frutilla');
            return;
        }
        if (!descripcion.trim()) {
            console.log('no hay descripccion');
            return;
        }
        e.target.reset();

        setAlmacenado([
          ...almacenado,
          {nombreFruta: fruta, nombreDescripcion:descripcion}
        ]);
        setFruta('');
        setDescripcion('');
        console.log('procesando... ' + fruta + ' '+ descripcion);
    };

    return (
        <div>
            <h1>Formulario</h1>
            <form onSubmit={addFruta}>
                <input 
                    type="text"
                    placeholder="Ingrese frutilla"
                    className="form-control mb-2"
                    onChange={(e) => setFruta(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Ingrese fruta"
                    className="form-control mb-2"
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <button className="btn btn-primary btn-block" type="submit">Agregar</button>
            </form>
            <ul>
                {
                    almacenado.map((item, index) => {
                    return <li key={index}>Fruta:{ item.nombreFruta } - descripcion: {item.nombreDescripcion}</li>
                    })
                }
            </ul>
        </div>
    )
}

export default Formulario;
