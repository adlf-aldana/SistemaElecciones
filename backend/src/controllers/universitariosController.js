const univerCtrl = {};
const universitarioModel = require("../models/universitarioModels");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// OBTIENE A TODOS LOS UNIVERSITARIOS
univerCtrl.getUniversitarios = async (req, res) => {
  try {
    // consultando
    const universitario = await universitarioModel.find();
    const universitariosSinAdmins = await universitarioModel.find({
      cargo: { $gt: "Administrador" },
    });

    res.json({ universitario, universitariosSinAdmins });
  } catch (e) {
    return res
      .status(400)
      .json({ msg: "No se tiene acceso a la base de datos" });
  }
};

// GUARDA UN NUEVO UNIVERSTARIO
univerCtrl.createUniversitario = async (req, res) => {
  // Revisar si hay errorres
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    // return res.status(400).json({ errores: errores.data.array() })
    return res.status(400).json({ msg: errores.errors[0].msg });
  }
  // Extrayendo carnet universitario
  const { nombre, apellidos, cu, carrera, cargo, password } = req.body;
  try {
    // Revisar que el universitario sea unico
    let universitario = await universitarioModel.findOne({ cu });

    if (universitario) {
      return res.status(400).json({ msg: "El universitario ya existe" });
    }

    if (password === "") {
      // Crea universitario
      universitario = new universitarioModel({
        nombre,
        apellidos,
        cu,
        carrera,
        cargo,
      });
    } else {
      // hashear el password
      const salt = await bcryptjs.genSalt(10);
      req.body.password = await bcryptjs.hash(password, salt);
      // Crea universitario
      universitario = new universitarioModel(req.body);
    }
    // Guarda a Universitario
    await universitario.save();
    // // crear y firmar JWT
    const payload = {
      universitario: {
        id: universitario.id,
      },
    };
    // Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token });
      }
    );
    // Mensaje de confirmación
    res.json({ msg: "Universitario creado correctamente" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "Hubo un error" });
  }
};

// OBTIENE A UN UNIVERSITARIO POR ID
univerCtrl.getUniversitario = async (req, res) => {
  const universitario = await universitarioModel.findOne({ cu: req.params.id });
  res.json({ estudiante: universitario });
};

// ACTUALIZA UN UNIVERSITARIO POR ID
univerCtrl.updateUniversitario = async (req, res) => {
  const universitario = await universitarioModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.json({ universitario });
};

// ELIMINA A UN UNIVERSITARIO POR ID
univerCtrl.deleteUniversitario = async (req, res) => {
  await universitarioModel.findByIdAndDelete(req.params.id);
  res.json({ msg: "Universitario eliminado" });
};

module.exports = univerCtrl;
