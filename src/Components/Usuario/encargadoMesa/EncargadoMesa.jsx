import React, { Fragment, useState, useContext, useEffect } from "react";
import Cards from "./Cards";

import AuthContext from "../../../context/autenticacion/authContext";
import UniversitarioContext from "../../../context/universitarios/UniversitarioContext";
import VotanteContext from "../../../context/votante/votanteContext";
import AlertaContext from "../../../context/alerta/alertaContext";

const EncargadoMesa = () => {
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta, alerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;
  const universitarioContext = useContext(UniversitarioContext);
  const { estudiante, busquedaUniversitario } = universitarioContext;
  const votanteContext = useContext(VotanteContext);
  const {
    votante,
    encargadoHabilitaVotante,
    ultimoVotante,
    autorizandoVotante,
    mensaje,
    limpiarMensaje,
  } = votanteContext;

  // DATOS DEL FORMULARIO
  const [dataForm, setdataForm] = useState({
    cuUniversitario: "",
  });

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

  const confirmar = () => {
    if (usuario) {
      if (usuario.cargo === "Encargado de Mesa") {
        const votante = {
          cu: estudiante.cu,
          descripcion: "",
          encargadoMesa: true,
          verificadorVotante: false,
        };
        encargadoHabilitaVotante(votante);
      } else if (usuario.cargo === "Verificador de Votante") {
        console.log("Verificador de Votante");
      }
    }
  };

  const rechazar = () => {
    if (usuario) {
      if (usuario.cargo === "Encargado de Mesa") {
        console.log("Encargado de mesa");
        // encargadoHabilitaVotante(estudiante);
      } else if (usuario.cargo === "Verificador de Votante") {
        console.log("Verificador de Votante");
      }
    }
  };

  return (
    <Fragment>
      <div className="container mt-3">
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
          />
        ) : null}

        {usuario ? (
          autorizandoVotante && usuario.cargo === "Verificador de Votante" ? (
            <Cards
              estudiante={autorizandoVotante}
              usuario={usuario}
              confirmar={confirmar}
              autorizandoVotante={autorizandoVotante}
              rechazar={rechazar}
            />
          ) : null
        ) : null}
      </div>
    </Fragment>
  );
};

export default EncargadoMesa;
