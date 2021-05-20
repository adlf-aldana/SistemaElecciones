import React, { useReducer } from 'react';

import FrentesContext from './FrentesContext';
import FrentesReducer from './FrentesReducer';

import usuarioAxios from '../../config/axios';

import { AGREGAR_FRENTE, ELIMINAR_FRENTE, OBTENER_FRENTES, EDITAR_FRENTE, LIMPIAR_FORMULARIO, ERROR_FRENTE, BUSQUEDA_UNIVERSITARIO, LIMPIAR_MENSAJE } from '../../types';

const FrentesState = props => {

    const initialState = {
        frentes: [],
        datosFormulario: {
            nombreFrente: "",
            cuEncargado: "",
            celularEncargado: "",
            logoFrente: ""
        },
        mensaje: null,
        estudiante: null
    }
    const [state, dispatch] = useReducer(FrentesReducer, initialState)

    const obtenerFrentes = async () => {
        try {
            const res = await usuarioAxios.get('/api/frente_universitario')
            dispatch({
                type: OBTENER_FRENTES,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    const agregarFrente = async frente => {
        try {
            const regFrente = await usuarioAxios.post('/api/frente_universitario', frente)
            dispatch({
                type: AGREGAR_FRENTE,
                payload: regFrente
            })
            obtenerFrentes()
            limpiarFormulario()
        } catch (error) {
            let alerta = {
                msg: error.response.data.msg,
                categoria: 'danger'
            }
            dispatch({
                type: ERROR_FRENTE,
                payload: alerta
            })
        }
    }

    const eliminarFrente = async id => {
        try {
            await usuarioAxios.delete(`/api/frente_universitario/${id}`)
            dispatch({
                type: ELIMINAR_FRENTE,
                payload: id
            })
            obtenerFrentes()
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarFrente = async (id, frente) => {
        try {
            const res = await usuarioAxios.put(`/api/frente_universitario/${id}`, frente)
            dispatch({
                type: EDITAR_FRENTE,
                payload: res.data.frente
            })
            obtenerFrentes()
            limpiarFormulario()
        } catch (error) {
            console.log(error);
        }
    }

    const limpiarFormulario = () => {
        dispatch({
            type: LIMPIAR_FORMULARIO
        })
    }

    const busquedaUniversitario = async (carnetUniversitario) => {
        const universitario = await usuarioAxios.get(`/api/lista_estudiantes/` + carnetUniversitario)
        dispatch({
            type: BUSQUEDA_UNIVERSITARIO,
            payload: universitario.data.estudiante
        })
    }

    const limpiarMensaje = () => {
        dispatch({
            type: LIMPIAR_MENSAJE
        })
    }
    return (
        <FrentesContext.Provider
            value={{
                frentes: state.frentes,
                datosFormulario: state.datosFormulario,
                mensaje: state.mensaje,
                estudiante: state.estudiante,
                obtenerFrentes,
                agregarFrente,
                eliminarFrente,
                actualizarFrente,
                limpiarFormulario,
                busquedaUniversitario,
                limpiarMensaje
            }}
        >
            {props.children}
        </FrentesContext.Provider>
    )
}

export default FrentesState;