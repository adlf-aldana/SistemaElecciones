import React, { Fragment, useContext, useState } from "react";
import VotanteContext from "../../../context/votante/votanteContext";

const Cards = ({
  estudiante,
  editarUniversitario,
  eliminar,
  usuario,
  confirmar,
  autorizandoVotante,
  rechazar,
  handleMotivo,
  descripcion,
}) => {
  const [rechazando, setrechazando] = useState(false);
  const votanteContext = useContext(VotanteContext);
  const { ultimoVotante } = votanteContext;
  const actualizando = () => {
    ultimoVotante();
  };
  return (
    <Fragment>
      <div className="card mt-5">
        <div className="card-header text-center">
          <strong>
            {estudiante ? "DATOS DEL ESTUDIANTE" : usuario.cargoLogin}
          </strong>
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
              <strong>Carnet Identidad: </strong>
              <label htmlFor="">
                {estudiante ? estudiante.ci : usuario.ci}
              </label>
            </div>
            <div className="col">
              <strong>Carrera: </strong>
              <label htmlFor="">
                {estudiante ? estudiante.carrera : usuario.carrera}
              </label>
            </div>
          </div>

          {/* MOSTRAR MENSAJE SI HUBIERA PROBLEMAS */}
          {estudiante && usuario ? (
            usuario.cargo === "Verificador de Votante" ? (
            // usuario.cargoLogin === "Verificador de Votante" ? (
              <div className="row mt-3">
                {estudiante.estadoEncargadoMesa ? (
                  <div className="col">
                    <label className="text-success">Sin problemas</label>
                  </div>
                ) : (
                  <div className="col">
                    <strong>Descripcion de Problema: </strong>
                    <label className="text-danger">
                      {estudiante.descripcionProblemaEncargadoMesa}
                    </label>
                  </div>
                )}
              </div>
            ) : null
          ) : null}

          {rechazando ? (
            <div className="form-group mt-3">
              <label>
                <strong>Explique detalladamente el motivo del rechazo:</strong>
              </label>
              <textarea
                className="form-control"
                name="descripcion"
                rows="3"
                onChange={handleMotivo}
                value={descripcion}
              ></textarea>
            </div>
          ) : null}

          {/* BOTONES CONFIRMAR RECHAZAR */}
          {usuario ? (
            // (estudiante && usuario.cargo === "Encargado de Mesa") ||
            (estudiante && usuario.cargoLogin === "Encargado de Mesa") ||
            // (autorizandoVotante &&
            //   usuario.cargo === "Verificador de Votante") ? (
            (estudiante && usuario.cargoLogin === "Verificador de Votante") ?(
              rechazando ? (
                <div className="mt-3">
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => rechazar()}
                  >
                    Confirmar Rechazo
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setrechazando(!rechazando)}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="mt-3">
                  <button
                    className="btn btn-success mr-2"
                    onClick={() => confirmar()}
                  >
                    Confirmar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setrechazando(!rechazando)}
                  >
                    Rechazar
                  </button>
                </div>
              )
            ) : estudiante && usuario.cargo === "Administrador" ? (
              <div>
                <button
                  onClick={() => editarUniversitario(estudiante)}
                  className="btn btn-warning mt-3 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(estudiante.id)}
                  className="btn btn-danger mt-3"
                >
                  Eliminar
                </button>
              </div>
            ) : !estudiante && usuario.cargo === "Verificador de Votante" ? (
              <button
                className="btn btn-success"
                onClick={() => actualizando()}
              >
                Actualizar
              </button>
            ) : null
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Cards;
