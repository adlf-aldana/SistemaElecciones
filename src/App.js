import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./Components/Navbar/NavBar";

import Login from "./Components/Login/Login";
import UniversitarioIndex from "./Components/Admin/RegistroUniversitario/UniversitarioIndex";
import RegistroFrente from "./Components/Admin/RegistroFrente/RegistroFrente";
import EncargadoMesa from "./Components/Usuario/encargadoMesa/EncargadoMesa";
import Votacion from "./Components/Votacion/Votacion";
import Informe from "./Components/Estadisticas/Informe/Informe";

import UniversitarioState from './context/universitarios/UniversitarioState'
import AlertaState from "./context/alerta/alertaState";

function App() {
  return (
    <UniversitarioState>
      <AlertaState>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/registroUniversitario" component={UniversitarioIndex} />
            <Route path="/registroFrente" component={RegistroFrente} />
            <Route path="/encargadoMesa" component={EncargadoMesa} />
            <Route path="/votacion" component={Votacion} />
            <Route path="/informe" component={Informe} />
            <Route path="/" exact component={Login} />
          </Switch>
        </Router>
      </AlertaState>
    </UniversitarioState>
  );
}

export default App;
