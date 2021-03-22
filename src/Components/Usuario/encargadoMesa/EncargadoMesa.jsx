import React, { Fragment, useState } from "react";
import Cards from "./Cards";

const EncargadoMesa = () => {
  const [EncargadoMesa, setEncargadoMesa] = useState({
    nombre: "Nombre Encargado",
    apellidos: "Apellidos Encargado",
    cuEncargado: "11111",
    carrera: "Carrera encargado",
  });

  const [votante, setvotante] = useState({
    nombre: "Nombre votante",
    apellidos: "Apellidos votante",
    cuVotante: "22222",
    carrera: "Carrera votante",
  });

  const [cuVotante, setcuVotante] = useState();

  const handleChange = (e) => {
    setcuVotante(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(cuVotante);
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
