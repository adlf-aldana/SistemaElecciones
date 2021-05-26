import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../context/autenticacion/authContext'

const RutaAdmin = ({ component: Component }, ...props) => {
    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado, cargando, usuario } = authContext;

    useEffect(() => {
        usuarioAutenticado()
    }, [])
    return (
        usuario ?
            (
                <Route {...props} render={props => autenticado && !cargando && usuario.cargo === 'Encargado de Mesa' ? (
                    // console.log(autenticado + ' - ' + cargando + '-' + !usuario.cargo === 'Encargado de Mesa')
                    <Redirect to="/" />
                ) : (
                    // console.log(autenticado + ' - ' + cargando + '-' + !usuario.cargo === 'Encargado de Mesa')
                    <Component {...props} />
                )} />
            ) :
            (

                < Route {...props} render={props => !autenticado && !cargando ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )} />
            )
    );
}

export default RutaAdmin