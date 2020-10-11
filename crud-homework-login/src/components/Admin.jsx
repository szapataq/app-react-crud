import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import Tareas from "./Tareas";

const Admin = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe un usuario");
      setUser(auth.currentUser);
    } else {
      console.log("no existe usuario");
      props.history.push("/login");
    }
  }, [props.history]);

  return <div className="mt-5">{user && <Tareas user={user} />}</div>;
};

export default withRouter(Admin);
