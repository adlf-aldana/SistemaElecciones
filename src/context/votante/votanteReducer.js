import {
  AUTORIZANDO_VOTANTE,
  ENCARGADO_HABILITA_VOTANTE,
  ERROR_VOTANTE,
  LIMPIAR_MENSAJE,
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
    default:
      return state;
  }
};
