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
  OBTENER_DATOS_VOTANTE,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case OBTENER_UNIVERSITARIOS:
      return {
        ...state,
        estudiantes: action.payload.universitario,
        estudiantesSinAdmin: action.payload.universitariosSinAdmins,
      };
    case AGREGAR_UNIVERSITARIO:
      return {
        ...state,
        estudiantes: [...state.estudiantes, action.payload],
      };
    case ERROR_UNIVERSITARIO:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ELIMINAR_UNIVERSITARIO:
      return {
        ...state,
        estudiantes: state.estudiantes.filter(
          (estudiante) => estudiante._id !== action.payload
        ),
      };
    case EDITAR_UNIVERSITARIO:
      return {
        ...state,
        estudiantes: state.estudiantes.map((estudiante) =>
          estudiante._id === action.payload._id ? action.payload : estudiante
        ),
      };
    case BUSQUEDA_UNIVERSITARIO:
      return {
        ...state,
        estudiante: action.payload,
      };
    case LIMPIAR_FORMULARIO:
      return {
        ...state,
        datosFormulario: {
          nombre: "",
          apellidos: "",
          cu: "",
          ci: "",
          carrera: "",
          cargo: "",
        },
      };
    case LIMPIAR_MENSAJE:
      return {
        ...state,
        mensaje: null,
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
