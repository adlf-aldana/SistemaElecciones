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
import FrentesState from "./context/frentes/FrentesState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";

import RutaAdmin from './Components/rutas/RutaAdmin'
import RutaEncargado from "./Components/rutas/RutaEncargado";


// Revisar si tenemos un token
const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token)
}
function App() {
  return (
    <UniversitarioState>
      <AlertaState>
        <FrentesState>
          <AuthState>
            <Router>
              <NavBar />
              <Switch>
                <RutaAdmin path="/registroUniversitario" component={UniversitarioIndex} />
                <RutaAdmin path="/registroFrente" component={RegistroFrente} />
                <RutaAdmin path="/informe" component={Informe} />
                <RutaEncargado path="/encargadoMesa" component={EncargadoMesa} />
                <Route path="/votacion" component={Votacion} />
                <Route path="/" exact component={Login} />
              </Switch>
            </Router>
          </AuthState>
        </FrentesState>
      </AlertaState>
    </UniversitarioState>
  );
}

export default App;
