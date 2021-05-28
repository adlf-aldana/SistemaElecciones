import React, { useReducer } from 'react';

import UniversitarioContext from './UniversitarioContext';
import UniversitarioReducer from './UniversitarioReducer'

import {
    OBTENER_UNIVERSITARIOS,
    AGREGAR_UNIVERSITARIO,
    ERROR_UNIVERSITARIO,
    ELIMINAR_UNIVERSITARIO,
    EDITAR_UNIVERSITARIO,
    BUSQUEDA_UNIVERSITARIO,
    LIMPIAR_FORMULARIO,
    LIMPIAR_MENSAJE,
    LIMPIAR_UNIVERSITARIO_BUSCADO
} from '../../types/';

import usuarioAxios from '../../config/axios'

const UniversitarioState = props => {

    const initialState = {
        estudiantes: [],
        estudiante: null,
        mensaje: null,
        datosFormulario: {
            nombre: "",
            apellidos: "",
            cu: "",
            carrera: "",
            cargo: "",
            password: "",
            confirPassword: ""
        }
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(UniversitarioReducer, initialState)

    // Obtener los Universitarios
    const obtenerUniversitarios = async () => {
        try {
            const res = await usuarioAxios.get('/api/lista_estudiantes')
            dispatch({
                type: OBTENER_UNIVERSITARIOS,
                payload: res.data
            })
        } catch (e) {
            let alerta = null;
            if (e.response !== undefined) {
                alerta = {
                    msg: e.response.data.msg,
                    categoria: 'danger'
                }
            }
            else {
                alerta = {
                    msg: 'No se pudo conectar con el servidor',
                    categoria: 'danger'

                }
            }
            dispatch({
                type: ERROR_UNIVERSITARIO,
                payload: alerta
            })
        }
    }

    // Agregar Universitario
    const agregarUniversitario = async univertario => {
        try {
            const regUniversitario = await usuarioAxios.post('/api/lista_estudiantes', univertario)
            dispatch({
                type: AGREGAR_UNIVERSITARIO,
                payload: regUniversitario
            })
            obtenerUniversitarios()
            limpiarFormulario()
        } catch (error) {
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'danger'
            }
            dispatch({
                type: ERROR_UNIVERSITARIO,
                payload: alerta
            })
        }
    }

    // Eliminar Universitario
    const eliminarUniversitario = async id => {
        try {
            await usuarioAxios.delete(`/api/lista_estudiantes/${id}`)
            dispatch({
                type: ELIMINAR_UNIVERSITARIO,
                payload: id
            })
            obtenerUniversitarios()
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarUniversitario = async (id, universitario) => {
        try {
            const data = await usuarioAxios.put(`/api/lista_estudiantes/${id}`, universitario)
            dispatch({
                type: EDITAR_UNIVERSITARIO,
                payload: data.data.universitario
            })
            obtenerUniversitarios()
            limpiarFormulario()
        } catch (error) {
            console.log(error);
        }
    }

    const busquedaUniversitario = async (carnetUniversitario) => {
        const universitario = await usuarioAxios.get('/api/lista_estudiantes/' + carnetUniversitario)
        dispatch({
            type: BUSQUEDA_UNIVERSITARIO,
            payload: universitario.data.estudiante
        })
    }

    const limpiarFormulario = () => {
        dispatch({
            type: LIMPIAR_FORMULARIO
        })
    }

    const limpiarMensaje = () => {
        dispatch({
            type: LIMPIAR_MENSAJE
        })
    }

    const limpiarUniversitarioBuscado = () => {
        dispatch({
            type: LIMPIAR_UNIVERSITARIO_BUSCADO
        })
    }

    return (
        <UniversitarioContext.Provider
            value={{
                estudiantes: state.estudiantes,
                mensaje: state.mensaje,
                estudiante: state.estudiante,
                datosFormulario: state.datosFormulario,
                obtenerUniversitarios,
                agregarUniversitario,
                eliminarUniversitario,
                actualizarUniversitario,
                busquedaUniversitario,
                limpiarFormulario,
                limpiarMensaje,
                limpiarUniversitarioBuscado
            }}
        >
            {props.children}
        </UniversitarioContext.Provider>
    )
}

export default UniversitarioState;