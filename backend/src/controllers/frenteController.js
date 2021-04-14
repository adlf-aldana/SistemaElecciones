const frenteCtrl = {};
const frenteModel = require("../models/frenteModel");

const { unlink } = require("fs-extra");
const path = require("path");

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
    cantVotos
  } = req.body;

  const newFrente = new frenteModel({
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
    logoFrente: "/images/" + req.file.filename,
    cantVotos: 0,
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

  if (req.file) {
    // ELIMINANDO IMAGEN PASADA
    const { logoFrente } = await frenteModel.findById(req.params.id);
    await unlink(path.resolve("./public/" + logoFrente));
  }
  
  const {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
    logoFrente,
    cantVotos
  } = req.body;

  // const img = req.body.logoFrente;
  // if (req.file) await unlink(path.resolve("./public/" + img));

  await frenteModel.findByIdAndUpdate(req.params.id, {
    nombreFrente,
    nombreEncargado,
    apellidosEncargado,
    cuEncargado,
    celularEncargado,
    logoFrente: req.file ? "/images/" + req.file.filename : logoFrente,
    cantVotos
  });
  
  res.json({ msg: "Frente actualizado" });
};

frenteCtrl.deleteFrente = async (req, res) => {
  const image = await frenteModel.findByIdAndDelete(req.params.id);
  await unlink(path.resolve("./public/" + image.logoFrente));
  res.json({ msg: "Frente Eliminado" });
};

module.exports = frenteCtrl;
