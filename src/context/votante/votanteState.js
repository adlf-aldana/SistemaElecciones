import React, { useReducer } from "react";
import usuarioAxios from "../../config/axios";
import axios from "axios";

import {
  ENCARGADO_HABILITA_VOTANTE,
  AUTORIZANDO_VOTANTE,
  ERROR_VOTANTE,
  LIMPIAR_MENSAJE,
  ACTUALIZAR_VOTANTE,
  LIMPIAR_DATOS,
  OBTENER_VOTANTES,
  BUSQUEDA_UNIVERSITARIO,
  LIMPIAR_UNIVERSITARIO_BUSCADO,
  DATOS_VOTANTE,
  LIMPIAR_VOTANTE,
} from "../../types";

import votanteContext from "./votanteContext";
import votanteReducer from "./votanteReducer";

const VotanteState = (props) => {
  const initialState = {
    votante: null,
    autorizandoVotante: null,
    mensaje: null,
    votantes: null,
    cantVotosFrente: null,
    estudiante: null,
    datosVotante: null,
  };

  const encargadoHabilitaVotante = async (votante) => {
    // await axios.post(`http://localhost:4000/api/votante/`, votante);
    try {
      const res = await usuarioAxios.post("/api/votante", votante);
      dispatch({
        type: ENCARGADO_HABILITA_VOTANTE,
        payload: votante,
      });

      return true;
    } catch (e) {
      let alerta = null;
      if (e.response !== undefined) {
        alerta = {
          msg: e.response.data.msg,
          categoria: "danger",
        };
      } else {
        alerta = {
          msg: "No se pudo conectar con el servidor",
          categoria: "danger",
        };
      }
      dispatch({
        type: ERROR_VOTANTE,
        payload: alerta,
      });
      return false;
    }
  };

  const ultimoVotante = async () => {
    try {
      const res = await usuarioAxios.get("/api/consultaVotante");
      const datosEstudiante = await usuarioAxios.get(
        "/api/lista_estudiantes/" + res.data.votante[0].cu
      );
      const datos = {
        _id: res.data.votante[0]._id,
        nombre: datosEstudiante.data.estudiante.nombre,
        apellidos: datosEstudiante.data.estudiante.apellidos,
        cu: datosEstudiante.data.estudiante.cu,
        ci: datosEstudiante.data.estudiante.ci,
        carrera: datosEstudiante.data.estudiante.carrera,
        encargadoMesa: res.data.votante[0].encargadoMesa,
        verificadorVotante: res.data.votante[0].verificadorVotante,
        estadoEncargadoMesa: res.data.votante[0].estadoEncargadoMesa,
        estadoVerificadorVotante: res.data.votante[0].estadoVerificadorVotante,
        descripcionProblemaEncargadoMesa:
          res.data.votante[0].descripcionProblemaEncargadoMesa,
        _idFrente: res.data.votante[0]._idFrente,
        numMesa: res.data.votante[0].numMesa,
      };

      dispatch({
        type: AUTORIZANDO_VOTANTE,
        payload: datos,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const limpiarMensaje = () => {
    try {
      dispatch({
        type: LIMPIAR_MENSAJE,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarVotante = async (id, votante) => {
    await axios.put(`http://localhost:4000/api/votante/${id}`, votante);
    try {
      await usuarioAxios.put(`/api/votante/${id}`, votante);
      dispatch({
        type: ACTUALIZAR_VOTANTE,
        payload: votante,
      });
      limpiarDatos();
      return true;
    } catch (e) {
      let alerta = null;
      if (e.response !== undefined) {
        alerta = {
          msg: e.response.data.msg,
          categoria: "danger",
        };
      } else {
        alerta = {
          msg: "No se pudo conectar con el servidor",
          categoria: "danger",
        };
      }
      dispatch({
        type: ERROR_VOTANTE,
        payload: alerta,
      });
      return false;
    }
  };

  const limpiarDatos = () => {
    dispatch({
      type: LIMPIAR_DATOS,
    });
  };

  const obtenerVotante = async (cu) => {
    try {
      const res = await usuarioAxios.get("/api/votante/" + cu);
      console.log(res);
      dispatch({
        type: DATOS_VOTANTE,
        payload: res.data.votante,
      });
    } catch (e) {
      limpiarVotante();
      console.log(e.response);
    }
  };

  const limpiarVotante = () => {
    dispatch({
      type: LIMPIAR_VOTANTE,
    });
  };

  const obtenerVotantes = async () => {
    try {
      const res = await usuarioAxios.get("/api/votante/");
      dispatch({
        type: OBTENER_VOTANTES,
        payload: res.data,
      });
      // );
      return res.data;
    } catch (e) {
      let alerta = null;
      if (e.response !== undefined) {
        alerta = {
          msg: e.response.data.msg,
          categoria: "danger",
        };
      } else {
        alerta = {
          msg: "No se pudo conectar con el servidor",
          categoria: "danger",
        };
      }
      dispatch({
        type: ERROR_VOTANTE,
        payload: alerta,
      });
      return false;
    }
  };

  const busquedaUniversitario = async (carnetUniversitario) => {
    try {
      const universitario = await usuarioAxios.get(
        "/api/lista_estudiantes/" + carnetUniversitario
      );
      dispatch({
        type: BUSQUEDA_UNIVERSITARIO,
        payload: universitario.data.estudiante,
      });
    } catch (e) {
      let alerta = null;
      if (e.response) {
        alerta = {
          msg: e.response.data.msg,
          categoria: "danger",
        };
      } else {
        alerta = {
          msg: "No se pudo conectar con el servidor",
          categoria: "danger",
        };
      }
      dispatch({
        type: ERROR_VOTANTE,
        payload: alerta,
      });
      return false;
    }
  };

  const limpiarUniversitarioBuscado = () => {
    dispatch({
      type: LIMPIAR_UNIVERSITARIO_BUSCADO,
    });
  };

  const [state, dispatch] = useReducer(votanteReducer, initialState);
  return (
    <votanteContext.Provider
      value={{
        votante: state.votante,
        autorizandoVotante: state.autorizandoVotante,
        mensaje: state.mensaje,
        votantes: state.votantes,
        cantVotosFrente: state.cantVotosFrente,
        estudiante: state.estudiante,
        datosVotante: state.datosVotante,
        encargadoHabilitaVotante,
        ultimoVotante,
        limpiarMensaje,
        actualizarVotante,
        obtenerVotantes,
        busquedaUniversitario,
        limpiarUniversitarioBuscado,
        obtenerVotante,
      }}
    >
      {props.children}
    </votanteContext.Provider>
  );
};

export default VotanteState;
