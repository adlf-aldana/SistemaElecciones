import React, { Fragment, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const NavBar = () => {
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Sistema De Votación
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {usuario ? (
            usuario.cargo === "Administrador" ? (
              <>
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink
                      to="proceso-eleccionario"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Proceso Eleccionario
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="registroUniversitario"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Gestion Universitario
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="registroFrente"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Gestion Frente
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="gestionarMesas"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Gestion Mesas
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="informe"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Reporte
                    </NavLink>
                  </li>
                </ul>
                <div className="d-flex flex-row-reverse">
                  <button
                    className="btn btn-outline-success "
                    type="button"
                    onClick={() => cerrarSesion()}
                  >
                    Cerrar Sesion
                  </button>
                  <p className="text-white my-auto mr-3">
                    Hola {usuario.nombre}
                  </p>
                </div>
              </>
            ) : usuario.cargo === "Encargado de Mesa" ? (
              <>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink
                      to="encargadoMesa"
                      activeClassName="active"
                      className="nav-link"
                    >
                      Encargado de Mesa
                    </NavLink>
                  </li>
                </ul>

                <div className="d-flex flex-row-reverse">
                  <button
                    className="btn btn-outline-success "
                    type="button"
                    onClick={() => cerrarSesion()}
                  >
                    Cerrar Sesion
                  </button>
                  <p className="text-white my-auto mr-3">
                    Hola {usuario.nombre}
                  </p>
                </div>
              </>
            ) : usuario.cargo === "Verificador de Votante" ? (
              <>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <NavLink
                      to="verificadorVotante"
                      activeClassName="active"
                      className="nav-link"
                    >
                      Verificador Votante
                    </NavLink>
                  </li>
                </ul>

                <div className="d-flex flex-row-reverse">
                  <button
                    className="btn btn-outline-success "
                    type="button"
                    onClick={() => cerrarSesion()}
                  >
                    Cerrar Sesion
                  </button>
                  <p className="text-white my-auto mr-3">
                    Hola {usuario.nombre}
                  </p>
                </div>
              </>
            ) : (
              <div className="d-flex flex-row-reverse">
                <button
                  className="btn btn-outline-success "
                  type="button"
                  onClick={() => cerrarSesion()}
                >
                  Cerrar Sesion
                </button>
              </div>
            )
          ) : null}
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
