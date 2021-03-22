const frenteCtrl = {};
const frenteModel = require("../models/frenteModel");

frenteCtrl.getFrentes = async (req, res) => {
  const frente = await frenteModel.find();
  res.json(frente);
};

frenteCtrl.createFrente = async (req, res) => {
  const {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
  } = req.body;

  const newFrente = new frenteModel({
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
  });
  await newFrente.save();
  res.send({ msg: "Frente Guardado" });
};

frenteCtrl.getFrente = async (req, res) => {
  const frente = await frenteModel.findById(req.params.id);
  res.json({ msg: frente });
};

frenteCtrl.updateFrente = async (req, res) => {
  const {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
  } = req.body;
  await frenteModel.findByIdAndUpdate(req.params.id, {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
  });
  res.json({ msg: "Frente actualizado" });
};

frenteCtrl.deleteFrente = async (req, res) => {
  await frenteModel.findByIdAndDelete(req.params.id);
  res.json({ msg: "Frente Eliminado" });
};

module.exports = frenteCtrl;
