import React, { useReducer } from "react";
import usuarioAxios from "../../config/axios";
import {
  ENCARGADO_HABILITA_VOTANTE,
  AUTORIZANDO_VOTANTE,
  ERROR_VOTANTE,
  LIMPIAR_MENSAJE,
  LIMPIAR_DESCRIPCION_RECHAZO,
} from "../../types";

import votanteContext from "./votanteContext";
import votanteReducer from "./votanteReducer";

const VotanteState = (props) => {
  const initialState = {
    votante: null,
    autorizandoVotante: null,
    mensaje: null,
    // rechazandoVotante: { descripcion: "" },
  };

  const encargadoHabilitaVotante = async (votante) => {
    try {
      const res = await usuarioAxios.post("/api/votante", votante);
      dispatch({
        type: ENCARGADO_HABILITA_VOTANTE,
        payload: votante,
      });
      return true;
      // console.log('encargado');
      // limpiarDescripcionRechazo();
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
      console.log(datosEstudiante);
      dispatch({
        type: AUTORIZANDO_VOTANTE,
        payload: datosEstudiante.data.estudiante,
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

  // const limpiarDescripcionRechazo = () => {
  //   try {
  //     dispatch({
  //       type: LIMPIAR_DESCRIPCION_RECHAZO,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [state, dispatch] = useReducer(votanteReducer, initialState);
  return (
    <votanteContext.Provider
      value={{
        votante: state.votante,
        autorizandoVotante: state.autorizandoVotante,
        mensaje: state.mensaje,
        // rechazandoVotante: state.rechazandoVotante,
        encargadoHabilitaVotante,
        ultimoVotante,
        limpiarMensaje,
        // limpiarDescripcionRechazo
      }}
    >
      {props.children}
    </votanteContext.Provider>
  );
};

export default VotanteState;
