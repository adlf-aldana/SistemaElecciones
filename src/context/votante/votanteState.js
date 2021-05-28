import React, { useReducer } from "react";
import usuarioAxios from "../../config/axios";
import { ENCARGADO_HABILITA_VOTANTE, AUTORIZANDO_VOTANTE } from "../../types";

import votanteContext from "./votanteContext";
import votanteReducer from "./votanteReducer";

const VotanteState = (props) => {
  const initialState = {
    votante: null,
    autorizandoVotante: null
  };

  const encargadoHabilitaVotante = async (votante) => {
    try {
      const res = await usuarioAxios.post("/api/votante", votante);
      dispatch({
        type: ENCARGADO_HABILITA_VOTANTE,
        payload: votante,
      });
    } catch (error) {
      console.log(error.response);
      // const alerta = {
      //   msg: error.response.data.msg,
      //   categoria: "danger",
      // };
      // dispatch({
      //   type: ERROR_UNIVERSITARIO,
      //   payload: alerta,
      // });
    }
  };

  const ultimoVotante = async () => {
    try {
      const res = await usuarioAxios.get('/api/consultaVotante')
      dispatch({
        type: AUTORIZANDO_VOTANTE,
        payload: res.data.votante[0]
      })
    } catch (error) {
      console.log(error.response);
    }
  }

  const [state, dispatch] = useReducer(votanteReducer, initialState);
  return (
    <votanteContext.Provider
      value={{
        votante: state.votante,
        autorizandoVotante: state.autorizandoVotante,
        encargadoHabilitaVotante,
        ultimoVotante
      }}
    >
      {props.children}
    </votanteContext.Provider>
  );
};

export default VotanteState;
