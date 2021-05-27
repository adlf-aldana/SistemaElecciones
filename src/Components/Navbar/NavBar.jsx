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
          APP
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
                      to="registroUniversitario"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Registro Universitario
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="registroFrente"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Registro Frente
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="informe"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Informe
                    </NavLink>
                  </li>
                </ul>
                <div class="d-flex flex-row-reverse">
                  <button
                    class="btn btn-outline-success "
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

                <div class="d-flex flex-row-reverse">
                  <button
                    class="btn btn-outline-success "
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
            ) : null
          ) : null}
        </div>
      </nav>

      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                APP
              </NavLink>
            </li>
          </ul>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {usuario ? (
                usuario.cargo === "Administrador" ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="registroUniversitario"
                        activeclassname="active"
                        className="nav-link"
                      >
                        Registro Universitario
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to="registroFrente"
                        activeclassname="active"
                        className="nav-link"
                      >
                        Registro Frente
                      </NavLink>
                    </li>

                    <li className="nav-item">
                      <NavLink
                        to="informe"
                        activeclassname="active"
                        className="nav-link"
                      >
                        Informe
                      </NavLink>
                    </li>

                    
                  </>
                ) : usuario.cargo === "Encargado de Mesa" ? (
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="encargadoMesa"
                        activeClassName="active"
                        className="nav-link"
                      >
                        Encargado de Mesa
                      </NavLink>
                    </li>

                    <form class="form-inline my-2 my-lg-0">
                      <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                      >
                        Search
                      </button>
                    </form>
                  </>
                ) : null
              ) : null}
            </ul>
          </div> */}

      {/* {usuario ? (
            <>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo03"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      to="registroUniversitario"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Registro Universitario
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="registroFrente"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Registro Frente
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="informe"
                      activeclassname="active"
                      className="nav-link"
                    >
                      Informe
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="encargadoMesa"
                      activeClassName="active"
                      className="nav-link"
                    >
                      Encargado de Mesa
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      to="votacion"
                      activeClassName="active"
                      className="nav-link"
                    >
                      Votacion
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div class="d-flex flex-row-reverse">
                <button
                  class="btn btn-outline-success "
                  type="button"
                  onClick={() => cerrarSesion()}
                >
                  Cerrar Sesion
                </button>
                <p className="text-white my-auto mr-3">Hola {usuario.nombre}</p>
              </div>
            </>
          ) : null} */}

      {/* </div>
      </nav> */}
    </Fragment>
  );
};

export default NavBar;
