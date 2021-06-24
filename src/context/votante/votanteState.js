import React, { useReducer } from "react";
import usuarioAxios from "../../config/axios";
import {
  ENCARGADO_HABILITA_VOTANTE,
  AUTORIZANDO_VOTANTE,
  ERROR_VOTANTE,
  LIMPIAR_MENSAJE,
  ACTUALIZAR_VOTANTE,
  LIMPIAR_DATOS,
  OBTENER_VOTANTES,
} from "../../types";

import votanteContext from "./votanteContext";
import votanteReducer from "./votanteReducer";

// import Web3 from 'web3'
// import TruffleContract from 'truffle-contract'
// import JSONvotacion from '../../../build/contracts/votacion.json'
// Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
// import web3Provider



const VotanteState = (props) => {
  const initialState = {
    votante: null,
    autorizandoVotante: null,
    mensaje: null,
    votantes: null,
    cantVotosFrente: null,
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
        estadoEncargadoMesa: res.data.votante[0].estadoEncargadoMesa,
        estadoVerificadorVotante: res.data.votante[0].estadoVerificadorVotante,
        descripcionProblemaEncargadoMesa:
          res.data.votante[0].descripcionProblemaEncargadoMesa,
        _idFrente: res.data.votante[0]._idFrente,
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
      await usuarioAxios.put(`/api/votante/${id}`, votante);
      dispatch({
        type: ACTUALIZAR_VOTANTE,
        payload: votante,
      });
      limpiarDatos();
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

  const limpiarDatos = () => {
    dispatch({
      type: LIMPIAR_DATOS,
    });
  };

  const obtenerVotante = async () => {
    await usuarioAxios.get("/api/votante/").then(res=>
      dispatch({
        type: OBTENER_VOTANTES,
        payload: res.data,
      })
    );

    // console.log('antes');
    // const res = await usuarioAxios.get("/api/votante/")
    // console.log(res);
    // dispatch({
    //   type: OBTENER_VOTANTES,
    //   payload: res.data,
    // });
    // console.log(state.votante);
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
        encargadoHabilitaVotante,
        ultimoVotante,
        limpiarMensaje,
        actualizarVotante,
        obtenerVotante,
      }}
    >
      {props.children}
    </votanteContext.Provider>
  );
};

export default VotanteState;
