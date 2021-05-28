import { AUTORIZANDO_VOTANTE, ENCARGADO_HABILITA_VOTANTE } from "../../types";

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
    default:
      return state;
  }
};
