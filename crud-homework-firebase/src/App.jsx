import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";
import Title from "./components/Title";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("tareas").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const agregarTarea = async (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      setError("Escriba algo porfavor...");
      return;
    }
    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        name: tarea,
        date: Date.now(),
      };
      const data = await db.collection("tareas").add(nuevaTarea);
      setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
      setTarea("");
      setError(null);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).delete();
      const arrayTareas = tareas.filter((tarea) => tarea.id !== id);
      setTareas(arrayTareas);
    } catch (error) {
      console.log(error);
    }
    console.log();
  };

  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setId(item.id);
  };

  const editarTarea = async (e) => {
    e.preventDefault();
    if (tarea.trim() === "") {
      setError("Escriba algo porfavor...");
      return;
    }
    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).update({
        name: tarea,
      });
      const arrayTareas = tareas.map((item) =>
        item.id === id ? { id: item.id, date: item.date, name: tarea } : item
      );
      setTareas(arrayTareas);
      setModoEdicion(false);
      setTarea("");
      setId("");
      setError(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mt-5"> CRUD FIREBASE</h1>
      <hr />
      <div className="row">
        <div className="col-md-7">
          <Title nombre={"Lista de tareas"} />
          {tareas.length === 0 ? (
            <span className="text-center">¡Ups! no hay tareas</span>
          ) : (
            <ul className="list-group">
              {tareas.map((tarea) => (
                <li className="list-group-item" key={tarea.id}>
                  {tarea.name}
                  <button
                    className="btn btn-danger btn-sm float-right"
                    onClick={() => {
                      eliminarTarea(tarea.id);
                    }}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right mr-2"
                    onClick={() => {
                      editar(tarea);
                    }}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-5">
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
            <button
              className={
                modoEdicion
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
