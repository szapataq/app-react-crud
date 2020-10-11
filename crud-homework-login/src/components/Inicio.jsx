import React from "react";
import banner from "../assets/banner.jpg";

const Inicio = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="text-info">Gestion de tareas</h1>
      <img className="img-fluid" src={banner} alt="firebase" />
    </div>
  );
};

export default Inicio;
