import React from "react";

const Tarea = (props) => {
  console.log(props);
  return (
    <li className="list-group-item" key={}>
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
  );
};

export default Tarea;
