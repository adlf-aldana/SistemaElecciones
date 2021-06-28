import React, { Fragment, useState, useEffect, useContext } from "react";
import FrentesContext from "../../context/frentes/FrentesContext";
import VotanteContext from "../../context/votante/votanteContext";
import Cards from "../Usuario/encargadoMesa/Cards";
import * as crypto from "crypto-js";
import AuthContext from "../../context/autenticacion/authContext";

const Votacion = () => {
  const frentesContext = useContext(FrentesContext);
  const { frentes, obtenerFrentes } = frentesContext;
  const votanteContext = useContext(VotanteContext);
  const { actualizarVotante, datosVotante, obtenerVotante } = votanteContext;
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const [confirmado, setconfirmado] = useState(false);

  const btnVotar = async (frente) => {
    const votante = {
      cu: usuario.cu,
      _idFrente: frente._id,
    };
    actualizarVotante(datosVotante._id, votante);
    setTimeout(() => {
      setconfirmado(false);
    }, 3000);
    setconfirmado(true);
  };

  useEffect(() => {
    obtenerVotante(usuario.cu);
    obtenerFrentes();
  }, []);
  return (
    <Fragment>
      {confirmado ? (
        <h3 className="text-center mt-5">Voto Realizado Correctamente</h3>
      ) : datosVotante ? (
        datosVotante._idFrente ? (
          <h3 className="text-center mt-5">Usted ya realizó su voto</h3>
        ) : datosVotante.estadoEncargadoMesa &&
          datosVotante.estadoVerificadorVotante ? (
          <div className="container mt-4">
            <Cards estudiante={usuario} usuario={null} />
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
                        <h5 className="card-title">
                          {crypto.AES.decrypt(
                            frente.nombreFrente,
                            "palabraClave"
                          ).toString(crypto.enc.Utf8)}
                        </h5>
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
                <h4>No hay frente</h4>
              )}
            </div>
          </div>
        ) : (
          <h4>Usted aún no esta habilitado para votar2</h4>
        )
      ) : (
        <h4>Usted aún no esta habilitado para votar3</h4>
      )}

      {/* {confirmado ? (
        <h3 className="text-center mt-5">Voto Realizado Correctamente</h3>
      ) : autorizandoVotante ? (
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
                        <h5 className="card-title">
                          {crypto.AES.decrypt(
                            frente.nombreFrente,
                            "palabraClave"
                          ).toString(crypto.enc.Utf8)}
                        </h5>
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
          <div className="text-center mt-3">
            <h3>ADVERTENCIA</h3>
            <hr />
            <h4>Usted aún no esta habilitado para votar</h4>
            <button
              className="btn btn-success mt-4"
              onClick={() => ultimoVotante()}
            >
              Actualizar
            </button>
          </div>
        )
      ) : (
        <div className="text-center mt-3">
          <h3>ADVERTENCIA</h3>
          <hr />
          <h4>Usted aún no esta habilitado para votar</h4>
          <button
            className="btn btn-success mt-4"
            onClick={() => ultimoVotante()}
          >
            Actualizar
          </button>
        </div>
      )} */}
    </Fragment>
  );
};

export default Votacion;
