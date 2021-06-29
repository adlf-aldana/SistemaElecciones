import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import {
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from "../../types";
import authContext from "./authContext";
import usuarioAxios from "../../config/axios";
import tokenAuth from "../../config/token";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const res = await usuarioAxios.get("/api/auth");
      dispatch({
        type: OBTENER_USUARIO,
        payload: res.data.user,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const iniciarSesion = async (datos) => {
    try {
      const res = await usuarioAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: res.data.token,
      });
      // Obtener Usuario
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        const alerta = {
          msg: error.response.data.msg,
          categoria: "danger",
        };
        dispatch({
          type: LOGIN_ERROR,
          payload: alerta,
        });
      } else {
        const alerta = {
          msg: "Error: Asegurese que el servidor se este ejecutando",
          categoria: "danger",
        };
        dispatch({
          type: LOGIN_ERROR,
          payload: alerta,
        });
      }
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
