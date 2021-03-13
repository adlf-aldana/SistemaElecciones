import axios from "axios";
import React, { Fragment, useState } from "react";
import ListaUniversitarios from "./ListaUniversitarios";
import RegistroUniversitario from "./RegistroUniversitario";

const UniversitarioIndex = () => {
  const URL = "http://localhost:4000/api/lista_estudiantes/";
  const [estudiantes, setestudiantes] = useState([]);

  // OBTENIENDO DATOS
  const getEstudiantes = async () => {
    const res = await axios.get(URL);
    setestudiantes(res.data);
  };
  const [editUni, seteditUni] = useState([]);

  // GUARDAR DATOS
  const postEstudiantes = async (datosEstudiantes) => {
    if (editUni.length !== 0) {
      await axios.put(URL + editUni._id, datosEstudiantes);
    } else {
      await axios.post(URL, datosEstudiantes);
      getEstudiantes();
    }
  };

  // ELIMINAR DATO
  const eliminarEstudiante = async (id) => {
    await axios.delete(URL + id);
    getEstudiantes();
  };

  // EDITAR DATOS
  const editarUniversitario = (datos) => {
    seteditUni(datos);
  };

  return (
    <Fragment>
      <RegistroUniversitario
        // guardarEstudiante={guardarEstudiante}
        postEstudiantes={postEstudiantes}
        editUni={editUni}
      />
      <ListaUniversitarios
        eliminarEstudiante={eliminarEstudiante}
        estudiantes={estudiantes}
        getEstudiantes={getEstudiantes}
        editarUniversitario={editarUniversitario}
      />
    </Fragment>
  );
};

export default UniversitarioIndex;
