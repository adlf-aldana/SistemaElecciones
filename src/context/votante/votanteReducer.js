import {
  ACTUALIZAR_VOTANTE,
  AUTORIZANDO_VOTANTE,
  ENCARGADO_HABILITA_VOTANTE,
  ERROR_VOTANTE,
  LIMPIAR_DESCRIPCION_RECHAZO,
  LIMPIAR_MENSAJE,
  LIMPIAR_DATOS,
  OBTENER_VOTANTES,
  BUSQUEDA_UNIVERSITARIO,
  LIMPIAR_UNIVERSITARIO_BUSCADO,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case ENCARGADO_HABILITA_VOTANTE:
      return {
        ...state,
        votante: action.payload,
      };
    case AUTORIZANDO_VOTANTE:
      return {
        ...state,
        autorizandoVotante: action.payload,
      };
    case ERROR_VOTANTE: {
      return {
        ...state,
        mensaje: action.payload,
      };
    }
    case LIMPIAR_MENSAJE: {
      return {
        ...state,
        mensaje: null,
      };
    }
    case LIMPIAR_DESCRIPCION_RECHAZO: {
      return {
        ...state,
        rechazandoVotante: { descripcion: "" },
      };
    }
    case ACTUALIZAR_VOTANTE:
      return {
        ...state,
        autorizandoVotante: action.payload,
        // autorizandoVotante: state.autorizandoVotante.map((votante) =>
        //   votante._id === action.payload._id ? action.payload : votante
        // ),
      };
    case LIMPIAR_DATOS:
      return {
        votante: null,
        autorizandoVotante: null,
        mensaje: null,
        votantes: null,
      };
    case OBTENER_VOTANTES:
      return {
        ...state,
        votantes: action.payload.votantes,
        cantVotosFrente: action.payload.cantPartido,
      };
    case BUSQUEDA_UNIVERSITARIO:
      return {
        ...state,
        estudiante: action.payload,
      };
    case LIMPIAR_UNIVERSITARIO_BUSCADO:
      return {
        ...state,
        estudiante: null,
      };
    default:
      return state;
  }
};
