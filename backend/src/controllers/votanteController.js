const votanteCtrl = {};
const votanteModels = require("../models/votanteModels");

// OBTIENE A LOS VOTANTES
votanteCtrl.getVotantes = async (req, res) => {
  try {
    const votantes = await votanteModels.find();
    // console.log(votantes);

    const cantPartido = await votanteModels.aggregate([
      { $group: { _id: "$_idFrente", total: { $sum: 1 } } },
    ]);
    res.json({ votantes, cantPartido });
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
      if (votante.encargadoMesa && votante.verificadorVotante) {
        return res.status(400).json({ msg: "Error: El universitario ya votó" });
      } else if (
        votante.encargadoMesa &&
        votante.verificadorVotante === false
      ) {
        return res.status(400).json({
          msg: "En espera: Falta la habilitación del verificador de votante",
        });
      }
    }

    const verificarUltimoVotante = await votanteModels
      .find()
      .sort({ $natural: -1 })
      .limit(1);
    if (
      verificarUltimoVotante[0] &&
      !verificarUltimoVotante[0].verificadorVotante
    ) {
      return res.status(400).json({
        msg: "Espere, Por favor... Verificador aún no confirmo al último votante",
      });
    }
    votante = new votanteModels(req.body);
    await votante.save();
    res.send({ msg: "Votante Guardado" });
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error al crear un nuevo votante" });
  }
};

// OBTIENE VOTANTE POR CU
votanteCtrl.getVotante = async (req, res) => {
  try {
    const votante = await votanteModels.findOne({ cu: req.params.id });
    res.json({ votante });
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error al obtener a un vontante" });
  }
};

// ELIMINA A UN VOTANTE
votanteCtrl.deleteVotante = async (req, res) => {
  try {
    await votanteModels.findByIdAndDelete(req.params.id);
    res.json({ msg: "Votante Eliminado" });
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error al eliminar a votante" });
  }
};

// OBTIENE ULTIMO VOTANTE
votanteCtrl.getUltimoVotante = async (req, res) => {
  try {
    const votante = await votanteModels.find().sort({ $natural: -1 }).limit(1);
    res.json({ votante });
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error al obtener el ultimo votante" });
  }
};

votanteCtrl.updateVotante = async (req, res) => {
  try {
    const votante = await votanteModels.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.json(votante);
  } catch (error) {
    res.status(400).json({ msg: "Hubo un error al Actualizar" });
  }
};

module.exports = votanteCtrl;
