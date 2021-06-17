import React, { Fragment, useContext, useState, useEffect } from "react";

import AlertaContext from "../../context/alerta/alertaContext.js";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  // extraer los valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion, usuario, usuarioAutenticado } =
    authContext;

  // // En caso de que el password o usuario no exista
  // useEffect(() => {
  //   if (autenticado) {
  //     console.log(autenticado);
  //     console.log(usuario);
  //     props.history.push("/registroUniversitario");
  //   }
  //   if (mensaje) {
  //     mostrarAlerta(mensaje.msg, mensaje.categoria);
  //   }
  // }, [mensaje, autenticado, props.history]);

  const [usuarioForm, setusuario] = useState({
    cu: "",
    password: "",
  });

  const { cu, password } = usuarioForm;

  const onchange = (e) => {
    setusuario({
      ...usuarioForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (cu.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorio", "danger");
    }
    iniciarSesion({ cu, password });
  };

  // En caso de que el password o usuario no exista
  useEffect(() => {
    if (autenticado) {
      if (usuario === null) {
        console.log("...Cargando");
      } else if (usuario.cargo === "Administrador") {
        props.history.push("/registroUniversitario");
      } else if (usuario.cargo === "Encargado de Mesa") {
        props.history.push("/encargadoMesa");
      } else if (usuario.cargo === "Verificador de Votante") {
        props.history.push("/verificadorVotante");
      }
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  }, [mensaje, autenticado, props.history, usuario]);
  return (
    <Fragment>
      <div className="row justify-content-md-center">
        <div className="card m-3">
          {alerta ? (
            <div className={`alert alert-${alerta.categoria}`}>
              {alerta.msg}
            </div>
          ) : null}
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <h3 className="text-center m-3">INICIAR SESION</h3>
              <div className="row">
                <div className="col">
                  <label htmlFor="">Usuario:</label>
                  <input
                    type="number"
                    name="cu"
                    placeholder="Usuario"
                    className="form-control"
                    onChange={onchange}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="">Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="form-control"
                    onChange={onchange}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-success mt-3 col-12">
                Iniciar Sesion
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
