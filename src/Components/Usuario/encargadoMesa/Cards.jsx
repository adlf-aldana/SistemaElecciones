import React, { Fragment } from "react";

const Cards = ({
  estudiante,
  editarUniversitario,
  eliminar,
  usuario,
  confirmar,
  autorizandoVotante,
  rechazar,
}) => {
  const user = usuario ? usuario : estudiante ? estudiante : null;
  return (
    <Fragment>
      <div className="card mt-5">
        <div className="card-header text-center">
          {/* <strong>{usuario ? usuario.cargo : "DATOS DEL ESTUDIANTE"}</strong> */}
          <strong>{estudiante ? "DATOS DEL ESTUDIANTE" : usuario.cargo}</strong>
        </div>
        <div className="card-body">
          <div className="row mt-3">
            <div className="col">
              <strong>Nombre: </strong>
              <label htmlFor="">
                {estudiante ? estudiante.nombre : usuario.nombre}
              </label>
            </div>
            <div className="col">
              <strong>Apellidos: </strong>
              <label htmlFor="">
                {estudiante ? estudiante.apellidos : usuario.apellidos}
              </label>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <strong>Carnet Universitario: </strong>
              <label htmlFor="">
                {estudiante ? estudiante.cu : usuario.cu}
              </label>
            </div>
            <div className="col">
              <strong>Carrera: </strong>
              <label htmlFor="">
                {estudiante ? estudiante.carrera : usuario.carrera}
              </label>
            </div>
          </div>

          {(estudiante && usuario.cargo === "Encargado de Mesa") ||
          (autorizandoVotante && usuario.cargo === "Verificador de Votante") ? (
            <div className="mt-3">
              <button
                className="btn btn-success mr-2"
                onClick={() => confirmar()}
              >
                Confirmar
              </button>
              <button className="btn btn-danger" onClick={() => rechazar()}>
                Rechazar
              </button>
            </div>
          ) : estudiante && usuario.cargo === "Administrador" ? (
            <div>
              <button
                onClick={() => editarUniversitario(estudiante)}
                className="btn btn-warning mt-3 mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => eliminar(estudiante._id)}
                className="btn btn-danger mt-3"
              >
                Eliminar
              </button>
            </div>
          ) : !estudiante &&
            usuario.cargo === "Encargado de Mesa" ? null : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Cards;
