const frenteCtrl = {};
const frenteModel = require("../models/frenteModel");

const fs = require("fs");

frenteCtrl.getFrentes = async (req, res) => {
  const frente = await frenteModel.find();
  res.json(frente);
};

frenteCtrl.createFrente = async (req, res) => {
  // const fileName = `${req.file.path}.${req.file.mimetype.split("/")[1]}`;
  // fs.renameSync(req.file.path, fileName);

  const {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
    logoFrente,
  } = req.body;

  const newFrente = new frenteModel({
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
    logoFrente: "/images/" + req.file.filename,
  });
  await newFrente.save();
  res.send({ msg: "Frente Guardado" });
  // console.log(req.file.filename);
  // console.log(req.file);
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
