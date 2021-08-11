import React, { useReducer } from "react";

import FrentesContext from "./FrentesContext";
import FrentesReducer from "./FrentesReducer";

import usuarioAxios from "../../config/axios";
import axios from "axios";

import {
  AGREGAR_FRENTE,
  ELIMINAR_FRENTE,
  OBTENER_FRENTES,
  LIMPIAR_FORMULARIO,
  ERROR_FRENTE,
  BUSQUEDA_UNIVERSITARIO,
  LIMPIAR_MENSAJE,
  OBTENER_FRENTE_REGISTRO,
} from "../../types";

const FrentesState = (props) => {
  const initialState = {
    frentes: [],
    nombreLogoUnico: [],
    datosFormulario: {
      nombreFrente: "",
      cuEncargado: "",
      celularEncargado: "",
      logoFrente: "",
      cargo: "",
    },
    mensaje: null,
    estudiante: null,
    frentesPorRegistro: [],
  };
  const [state, dispatch] = useReducer(FrentesReducer, initialState);

  const obtenerFrentes = async (ultimoProcesoElectoral) => {
    try {
      const reg = ultimoProcesoElectoral[0]
        ? ultimoProcesoElectoral[0].registro
        : ultimoProcesoElectoral._id;
      const registro = await usuarioAxios.get(
        "/api/frente_universitario/" + reg
      );
      dispatch({
        type: OBTENER_FRENTES,
        payload: registro.data,
      });
      dispatch({
        type: OBTENER_FRENTE_REGISTRO,
        payload: registro.data.registroFrentes,
      });

      return registro;
    } catch (error) {
      console.log(error);
    }
  };

  const agregarFrente = async (frente) => {
    try {
      const regFrente = await usuarioAxios.post(
        "/api/frente_universitario",
        frente
      );
      await axios.post(
        "http://localhost:4000/api/frente_universitario",
        frente
      );

      dispatch({
        type: AGREGAR_FRENTE,
        payload: regFrente.data,
      });
      obtenerFrentes();
      limpiarFormulario();
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
        type: ERROR_FRENTE,
        payload: alerta,
      });
    }
  };

  const eliminarFrente = async (id) => {
    try {
      await usuarioAxios.delete(`/api/frente_universitario/${id}`);
      await axios.delete(
        `http://localhost:4000/api/frente_universitario/${id}`
      );

      dispatch({
        type: ELIMINAR_FRENTE,
        payload: id,
      });
      obtenerFrentes();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarFrente = async (id, frente) => {
    try {
      const res = await usuarioAxios.put(
        `/api/frente_universitario/${id}`,
        frente
      );
      await axios.put(
        `http://localhost:4000/api/frente_universitario/${id}`,
        frente
      );

      // dispatch({
      //   type: EDITAR_FRENTE,
      //   payload: res.data.frente,
      // });
      obtenerFrentes();
      limpiarFormulario();
    } catch (e) {
      console.log(e.response);
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
        type: ERROR_FRENTE,
        payload: alerta,
      });
      return false;
    }
  };

  const limpiarFormulario = () => {
    dispatch({
      type: LIMPIAR_FORMULARIO,
    });
  };

  const busquedaUniversitario = async (carnetUniversitario) => {
    const universitario = await usuarioAxios.get(
      `/api/lista_estudiantes/` + carnetUniversitario
    );
    dispatch({
      type: BUSQUEDA_UNIVERSITARIO,
      payload: universitario.data.estudiante,
    });
  };

  const limpiarMensaje = () => {
    dispatch({
      type: LIMPIAR_MENSAJE,
    });
  };
  return (
    <FrentesContext.Provider
      value={{
        frentes: state.frentes,
        datosFormulario: state.datosFormulario,
        mensaje: state.mensaje,
        estudiante: state.estudiante,
        cargo: state.cargo,
        nombreLogoUnico: state.nombreLogoUnico,
        frentesPorRegistro: state.frentesPorRegistro,
        obtenerFrentes,
        agregarFrente,
        eliminarFrente,
        actualizarFrente,
        limpiarFormulario,
        busquedaUniversitario,
        limpiarMensaje,
      }}
    >
      {props.children}
    </FrentesContext.Provider>
  );
};

export default FrentesState;
