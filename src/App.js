import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Fragment } from "react";
import ListaUniversitarios from "./Components/Admin/RegistroUniversitario/ListaUniversitarios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UniversitarioIndex from "./Components/Admin/RegistroUniversitario/UniversitarioIndex";
import NavBar from "./Components/Navbar/NavBar";

function App() {
  return (
    <Fragment>
      <NavBar />
      <BrowserRouter>
        <Switch>
          <Route path="/editar/:id" component={ListaUniversitarios} />
          <Route path="/" exact component={UniversitarioIndex} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
