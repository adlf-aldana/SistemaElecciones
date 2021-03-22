import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* 
            BUTTON: COLLAPSE
             */}
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
          {/* 
          LOGO O NOMBRE APP
           */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                APP
              </NavLink>
            </li>
          </ul>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* 
                LINK REGISTRO UNIVERSITARIO
                 */}
              <li className="nav-item">
                <NavLink
                  to="registroUniversitario"
                  activeclassname="active"
                  className="nav-link"
                >
                  Registro Universitario
                </NavLink>
              </li>
              {/* 
                LINK REGISTRO FRENTE 
            */}
              <li className="nav-item">
                <NavLink
                  to="registroFrente"
                  activeclassname="active"
                  className="nav-link"
                >
                  Registro Frente
                </NavLink>
              </li>
              {/* 
              LINK ENCARGADO DE MESA
               */}

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
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
