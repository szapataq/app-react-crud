import React, { useState } from "react";
import shortid from "shortid";
import Title from "./components/Title";

function App() {
  const [tarea, setTarea] = useState("");
  const [listTareas, setListTareas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      setError("Llene el campo...");
      return;
    }
    setListTareas([
      ...listTareas,
      { id: shortid.generate(), nombreTarea: tarea },
    ]);
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    const arrayFiltrado = listTareas.filter((item) => item.id !== id);
    setListTareas(arrayFiltrado);
  };

  const editarUI = (tarea) => {
    console.log(tarea);
    setModoEdicion(true);
    setTarea(tarea.nombreTarea);
    setId(tarea.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      setError("Escriba algo por favor...");
      return;
    }
    const arrayEditable = listTareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );
    setListTareas(arrayEditable);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };
  return (
    <div className="container">
      <h1 className="text-center mt-5"> CRUD SIMPLE</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <Title nombre={"Lista de tareas"} />
          {listTareas.length === 0 ? (
            <span className="text-center">¡Ups! no hay tareas</span>
          ) : (
            <ul className="list-group">
              {listTareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right mx-2"
                    onClick={() => editarUI(item)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-4">
          {modoEdicion ? (
            <Title nombre={"Editar tarea"} />
          ) : (
            <Title nombre={"Formulario"} />
          )}
          {error ? <span className="text-danger">{error}</span> : null}
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
