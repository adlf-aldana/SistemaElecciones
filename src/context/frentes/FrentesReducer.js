import { AGREGAR_FRENTE, BUSQUEDA_UNIVERSITARIO, EDITAR_FRENTE, ELIMINAR_FRENTE, ERROR_FRENTE, LIMPIAR_FORMULARIO, LIMPIAR_MENSAJE, OBTENER_FRENTES } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case OBTENER_FRENTES:
            return {
                ...state,
                frentes: action.payload
            }
        case AGREGAR_FRENTE:
            return {
                ...state,
                frentes: [...state.frentes, action.payload]
            }
        case ELIMINAR_FRENTE:
            return {
                ...state,
                frentes: state.frentes.filter(frente => frente._id !== action.payload)
            }
        case EDITAR_FRENTE:
            return {
                ...state,
                frentes:
                    state.frentes.map(frente => frente._id === action.payload._id ? action.payload : frente)
            }
        case LIMPIAR_FORMULARIO: {
            return {
                ...state,
                datosFormulario: {
                    nombreFrente: "",
                    cuEncargado: "",
                    celularEncargado: "",
                    logoFrente: ""
                },
                estudiante: null,
            }
        }
        case ERROR_FRENTE:
            return {
                ...state,
                mensaje: action.payload
            }
        case BUSQUEDA_UNIVERSITARIO:
            return {
                ...state,
                estudiante: action.payload
            }
        case LIMPIAR_MENSAJE:
            return {
                ...state,
                mensaje: null
            }
        default: return state;
    }
}