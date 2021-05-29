import React, { useReducer } from "react";
import usuarioAxios from "../../config/axios";
import {
  ENCARGADO_HABILITA_VOTANTE,
  AUTORIZANDO_VOTANTE,
  ERROR_VOTANTE,
  LIMPIAR_MENSAJE,
  ACTUALIZAR_VOTANTE,
} from "../../types";

import votanteContext from "./votanteContext";
import votanteReducer from "./votanteReducer";

const VotanteState = (props) => {
  const initialState = {
    votante: null,
    autorizandoVotante: null,
    mensaje: null,
    votantes: null,
  };

  const encargadoHabilitaVotante = async (votante) => {
    try {
      const res = await usuarioAxios.post("/api/votante", votante);
      dispatch({
        type: ENCARGADO_HABILITA_VOTANTE,
        payload: votante,
      });
      return true;
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "danger",
      };
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
        carrera: datosEstudiante.data.estudiante.carrera,
        encargadoMesa: res.data.votante[0].encargadoMesa,
        verificadorVotante: res.data.votante[0].verificadorVotante,
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
    try {
      const res = await usuarioAxios.put(`/api/votante/${id}`, votante);
      console.log(res.data.votante);
      dispatch({
        type: ACTUALIZAR_VOTANTE,
        payload: res.data.votante,
      });
      return true;
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "danger",
      };
      dispatch({
        type: ERROR_VOTANTE,
        payload: alerta,
      });
      return false;
    }
  };

  const [state, dispatch] = useReducer(votanteReducer, initialState);
  return (
    <votanteContext.Provider
      value={{
        votante: state.votante,
        autorizandoVotante: state.autorizandoVotante,
        mensaje: state.mensaje,
        encargadoHabilitaVotante,
        ultimoVotante,
        limpiarMensaje,
        actualizarVotante,
      }}
    >
      {props.children}
    </votanteContext.Provider>
  );
};

export default VotanteState;
