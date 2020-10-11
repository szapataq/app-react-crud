import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Inicio from "./components/Inicio";
import { auth } from "./firebase";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("auth", user);
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  return firebaseUser === false ? (
    <p>Cargando</p>
  ) : (
    <Router>
      <Navbar firebaseUser={firebaseUser} />
      <div className="container">
        <Switch>
          <Route path="/" component={Inicio} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/admin" component={Admin} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
