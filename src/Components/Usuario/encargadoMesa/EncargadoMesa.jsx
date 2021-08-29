import React, { Fragment, useState, useContext, useEffect } from "react";
import Cards from "./Cards";

import AuthContext from "../../../context/autenticacion/authContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import VotanteContext from "../../../context/votante/votanteContext";
import AlertaContext from "../../../context/alerta/alertaContext";
import usuarioAxios from "../../../config/axios";

const EncargadoMesa = () => {
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta, alerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;
  const universitarioContext = useContext(UniversitarioContext);
  // const { limpiarUniversitarioBuscado } =
  //   universitarioContext;
  const votanteContext = useContext(VotanteContext);
  const {
    encargadoHabilitaVotante,
    ultimoVotante,
    autorizandoVotante,
    mensaje,
    limpiarMensaje,
    actualizarVotante,
    busquedaUniversitario,
    estudiante,
    limpiarUniversitarioBuscado,
  } = votanteContext;

  // DATOS DEL FORMULARIO
  const [dataForm, setdataForm] = useState({
    cuUniversitario: "",
  });
  const [motivoRechazo, setmotivoRechazo] = useState({ descripcion: "" });
  const { descripcion } = motivoRechazo;
  const [mesaHabilitada, setmesaHabilitada] = useState(false);
  const [numMesa, setNumMesa] = useState(false);
  const [actualizarDatos, setactualizarDatos] = useState(false);

  const handleMotivo = (e) => {
    setmotivoRechazo({
      ...motivoRechazo,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setdataForm({ [e.target.name]: e.target.value });
  };

  const { cuUniversitario } = dataForm;

  const onSubmit = (e) => {
    e.preventDefault();
    busquedaUniversitario(cuUniversitario);
  };

  useEffect(() => {
    usuarioAutenticado();
    ultimoVotante();
  }, [estudiante]);
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
      setTimeout(() => {
        limpiarMensaje();
      }, 3000);
    }
  }, [mensaje]);
  useEffect(() => {
    if (usuario) {
      usuarioAxios.get(`/api/mesas/${usuario.cu}`).then((res) => {
        setmesaHabilitada(res.data.mesaAbierta[0].habilitado);
        setNumMesa(res.data.mesaAbierta[0].mesa);
      });
    }
  }, [actualizarDatos]);

  const confirmar = async () => {
    if (usuario) {
      if (usuario.cargoLogin === "Encargado de Mesa") {
        const votante = {
          cu: estudiante.cu,
          encargadoMesa: true,
          estadoEncargadoMesa: true,
          numMesa: numMesa,
        };
        const res = await encargadoHabilitaVotante(votante);
        setactualizarDatos(!actualizarDatos);
        if (res) {
          setmotivoRechazo({
            descripcion: "",
          });
          setdataForm({
            cuUniversitario: "",
          });
          limpiarUniversitarioBuscado();
        }
      } else if (usuario.cargoLogin === "Verificador de Votante") {
        console.log(autorizandoVotante);
        console.log(numMesa);
        // VIENDO SI EL VOTANTE PERTENECE A LA MESA DEL VERIFICADOR
        if (autorizandoVotante.numMesa === numMesa.toString()) {
          const votante = {
            cu: autorizandoVotante.cu,
            verificadorVotante: true,
            estadoVerificadorVotante: true,
            numMesa: numMesa,
          };
          const res = await actualizarVotante(autorizandoVotante._id, votante);
          setactualizarDatos(!actualizarDatos);
          console.log(res);
          if (res) {
            setmotivoRechazo({
              descripcion: "",
            });
            setdataForm({
              cuUniversitario: "",
            });
            limpiarUniversitarioBuscado();
          }
        } else {
          mostrarAlerta("El universitario no pertenece a esta mesa", "danger");
        }
      }
    }
  };

  const rechazar = async () => {
    if (usuario) {
      if (usuario.cargoLogin === "Encargado de Mesa") {
        if (!descripcion)
          return mostrarAlerta(
            "Complete el campo de motivo de rechazo",
            "danger"
          );
        const votante = {
          cu: estudiante.cu,
          descripcionProblemaEncargadoMesa: descripcion,
          encargadoMesa: true,
          estadoEncargadoMesa: false,
          numMesa: numMesa,
        };
        const res = await encargadoHabilitaVotante(votante);
        if (res) {
          setmotivoRechazo({
            descripcion: "",
          });
          setdataForm({
            cuUniversitario: "",
          });
          limpiarUniversitarioBuscado();
        }
      } else if (usuario.cargoLogin === "Verificador de Votante") {
        if (!descripcion)
          return mostrarAlerta(
            "Complete el campo de motivo de rechazo",
            "danger"
          );
        const votante = {
          cu: autorizandoVotante.cu,
          descripcionProblemaVerificadorVotante: descripcion,
          verificadorVotante: true,
          estadoVerificadorVotante: false,
          numMesa: numMesa,
        };
        const res = await actualizarVotante(autorizandoVotante._id, votante);
        if (res) {
          setmotivoRechazo({
            descripcion: "",
          });
          setdataForm({
            cuUniversitario: "",
          });
          limpiarUniversitarioBuscado();
        }
      }
    }
  };

  return (
    <Fragment>
      <div className="container mt-3">
        {!mesaHabilitada ? (
          <p className="text-center mt-3">Mesa no habilitada</p>
        ) : (
          <>
            {usuario ? <Cards usuario={usuario} /> : null}
            {usuario ? (
              usuario.cargo === "Verificador de Votante" ? null : (
                <form onSubmit={onSubmit}>
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <strong>Habilitar a Votante:</strong>
                    </div>
                    <div className="col-md-5">
                      <input
                        type="number"
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
              )
            ) : null}
            {alerta ? (
              <div className={`alert alert-${alerta.categoria}`}>
                {alerta.msg}
              </div>
            ) : null}
            {estudiante ? (
              <Cards
                estudiante={estudiante}
                usuario={usuario}
                confirmar={confirmar}
                rechazar={rechazar}
                setmotivoRechazo={setmotivoRechazo}
                motivoRechazo={motivoRechazo}
                handleMotivo={handleMotivo}
                descripcion={descripcion}
              />
            ) : null}

            {usuario ? (
              autorizandoVotante &&
              usuario.cargo === "Verificador de Votante" ? (
                autorizandoVotante.verificadorVotante &&
                autorizandoVotante.encargadoMesa ? null : (
                  <Cards
                    estudiante={autorizandoVotante}
                    usuario={usuario}
                    confirmar={confirmar}
                    autorizandoVotante={autorizandoVotante}
                    rechazar={rechazar}
                    setmotivoRechazo={setmotivoRechazo}
                    motivoRechazo={motivoRechazo}
                    handleMotivo={handleMotivo}
                    descripcion={descripcion}
                  />
                )
              ) : null
            ) : null}
          </>
        )}

        {/*
              {usuario ? <Cards usuario={usuario} /> : null}
        {usuario ? (
          usuario.cargo === "Verificador de Votante" ? null : (
            <form onSubmit={onSubmit}>
              <div className="row mt-3">
                <div className="col-md-3">
                  <strong>Habilitar a Votante:</strong>
                </div>
                <div className="col-md-5">
                  <input
                    type="number"
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
          )
        ) : null}
        {alerta ? (
          <div className={`alert alert-${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        {estudiante ? (
          <Cards
            estudiante={estudiante}
            usuario={usuario}
            confirmar={confirmar}
            rechazar={rechazar}
            setmotivoRechazo={setmotivoRechazo}
            motivoRechazo={motivoRechazo}
            handleMotivo={handleMotivo}
            descripcion={descripcion}
          />
        ) : null}

        {usuario ? (
          autorizandoVotante && usuario.cargo === "Verificador de Votante" ? (
            autorizandoVotante.verificadorVotante &&
            autorizandoVotante.encargadoMesa ? null : (
              <Cards
                estudiante={autorizandoVotante}
                usuario={usuario}
                confirmar={confirmar}
                autorizandoVotante={autorizandoVotante}
                rechazar={rechazar}
                setmotivoRechazo={setmotivoRechazo}
                motivoRechazo={motivoRechazo}
                handleMotivo={handleMotivo}
                descripcion={descripcion}
              />
            )
          ) : null
            ) : null} */}
      </div>
    </Fragment>
  );
};

export default EncargadoMesa;
