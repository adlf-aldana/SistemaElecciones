const frenteCtrl = {};
const frenteModel = require("../models/frenteModel");
const universitarioModel = require("../models/universitarioModels");

const { unlink } = require("fs-extra");
const path = require("path");

frenteCtrl.getFrentes = async (req, res) => {
  const frente = await frenteModel.find();
  res.json(frente);
};

frenteCtrl.createFrente = async (req, res) => {
  const {
    nombreFrente,
    cuEncargado,
    celularEncargado,
    logoFrente,
    cantVotos
  } = req.body;
  try {
    let cu = parseInt(cuEncargado)
    let universitario = await universitarioModel.findOne({ cu })
    if (!universitario) {
      await unlink(path.resolve("./public/images/" + req.file.filename));
      return res.status(400).json({ msg: 'Error: Universitario no existe' })
    }
    let encargado = await frenteModel.findOne({ cuEncargado })
    if (encargado) {
      await unlink(path.resolve("./public/images/" + req.file.filename));
      return res.status(400).json({ msg: 'Error: Ya existe un encargado con ese CU' })
    }
    const newFrente = new frenteModel({
      nombreFrente,
      cuEncargado,
      celularEncargado,
      logoFrente: "/images/" + req.file.filename,
      cantVotos: 0,
    });
    await newFrente.save();
    res.send({ msg: "Frente Guardado" });
  } catch (error) {
    console.log(error);
  }
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
    cuEncargado,
    celularEncargado,
    logoFrente,
    cantVotos
  } = req.body;
  // const img = req.body.logoFrente;
  // if (req.file) await unlink(path.resolve("./public/" + img));
  const frente = await frenteModel.findByIdAndUpdate(req.params.id, {
    nombreFrente,
    cuEncargado,
    celularEncargado,
    logoFrente: req.file ? "/images/" + req.file.filename : logoFrente,
    cantVotos
  });
  res.json({ frente });
};

frenteCtrl.deleteFrente = async (req, res) => {
  const image = await frenteModel.findByIdAndDelete(req.params.id);
  await unlink(path.resolve("./public/" + image.logoFrente));
  res.json({ msg: "Frente Eliminado" });
};

module.exports = frenteCtrl;
