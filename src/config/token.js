import usuarioAxios from './axios';

const tokenAuth = token => {
    if (token) {
        usuarioAxios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete usuarioAxios.defaults.headers.common['x-auth-token']

    }
}

export default tokenAuth;