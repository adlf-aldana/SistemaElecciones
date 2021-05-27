import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/autenticacion/authContext";

const RutaVerificador = ({ component: Component }, ...props) => {
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado, cargando, usuario } = authContext;

  // const { cargo } = usuario;
  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return usuario ? (
    <Route
      {...props}
      render={(props) =>
        autenticado &&
        !cargando &&
        (usuario.cargo === "Administrador" ||
          usuario.cargo === "Encargado de Mesa" ||
          usuario.cargo === "Estudiante") ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  ) : (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaVerificador;
