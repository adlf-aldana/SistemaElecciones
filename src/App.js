import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import RegistroUniversitario from "./Components/Admin/RegistroUniversitario/RegistroUniversitario";
import { Fragment, useState } from "react";
import ListaUniversitarios from "./Components/Admin/RegistroUniversitario/ListaUniversitarios";

function App() {
  const ListaEstudiantes = [
    { id: 1, nombre: "Adolfo", apellido: "Aldana" },
    { id: 2, nombre: "Marcos", apellido: "Rodriguez" },
    { id: 3, nombre: "Martha", apellido: "Peñaranda" },
  ];

  const [estudiantes, setestudiantes] = useState(ListaEstudiantes);

  const guardarEstudiante = (estudiante) => {
    setestudiantes([
      ...estudiantes,
      estudiante,
    ]);
  };

  return (
    <Fragment>
      <RegistroUniversitario
        estudiantes={estudiantes}
        guardarEstudiante={guardarEstudiante}
      />
      <ListaUniversitarios estudiantes={estudiantes} />
    </Fragment>
  );
}

export default App;
