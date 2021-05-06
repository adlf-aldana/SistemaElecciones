import axios from "axios";
import React, { Fragment, useState } from "react";
import Cards from "../../Usuario/encargadoMesa/Cards";
import ListaUniversitarios from "./ListaUniversitarios";
import RegistroUniversitario from "./RegistroUniversitario";

const UniversitarioIndex = () => {
  const URL = "http://localhost:4000/api/lista_estudiantes/";
  const URL_CU = "http://localhost:4000/api/consulta_universitario_cu/";

  const [estudiantes, setestudiantes] = useState([]);
  const [editUni, seteditUni] = useState([]);
  const [message, setmessage] = useState({
    text: "",
    status: false,
    type: "",
  });

  // OBTENIENDO DATOS
  const getEstudiantes = async () => {
    try {
      const res = await axios.get(URL);
      setestudiantes(res.data);
    } catch (e) {
      console.log("No se cargo los datos: " + e);
    }
  };

  // GUARDAR DATOS
  const postEstudiantes = async (datosEstudiantes) => {
    if (editUni._id) {
      try {
        await axios.put(URL + editUni._id, datosEstudiantes);
        seteditUni([]);
        message({
          text: "Editado Correctamente",
          status: true,
          type: "success",
        });
        setTimeout(() => {
          message({
            text: "",
            status: false,
            type: "",
          });
        }, 5000);
      } catch (e) {
        console.log("No se edito los datos: " + e);
      }
    } else {
      try {
        await axios.post(URL, datosEstudiantes);
        message({
          text: "Guardado Correctamente",
          status: true,
          type: "success",
        });
        setTimeout(() => {
          message({
            text: "",
            status: false,
            type: "",
          });
        }, 5000);
      } catch (e) {
        console.log("No se guardo los datos: " + e);
      }
    }
    getEstudiantes();
  };

  // ELIMINAR DATO
  const eliminarEstudiante = async (id) => {
    if (window.confirm("¿Esta seguro de eliminar?")) {
      try {
        await axios.delete(URL + id);
        getEstudiantes();
        message({
          text: "Eliminado correctamente",
          status: true,
          type: "success",
        });
        setTimeout(() => {
          message({
            text: "",
            status: false,
            type: "",
          });
        }, 5000);
      } catch (e) {
        console.log("No se elimino los datos: " + e);
      }
    }
  };

  // EDITAR DATOS
  const editarUniversitario = (datos) => {
    seteditUni(datos);
  };

  const [dataForm, setdataForm] = useState({
    cuUniversitario: "",
  });
  const [votante, setvotante] = useState();
  const { cuUniversitario } = dataForm;
  const handleChange = (e) => {
    setdataForm({ [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const datos = await axios.get(URL_CU + cuUniversitario);
    setvotante(datos.data.msg);
    setdataForm({
      cuUniversitario: "",
    });
  };

  return (
    <Fragment>
      <div className="container">
        <RegistroUniversitario
          // guardarEstudiante={guardarEstudiante}
          postEstudiantes={postEstudiantes}
          editUni={editUni}
          message={message}
          setmessage={setmessage}
        />
        {/* <ListaUniversitarios
          eliminarEstudiante={eliminarEstudiante}
          estudiantes={estudiantes}
          getEstudiantes={getEstudiantes}
          editarUniversitario={editarUniversitario}
        /> */}
        <br />
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="cuUniversitario"
                className="form-control"
                placeholder="Introduzca carnet universitario"
                onChange={handleChange}
                value={cuUniversitario}
              />
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-success">
                Buscar
              </button>
            </div>
          </div>
          {votante ? <Cards votante={votante} /> : null}
        </form>
      </div>
    </Fragment>
  );
};

export default UniversitarioIndex;
