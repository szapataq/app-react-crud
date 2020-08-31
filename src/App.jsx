// ------------------FUNDAMENTOS-----------------------
// import React from 'react';
// import Parrafo from './components/Fundamentos/Parrafo';
// import Variables from './components/Fundamentos/Variables';
// import Eventos from './components/Fundamentos/Eventos';
// import Contador from './components/Fundamentos/Contador';
// import Lista from './components/Fundamentos/Lista';
// import Formulario from './components/Fundamentos/Formulario';


// function App() {
//   return (
//     <div className = "container mt-5">
//       <h2>Curso react</h2>
//       <Parrafo/>
//       <Variables/>
//       <Eventos/>
//       <Contador/>
//       <Lista/>
//       <Formulario/>
//     </div>
//   );
// }

// ------------------CRUD-----------------------
import React from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, setTarea] = React.useState('');
  const [list, setList] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);

  const agregarTarea = (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      console.log('no hay tarea');
      return;
    }
    // e.target.reset();
    setList([
      ...list,
      {id: shortid.generate(), nameTarea: tarea}
    ]);
    setTarea('');
    console.log('agregada');
  };

  const EliminarTares = (id) => {
    // console.log(id);
    const listaFiltrada = list.filter(item=> item.id !== id);
    setList(listaFiltrada);
  };

  const EditarTarea = (item ) => {
    console.log(item);
    setModoEdicion(true);
    setTarea(item.nameTarea);
  };

  return (
    <div className = "container mt-5">
      <h2 className="text-center">Curso react </h2>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              list.map((item) => (
                <li className="list-group-item" key={ item.id }>
                  <span className="lead">{ item.nameTarea }</span>
                  <button 
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={()=>EliminarTares(item.id)}
                    > Eliminar
                  </button>
                  <button 
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => { EditarTarea(item) }}> 
                    Editar
                  </button>
              </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{
            modoEdicion ? 'Editar tarea' : 'Agregar tarea'
          }</h4>
          <form onSubmit={agregarTarea}>
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Ingrese tareas"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {
              modoEdicion ? 
              (<button className="btn btn-warning btn-block" type="submit">Editar</button>) :
              (<button className="btn btn-dark btn-block" type="submit">Agregar</button>)
            }
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;

