import React, { Fragment, useState, useEffect, useContext } from "react";
import FrentesContext from "../../context/frentes/FrentesContext";
import VotanteContext from "../../context/votante/votanteContext";
import Cards from "../Usuario/encargadoMesa/Cards";
// import * as crypto from "crypto-js";
import AuthContext from "../../context/autenticacion/authContext";
import usuarioAxios from "../../config/axios";
import jsPDF from "jspdf";

const Votacion = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;

  const frentesContext = useContext(FrentesContext);
  const { nombreLogoUnico, obtenerFrentes, estudiantesPorRegistro } =
    frentesContext;
  const votanteContext = useContext(VotanteContext);
  const { actualizarVotante, datosVotante, obtenerVotante } = votanteContext;
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  const [confirmado, setconfirmado] = useState(false);
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);
  const [estudiante, setestudiante] = useState();
  const [alerta, setalerta] = useState();

  const btnVotar = async (frente) => {
    const votante = {
      cu: usuario.cu,
      _idFrente: frente.id[0],
      // _idFrente: frente._id,
    };
    actualizarVotante(datosVotante._id, votante);
    setTimeout(() => {
      setconfirmado(false);
    }, 3000);
    setconfirmado(true);
  };

  const generarCertificadoPDF = () => {
    try {
      const doc = new jsPDF({
        orientation: "landscape",
        format: "letter",
      });

      const widthPage = doc.internal.pageSize.getWidth();

      doc.text(`CERTIFICADO DE SUFRAGIO 2021`, widthPage / 3, 10);
      doc.text(`ELECCION DE CENTRO DE ESTUDIANTES`, widthPage / 3.5, 20);
      doc.text(`FACULTAD DE TECNOLOGIA`, widthPage / 3, 30);
      doc.text(`PRESIDENTE COMITE ELECTORAL`, widthPage / 2, 190);
      doc.text('Fecha y Hora:'+new Date().toString().substr(3,22), widthPage /1.98, 200);
      // doc.text(
      //   `Fecha Proceso Electoral ${estudiantesPorRegistro[0].registro}`,
      //   widthPage / 12,
      //   20
      // );

      doc.autoTable({
        startY: 35,
        head: [
          [
            { content: "Nombre (s)" },
            { content: "Apellido (s)" },
            { content: "Carnet Universitario" },
            { content: "Carnet Identidad" },
            { content: "Carrera" },
          ],
        ],
      });
      // es.map((estudiante) => {
      doc.autoTable({
        columnStyles: {
          0: { cellWidth: 45 },
          1: { cellWidth: 43 },
          2: { cellWidth: 70 },
          3: { cellWidth: 55 },
        },
        body: [
          [
            estudiante.nombre,
            estudiante.apellidos,
            estudiante.cu,
            estudiante.ci,
            estudiante.carrera,
          ],
        ],
      });
      // });
      doc.save("certificadoSufragio.pdf");
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setalerta(null);
      }, 3000);
      setalerta(
        { msg: "Aun no hay estudiantes registrados" },
        { categoria: "danger" }
      );
    }
  };

  useEffect(() => {
    if (usuario) {
      obtenerVotante(usuario.cu);
      const obteniendoDatosVotante = () => {
        usuarioAxios
          .get(`/api/lista_estudiantes/${usuario.cu}`)
          .then((res) => setestudiante(res.data.estudiante));
      };
      obteniendoDatosVotante();
    }
    // obtenerFrentes();
    const ultimoProcesoEleccionario = () => {
      usuarioAxios.get("/api/procesoElectoral").then((res) => {
        setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);
        obtenerFrentes(res.data.ultimoProcesoElectoral);
      });
    };
    ultimoProcesoEleccionario();
  }, [confirmado]);
  return (
    <Fragment>
      {alerta ? (
        <div className={`alert alert-${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      {ultimoProcesoElectoral.length > 0 ? (
        ultimoProcesoElectoral[0].estado ? (
          <>
            {confirmado ? (
              <>
                <h3 className="text-center mt-5">
                  Voto Realizado Correctamente
                </h3>
              </>
            ) : datosVotante ? (
              datosVotante._idFrente ? (
                <>
                  <h3 className="text-center mt-5">Usted ya realizó su voto</h3>
                  <button
                    type="button"
                    className="btn btn-success mt-3"
                    onClick={() => generarCertificadoPDF()}
                  >
                    Generar Certificado
                  </button>
                </>
              ) : datosVotante.estadoEncargadoMesa &&
                datosVotante.estadoVerificadorVotante ? (
                <div className="container mt-4">
                  <Cards estudiante={usuario} usuario={null} />
                  <h1 className="text-center mt-4">Votación</h1>
                  <div className="row">
                    {/* {frentes.length > 0 ? ( */}
                    {nombreLogoUnico.length > 0 ? (
                      nombreLogoUnico[0].map((frente) => (
                        <div className="col-md-4 mt-3" key={frente._id}>
                          <div
                            className="card text-center"
                            style={{ width: "18rem", display: "block" }}
                          >
                            <img
                              // src={`http://localhost:4000/${frente.logoFrente[0]}`}
                              src={`${URL}/${frente.logoFrente[0]}`}
                              alt="..."
                              width="150"
                              height="160"
                              className="mt-3"
                            />
                            <div className="card-body">
                              <h5 className="card-title">
                                {frente._id}
                                {/* {crypto.AES.decrypt(
                                  frente.nombreFrente,
                                  "palabraClave"
                                ).toString(crypto.enc.Utf8)} */}
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
                <h3 className="text-center mt-5">
                  Usted aún no esta habilitado para votar
                </h3>
              )
            ) : (
              <h3 className="text-center mt-5">
                Usted aún no esta habilitado para votar
              </h3>
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
          </>
        ) : (
          <h3 className="text-center mt-5">
            Todos los procesos electorales estan cerrados
          </h3>
        )
      ) : (
        <h3 className="text-center mt-5">No ningún Proceso Electoral</h3>
      )}
    </Fragment>
  );
};

export default Votacion;
