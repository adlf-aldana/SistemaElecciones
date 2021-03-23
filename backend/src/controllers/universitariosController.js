const univerCtrl = {};
const universitarioModel = require("../models/universitarioModels");

// OBTIENE A TODOS LOS UNIVERSITARIOS
univerCtrl.getUniversitarios = async (req, res) => {
  // consultando
  const universitario = await universitarioModel.find();
  // console.log(universitario);
  res.json(universitario);
};

// GUARDA UN NUEVO UNIVERSTARIO
univerCtrl.createUniversitario = async (req, res) => {
  const { nombre, apellidos, cu, carrera, cargo } = req.body;
  const newUniversitario = new universitarioModel({
    nombre,
    apellidos,
    cu,
    carrera,
    cargo,
  });
  // console.log(newUniversitario);
  await newUniversitario.save();
  res.send({ msg: "universitario Guardado" });
};

// OBTIENE A UN UNIVERSITARIO POR ID
univerCtrl.getUniversitario = async (req, res) => {
  const universitario = await universitarioModel.findById(req.params.id);
  res.json({ msg: universitario });
};

// ACTUALIZA UN UNIVERSITARIO POR ID
univerCtrl.updateUniversitario = async (req, res) => {
  const { nombre, apellidos, cu, carrera, cargo } = req.body;
  await universitarioModel.findByIdAndUpdate(req.params.id, {
    nombre,
    apellidos,
    cu,
    carrera,
    cargo,
  });
  res.json({ msg: "Universitario actualizado" });
};

// ELIMINA A UN UNIVERSITARIO POR ID
univerCtrl.deleteUniversitario = async (req, res) => {
  await universitarioModel.findByIdAndDelete(req.params.id);
  res.json({ msg: "Universitario eliminado" });
};

module.exports = univerCtrl;
