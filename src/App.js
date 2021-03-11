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
    { id: 0, nombre: "Adolfo", apellido: "Aldana" },
    { id: 1, nombre: "Marcos", apellido: "Rodriguez" },
    { id: 2, nombre: "Martha", apellido: "Peñaranda" },
  ];

  const [estudiantes, setestudiantes] = useState(ListaEstudiantes);

  const guardarEstudiante = (estudiante) => {
    setestudiantes([...estudiantes, estudiante]);
  };

  const eliminarEstudiante = nombre => {
    console.log(nombre);
    const nuevosEstudiantes = estudiantes.filter(estudiante => estudiante.nombre !== nombre)
    setestudiantes(nuevosEstudiantes)
  };

  return (
    <Fragment>
      <RegistroUniversitario guardarEstudiante={guardarEstudiante} />
      <ListaUniversitarios
        estudiantes={estudiantes}
        eliminarEstudiante={eliminarEstudiante}
      />
    </Fragment>
  );
}

export default App;
