import React, { useState, useCallback } from "react";
import { db, auth } from "../firebase";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(true);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Ingrese Email");
      return;
    }
    if (!password.trim()) {
      setError("Ingrese password");
      return;
    }
    if (password.length < 6) {
      setError("Contraseña invalida");
      return;
    }
    setError(null);
    if (esRegistro) {
      registrarUsuario();
    } else {
      login();
    }
  };

  const login = useCallback(async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") setError("Email no registrado");
      if (error.code === "auth/wrong-password")
        setError("Contraseña no valida");
    }
  }, [email, password, props.history]);

  const registrarUsuario = useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection(res.user.uid).add({
        name: "Tarea de prueba",
        date: Date.now(),
      });
      setEmail("");
      setPassword("");
      setError(null);
      props.history.push("/admin");
    } catch (error) {
      if (error.code === "auth/invalid-email") setError("Email invalido");
      if (error.code === "auth/email-already-in-use")
        setError("Este usuario ya existe");
    }
  }, [email, password, props.history]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuario" : "Iniciar sesion"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={procesarDatos}>
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese contraseña"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="btn btn-dark btn-lg btn-block" type="submit">
              {esRegistro ? "Registrarse" : "Acceder"}
            </button>
            <button
              className="btn btn-info btn-sm btn-block"
              type="button"
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {esRegistro ? "¿Ya estas registrado?" : "¿No estas registrado?"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
