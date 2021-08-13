import React, { Fragment, useState, useEffect, useContext } from "react";
import FrentesContext from "../../context/frentes/FrentesContext";
import VotanteContext from "../../context/votante/votanteContext";
import Cards from "../Usuario/encargadoMesa/Cards";
// import * as crypto from "crypto-js";
import AuthContext from "../../context/autenticacion/authContext";
import usuarioAxios from "../../config/axios";
import jsPDF from "jspdf";
import emailjs from "emailjs-com";

const Votacion = () => {
  const URL = process.env.REACT_APP_BACKEND_URL;

  const frentesContext = useContext(FrentesContext);
  const { nombreLogoUnico, obtenerFrentes, estudiantesPorRegistro } =
    frentesContext;
  const votanteContext = useContext(VotanteContext);
  const {
    actualizarVotante,
    datosVotante,
    obtenerVotante,
    encargadoHabilitaVotante,
  } = votanteContext;
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  const [confirmado, setconfirmado] = useState(false);
  const [ultimoProcesoElectoral, setultimoProcesoElectoral] = useState([]);
  const [estudiante, setestudiante] = useState();
  const [alerta, setalerta] = useState();
  const [codigoVotacion, setcodigoVotacion] = useState();
  const [habilitando, sethabilitando] = useState(false);
  const [PinHabilitado, setPinHabilitado] = useState(false);

  const btnVotar = async (frente) => {
    const votante = {
      cu: usuario.cu,
      _idFrente: frente.id[0],
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
      doc.text(`CARRERA DE SISTEMAS, CIENCIAS DE LA COMPUTACION,`, 52, 30);
      doc.text(
        `TECNOLOGIA DE LA INFORMACION Y SEGURIDAD, DISEÑO Y ANIMACION DIGITAL`,
        24,
        38
      );
      doc.text(`PRESIDENTE COMITE ELECTORAL`, widthPage / 2, 190);
      doc.text(
        "Fecha y Hora:" + new Date().toString().substr(3, 22),
        widthPage / 1.98,
        200
      );
      // doc.text(
      //   `Fecha Proceso Electoral ${estudiantesPorRegistro[0].registro}`,
      //   widthPage / 12,
      //   20
      // );

      doc.autoTable({
        startY: 42,
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

  const solicitarPin = async () => {
    try {
      if (usuario.email === null || usuario.email === undefined) {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "success",
          msg: "No se registro un email a esta cuenta",
        });
        return;
      }

      if (datosVotante) {
        const codigo = Math.floor(Math.random() * 1000000);
        const dataMessage = {
          cu: usuario.cu,
          user_email: usuario.email,
          codigo,
          numMesa: "00000",
        };
        await actualizarVotante(datosVotante._id, dataMessage);
        await obtenerVotante(usuario.cu);
        setPinHabilitado(!habilitando);

        emailjs
          .send(
            "service_8wqnh92",
            "template_g92nzbr",
            dataMessage,
            "user_xjBDvVhpA8EbjD7T95xbK"
          )
          .then(
            (result) => {
              setTimeout(() => {
                setalerta({});
              }, 3000);
              setalerta({
                categoria: "success",
                msg: "Se envió el código a su correo electrónico",
              });
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
              setTimeout(() => {
                setalerta({});
              }, 3000);
              setalerta({
                categoria: "success",
                msg: "Se produjo un error, vuelva a intentarlo más tarde",
              });
            }
          );
      } else {
        const codigo = Math.floor(Math.random() * 1000000);
        const dataMessage = {
          cu: usuario.cu,
          user_email: usuario.email,
          codigo,
          numMesa: "00000",
        };

        // const codigo = await
        const votante = {
          cu: estudiante.cu,
          encargadoMesa: true,
          estadoEncargadoMesa: true,
          descripcionProblemaEncargadoMesa: true,
          descripcionProblemaVerificadorVotante: true,
          numMesa: dataMessage.numMesa,
          codigo,
        };
        const res = await encargadoHabilitaVotante(votante);
        setPinHabilitado(true);

        emailjs
          .send(
            "service_8wqnh92",
            "template_g92nzbr",
            dataMessage,
            "user_xjBDvVhpA8EbjD7T95xbK"
          )
          .then(
            (result) => {
              setTimeout(() => {
                setalerta({});
              }, 3000);
              setalerta({
                categoria: "success",
                msg: "Se envió el código a su correo electrónico",
              });
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
              setTimeout(() => {
                setalerta({});
              }, 3000);
              setalerta({
                categoria: "success",
                msg: "Se produjo un error, vuelva a intentarlo más tarde",
              });
            }
          );
      }
    } catch (e) {
      console.log("" + e);
    }
  };

  const handleChange = (e) => {
    setcodigoVotacion({
      ...codigoVotacion,
      [e.target.name]: e.target.value,
    });
  };
  const confirmarPin = () => {
    try {
      if (!codigoVotacion) {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: "Introduzca un código",
        });
        return;
      }
      if (codigoVotacion.codigo.toString() === datosVotante.codigo.toString()) {
        const habilitando = {
          encargadoMesa: true,
          estadoEncargadoMesa: true,
          verificadorVotante: true,
          estadoVerificadorVotante: true,
        };
        actualizarVotante(datosVotante._id, habilitando);
        sethabilitando(true);
      } else {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: "Código incorrecto",
        });
      }
    } catch (e) {
      console.log("" + e);
    }
  };

  useEffect(() => {
    const obteniendoDatosVotante = async () => {
      try {
        const user = await usuarioAutenticado();

        await obtenerVotante(user.cu);

        await usuarioAxios
          .get(`/api/lista_estudiantes/${user.cu}`)
          .then((res) => {
            setestudiante(res.data.estudiante);
          });
      } catch (e) {
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setalerta({
          categoria: "danger",
          msg: "No es encontró a universitario",
        });
      }
    };

    const ultimoProcesoEleccionario = () => {
      usuarioAxios.get("/api/procesoElectoral").then((res) => {
        setultimoProcesoElectoral(res.data.ultimoProcesoElectoral);
        obtenerFrentes(res.data.ultimoProcesoElectoral);
      });
    };

    ultimoProcesoEleccionario();
    obteniendoDatosVotante();
  }, [confirmado, habilitando, PinHabilitado]);

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
                <div className="text-center">
                  <h3 className="mt-5">Usted ya realizó su voto</h3>
                  <button
                    type="button"
                    className="btn btn-success mt-3"
                    onClick={() => generarCertificadoPDF()}
                  >
                    Generar Certificado
                  </button>
                </div>
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
                              src={
                                `http://localhost:4000/${frente.logoFrente[0]}`
                                  ? `http://localhost:4000/${frente.logoFrente[0]}`
                                  : `${URL}/${frente.logoFrente[0]}`
                              }
                              // src={`${URL}/${frente.logoFrente[0]}`}
                              alt="..."
                              width="150"
                              height="160"
                              className="mt-3"
                            />
                            <div className="card-body">
                              <h5 className="card-title">{frente._id}</h5>
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
                <div className="text-center mt-5 container">
                  <h3>Usted aún no esta habilitado para votar</h3>

                  {PinHabilitado ? (
                    <>
                      <input
                        type="number"
                        placeholder="Introduzca su código"
                        className="form-control mt-3"
                        name="codigo"
                        onChange={(event) => handleChange(event)}
                      />
                      <button
                        type="button"
                        className="btn btn-success mt-3"
                        onClick={() => confirmarPin()}
                      >
                        Confirmar
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={() => solicitarPin()}
                    >
                      Solicitar Código
                    </button>
                  )}
                </div>
              )
            ) : (
              <div className="text-center mt-5 container">
                <h3>Usted aún no esta habilitado para votar</h3>

                {PinHabilitado ? (
                  <>
                    <input
                      type="number"
                      placeholder="Introduzca su código"
                      className="form-control mt-3"
                      name="codigo"
                      onChange={(event) => handleChange(event)}
                    />
                    <button
                      type="button"
                      className="btn btn-success mt-3"
                      onClick={() => confirmarPin()}
                    >
                      Confirmar
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary mt-3"
                    onClick={() => solicitarPin()}
                  >
                    Solicitar Código
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <h3 className="text-center mt-5">
            Todos los procesos electorales estan cerrados
          </h3>
        )
      ) : (
        <h3 className="text-center mt-5">No hay ningún Proceso Electoral</h3>
      )}
    </Fragment>
  );
};

export default Votacion;
