import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Fragment } from "react";
import ListaUniversitarios from "./Components/Admin/RegistroUniversitario/ListaUniversitarios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UniversitarioIndex from "./Components/Admin/RegistroUniversitario/UniversitarioIndex";
import NavBar from "./Components/Navbar/NavBar";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Fragment>
      <Router>
          <NavBar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registroUniversitario" exact component={UniversitarioIndex} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
