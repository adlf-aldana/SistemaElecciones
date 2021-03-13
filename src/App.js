import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/popper.js/dist/umd/popper.min.js";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import RegistroUniversitario from "./Components/Admin/RegistroUniversitario/RegistroUniversitario";
import { Fragment, useState } from "react";
import ListaUniversitarios from "./Components/Admin/RegistroUniversitario/ListaUniversitarios";
import axios from "axios";

function App() {
  const URL = "http://localhost:4000/api/lista_estudiantes/";
  const [estudiantes, setestudiantes] = useState([]);

  // OBTENIENDO DATOS
  const getEstudiantes = async () => {
    const res = await axios.get(URL);
    setestudiantes(res.data);
  };

  // GUARDAR DATOS
  const postEstudiantes = async (datosEstudiantes) => {
    await axios.post(URL, datosEstudiantes);
    getEstudiantes();
  };

  // Eliminar Dato
  const eliminarEstudiante = async (id) => {
    await axios.delete(URL + id);
    getEstudiantes();
  };

  return (
    <Fragment>
      <RegistroUniversitario
        // guardarEstudiante={guardarEstudiante}
        postEstudiantes={postEstudiantes}
      />
      <ListaUniversitarios
        eliminarEstudiante={eliminarEstudiante}
        estudiantes={estudiantes}
        getEstudiantes={getEstudiantes}
      />
    </Fragment>
  );
}

export default App;
