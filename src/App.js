import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UniversitarioIndex from "./Components/Admin/RegistroUniversitario/UniversitarioIndex";
import NavBar from "./Components/Navbar/NavBar";
import Login from "./Components/Login/Login";
import RegistroFrente from "./Components/Admin/RegistroFrente/RegistroFrente";
import EncargadoMesa from "./Components/Usuario/encargadoMesa/EncargadoMesa";
import Votacion from "./Components/Votacion/Votacion";

function App() {
  return (
    <Fragment>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/registroUniversitario" component={UniversitarioIndex} />
          <Route path="/registroFrente" component={RegistroFrente} />
          <Route path="/encargadoMesa" component={EncargadoMesa} />
          <Route path="/votacion" component={Votacion} />
          <Route path="/" exact component={Login} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
