import React, { Fragment, useState, useEffect, useContext } from "react";
import FrentesContext from "../../context/frentes/FrentesContext";
import VotanteContext from "../../context/votante/votanteContext";
import Cards from "../Usuario/encargadoMesa/Cards";
import * as crypto from 'crypto-js'

const Votacion = () => {
  const frentesContext = useContext(FrentesContext);
  const { frentes, obtenerFrentes } = frentesContext;
  const votanteContext = useContext(VotanteContext);
  const { autorizandoVotante, actualizarVotante, ultimoVotante } =
    votanteContext;

  const btnVotar = async (frente) => {
    const votante = {
      cu: autorizandoVotante.cu,
      descripcionProblemaEncargadoMesa:
        autorizandoVotante.descripcionProblemaEncargadoMesa,
      descripcionProblemaVerificadorVotante:
        autorizandoVotante.descripcionProblemaVerificadorVotante,
      encargadoMesa: autorizandoVotante.encargadoMesa,
      verificadorVotante: autorizandoVotante.verificadorVotante,
      estadoEncargadoMesa: autorizandoVotante.estadoEncargadoMesa,
      estadoVerificadorVotante: autorizandoVotante.estadoVerificadorVotante,
      _idFrente: frente._id,
    };
    actualizarVotante(autorizandoVotante._id, votante);
  };

  useEffect(() => {
    obtenerFrentes();
  }, []);
  return (
    <Fragment>
      {autorizandoVotante ? (
        autorizandoVotante.estadoEncargadoMesa &&
        autorizandoVotante.estadoVerificadorVotante &&
        autorizandoVotante._idFrente === null ? (
          <div className="container mt-4">
            <Cards estudiante={autorizandoVotante} usuario={null} />
            <h1 className="text-center mt-4">Votación</h1>
            <div className="row">
              {frentes.length > 0 ? (
                frentes.map((frente) => (
                  <div className="col-md-4 mt-3" key={frente._id}>
                    <div
                      className="card text-center"
                      style={{ width: "18rem", display: "block" }}
                    >
                      <img
                        src={`http://localhost:4000/${frente.logoFrente}`}
                        // src={`http://192.168.0.6:4000/${frente.logoFrente}`}
                        alt="..."
                        width="150"
                        height="160"
                        className="mt-3"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{crypto.AES.decrypt(frente.nombreFrente,'palabraClave').toString(crypto.enc.Utf8)}</h5>
                        <button
                          className="btn btn-primary"
                          onClick={() => btnVotar(frente)}
                        >
                          Votar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Sin datos</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>
              Advertencia: Antes realizar su voto verifique sus datos por favor
            </p>
            <button className="btn btn-success" onClick={() => ultimoVotante()}>
              Empezar
            </button>
          </div>
        )
      ) : (
        <div>
          <p>
            Advertencia: Antes realizar su voto verifique sus datos por favor
          </p>
          <button className="btn btn-success" onClick={() => ultimoVotante()}>
            Empezar
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Votacion;
