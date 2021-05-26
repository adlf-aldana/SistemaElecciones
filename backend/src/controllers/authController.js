const authCtrl = {}
const Universitarios = require('../models/universitarioModels')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

authCtrl.autenticarUsuario = async (req, res) => {
    const { cu, password } = req.body
    try {
        let universitario = await Universitarios.findOne({ cu })
        if (!universitario) {
            return res.status(400).json({ msg: 'El Universitario no existe' })
        }
        const passCorrecto = await bcryptjs.compare(password, universitario.password)
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Password Incorrecto' })
        }
        const payload = {
            usuario: {
                id: universitario.id
            }
        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token })
        })
    } catch (error) {
        console.log(error);
    }
}

// Obtiene que usuario esta autenticado
authCtrl.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Universitarios.findById(req.universitario.id).select('-password')
        res.json({ usuario })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }
}

module.exports = authCtrl;