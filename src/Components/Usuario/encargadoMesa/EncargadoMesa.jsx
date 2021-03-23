import axios from "axios";
import React, { Fragment, useState } from "react";
import Cards from "./Cards";

const EncargadoMesa = () => {
  const URL = "http://localhost:4000/api/consulta_universitario_cu/";
  // DATOS DEL FORMULARIO
  const [dataForm, setdataForm] = useState({
    cuUniversitario: "",
  });

  const [EncargadoMesa, setEncargadoMesa] = useState({
    nombre: "Nombre Encargado",
    apellidos: "Apellidos Encargado",
    cuEncargado: "11111",
    carrera: "Carrera encargado",
  });

  const [votante, setvotante] = useState();

  const handleChange = (e) => {
    setdataForm({ [e.target.name]: e.target.value });
  };

  const { cuUniversitario } = dataForm;

  const onSubmit = async (e) => {
    e.preventDefault();
    const datos = await axios.get(URL + cuUniversitario);
    setvotante(datos.data.msg);
    setdataForm({
      cuUniversitario: "",
    });
  };

  return (
    <Fragment>
      <div className="container mt-3">
        <h1 className="text-center">Encargado de Mesa</h1>

        <Cards EncargadoMesa={EncargadoMesa} />

        <form onSubmit={onSubmit}>
          <div className="row mt-3">
            <div className="col-md-3">
              <strong>Habilitar a Votante:</strong>
            </div>

            <div className="col-md-5">
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
        </form>

        {votante ? <Cards votante={votante} /> : null}
      </div>
    </Fragment>
  );
};

export default EncargadoMesa;
