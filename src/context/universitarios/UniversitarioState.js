import React, { useReducer } from "react";

import UniversitarioContext from "./UniversitarioContext";
import UniversitarioReducer from "./UniversitarioReducer";

import * as crypto from "crypto-js";

import axios from "axios";

import {
  OBTENER_UNIVERSITARIOS,
  AGREGAR_UNIVERSITARIO,
  ERROR_UNIVERSITARIO,
  ELIMINAR_UNIVERSITARIO,
  EDITAR_UNIVERSITARIO,
  BUSQUEDA_UNIVERSITARIO,
  LIMPIAR_FORMULARIO,
  LIMPIAR_MENSAJE,
  LIMPIAR_UNIVERSITARIO_BUSCADO,
  OBTENER_ESTUDIANTE_REGISTRO,
} from "../../types/";

import usuarioAxios from "../../config/axios";

const UniversitarioState = (props) => {
  const palabraClave = "palabraClave";
  const initialState = {
    estudiantes: [],
    estudiantesSinAdmin: [],
    estudiante: null,
    mensaje: null,
    datosFormulario: {
      nombre: "",
      apellidos: "",
      cu: "",
      ci: "",
      email: "",
      carrera: "",
      cargo: "",
      password: "",
      confirPassword: "",
    },
    datosVotantes: [],
    estudiantesPorRegistro: [],
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(UniversitarioReducer, initialState);

  // Obtener los Universitarios
  const obtenerUniversitarios = async (ultimoProcesoElectoral) => {
    try {
      const res = await usuarioAxios.get("/api/lista_estudiantes");
      dispatch({
        type: OBTENER_UNIVERSITARIOS,
        payload: res.data,
      });

      const reg = ultimoProcesoElectoral[0]
        ? ultimoProcesoElectoral[0].registro
        : ultimoProcesoElectoral._id;
      const registro = await usuarioAxios.get("/api/lista_estudiantes/" + reg);
      dispatch({
        type: OBTENER_ESTUDIANTE_REGISTRO,
        payload: registro.data.registroUniversitario,
      });

      return registro;
    } catch (e) {
      let alerta = null;
      if (e.response !== undefined) {
        alerta = {
          msg: e.response.data.msg,
          categoria: "danger",
        };
      }
      dispatch({
        type: ERROR_UNIVERSITARIO,
        payload: alerta,
      });
    }
  };

  // Agregar Universitario
  const agregarUniversitario = async (univertario, registro) => {
    try {
      const encryptData = {
        nombre: crypto.AES.encrypt(univertario.nombre, palabraClave).toString(),
        apellidos: crypto.AES.encrypt(
          univertario.apellidos,
          palabraClave
        ).toString(),
        cu: crypto.AES.encrypt(univertario.cu, palabraClave).toString(),
        ci: crypto.AES.encrypt(univertario.ci, palabraClave).toString(),
        carrera: crypto.AES.encrypt(
          univertario.carrera,
          palabraClave
        ).toString(),
        cargo: crypto.AES.encrypt(univertario.cargo, palabraClave).toString(),
        registro: registro ? registro : null,
        email: univertario.email,
        // password: univertario.password,
        password: univertario.password ? univertario.password : univertario.ci,
      };
      const regUniversitario = await usuarioAxios.post(
        "/api/lista_estudiantes",
        encryptData
      );
      await axios.post(
        "http://localhost:4000/api/frente_universitario",
        encryptData
      );

      dispatch({
        type: AGREGAR_UNIVERSITARIO,
        payload: regUniversitario,
      });
      obtenerUniversitarios();
      limpiarFormulario();
    } catch (e) {
      let alerta = null;
      if (e.response !== undefined) {
        alerta = {
          msg: e.response.data.msg,
          categoria: "danger",
        };
      }
      // else {
      //   alerta = {
      //     msg: "No se pudo conectar con el servidor",
      //     categoria: "danger",
      //   };
      // }
      dispatch({
        type: ERROR_UNIVERSITARIO,
        payload: alerta,
      });
    }
  };

  // Eliminar Universitario
  const eliminarUniversitario = async (id) => {
    try {
      await usuarioAxios.delete(`/api/lista_estudiantes/${id}`);

      await axios.delete(`http://localhost:4000/api/lista_estudiante/${id}`);

      dispatch({
        type: ELIMINAR_UNIVERSITARIO,
        payload: id,
      });
      obtenerUniversitarios();
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarUniversitario = async (id, universitario) => {
    try {
      const encryptData = {
        nombre: crypto.AES.encrypt(
          universitario.nombre,
          palabraClave
        ).toString(),
        apellidos: crypto.AES.encrypt(
          universitario.apellidos,
          palabraClave
        ).toString(),
        cu: crypto.AES.encrypt(universitario.cu, palabraClave).toString(),
        ci: crypto.AES.encrypt(universitario.ci, palabraClave).toString(),
        carrera: crypto.AES.encrypt(
          universitario.carrera,
          palabraClave
        ).toString(),
        cargo: crypto.AES.encrypt(universitario.cargo, palabraClave).toString(),
        password: universitario.password ? universitario.password : null,
        email: universitario.email,
      };
      const data = await usuarioAxios.put(
        `/api/lista_estudiantes/${id}`,
        encryptData
      );

      await axios.put(
        `http://localhost:4000/api/lista_estudiante/${id}`,
        encryptData
      );

      dispatch({
        type: EDITAR_UNIVERSITARIO,
        payload: data.data.universitario,
      });
      obtenerUniversitarios();
      limpiarFormulario();
    } catch (error) {
      console.log(error);
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
        type: ERROR_UNIVERSITARIO,
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

  const limpiarMensaje = () => {
    dispatch({
      type: LIMPIAR_MENSAJE,
    });
  };

  const limpiarUniversitarioBuscado = () => {
    dispatch({
      type: LIMPIAR_UNIVERSITARIO_BUSCADO,
    });
  };

  const obteniendoDatosVotante = async (votante) => {
    let resDataVotante;
    if (votante.cu) {
      resDataVotante = await usuarioAxios.get(
        "/api/lista_estudiantes/" + votante.cu
      );
    } else {
      resDataVotante = await usuarioAxios.get(
        "/api/lista_estudiantes/" +
          crypto.AES.decrypt(votante.cuEncargado, "palabraClave").toString(
            crypto.enc.Utf8
          )
      );
    }
    let resDataFrente;
    votante.nombreFrente
      ? (resDataFrente = {
          data: {
            msg: {
              nombreFrente: votante.nombreFrente,
              cargoFrente: votante.cargo,
            },
          },
        })
      : votante._idFrente
      ? (resDataFrente = { data: { msg: { nombreFrente: "Votó" } } })
      : (resDataFrente = { data: { msg: { nombreFrente: null } } });
    // : votante._idFrente !== null
    // ? (resDataFrente = await usuarioAxios.get(
    //     "/api/frente_universitario/" + votante._idFrente
    //   ))
    // : (resDataFrente = { data: { msg: { nombreFrente: "No votó" } } });

    const dataVotante = {
      ...votante,
      ...resDataVotante.data.estudiante,
      ...resDataFrente.data.msg,
    };
    return dataVotante;
  };
  return (
    <UniversitarioContext.Provider
      value={{
        estudiantes: state.estudiantes,
        mensaje: state.mensaje,
        estudiante: state.estudiante,
        datosFormulario: state.datosFormulario,
        datosVotantes: state.datosVotantes,
        estudiantesSinAdmin: state.estudiantesSinAdmin,
        estudiantesPorRegistro: state.estudiantesPorRegistro,
        obtenerUniversitarios,
        agregarUniversitario,
        eliminarUniversitario,
        actualizarUniversitario,
        busquedaUniversitario,
        limpiarFormulario,
        limpiarMensaje,
        limpiarUniversitarioBuscado,
        obteniendoDatosVotante,
      }}
    >
      {props.children}
    </UniversitarioContext.Provider>
  );
};

export default UniversitarioState;
