const votanteCtrl = {};
const votanteModels = require("../models/votanteModels");

// OBTIENE A LOS VOTANTES
votanteCtrl.getVotantes = async (req, res) => {
  try {
    const votantes = await votanteModels.find();
    res.json(votantes);
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "No se tiene acceso a la base de datos" });
  }
};

// GUARDANDO NUEVO VOTANTE
votanteCtrl.createVotante = async (req, res) => {
  const { cu } = req.body;
  try {
    let votante = await votanteModels.findOne({ cu });
    if (votante) {
      return res.status(400).json({ msg: "El universitario ya votó" });
    }
    votante = new votanteModels(req.body);
    await votante.save();
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error" });
  }
};

// OBTIENE VOTANTE POR CU
votanteCtrl.getVotante = async (req, res) => {
  try {
    const votante = await votanteModels.findOne({ cu: req.params.id });
    res.json({ votante });
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error" });
  }
};

// ELIMINA A UN VOTANTE
votanteCtrl.deleteVotante = async (req, res) => {
  try {
    await votanteModels.findByIdAndDelete(req.params.id);
    res.json({ msg: "Votante Eliminado" });
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error" });
  }
};

// OBTIENE ULTIMO VOTANTE
votanteCtrl.getUltimoVotante = async (req, res) => {
  try {
    const votante = await votanteModels.find().sort({ $natural:-1 }).limit(1);
    res.json({ votante });
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error" });
  }
};

module.exports = votanteCtrl;
