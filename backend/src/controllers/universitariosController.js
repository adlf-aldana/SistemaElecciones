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
  const { nombre, apellidos } = req.body;
  const newUniversitario = new universitarioModel({
    nombre,
    apellidos,
  });
  // console.log(newUniversitario);
  await newUniversitario.save();
  res.send({ msg: "universitario Guardado" });
};

// OBTIENE A UN UNIVERSITARIO POR ID
univerCtrl.getUniversitario = (req, res) =>
  res.send("Datos de un universitario");

// ACTUALIZA UN UNIVERSITARIO POR ID
univerCtrl.updateUniversitario = (req, res) =>
  res.send("Actualizando Universitario");

// ELIMINA A UN UNIVERSITARIO POR ID
univerCtrl.deleteUniversitario = (req, res) =>
  res.send("Eliminando Universitario");

module.exports = univerCtrl;
