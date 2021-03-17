import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

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
            {/* 
                LINK REGISTRO UNIVERSITARIO
                 */}
            <li className="nav-item">
              <NavLink to="/" activeclassName="active">
                <a className="nav-link">APP</a>
              </NavLink>
            </li>
          </ul>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* 
                LINK REGISTRO UNIVERSITARIO
                 */}
              <li className="nav-item">
                {/* <Link to="/registroUniversitario">
                  <a className="nav-link active" aria-current="page">
                    REGISTRO UNIVERSITARIO
                  </a>
                </Link> */}
                <NavLink to="registroUniversitario" activeclassName="active">
                  <a className="nav-link">Registro Universitario</a>
                </NavLink>
              </li>
              {/* 
                LINK REGISTRO FRENTE 
            */}
              <li className="nav-item">
                <a className="nav-link">REGISTRO FRENTE</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
