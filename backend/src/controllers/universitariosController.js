const univerCtrl = {};

univerCtrl.getUniversitarios = (req, res) =>
  res.send("Datos de Universitarios");

univerCtrl.createUniversitario = (req, res) =>
  res.send("Creando universitario");

univerCtrl.getUniversitario = (req, res) =>
  res.send("Datos de un universitario");

univerCtrl.updateUniversitario = (req, res) =>
  res.send("Actualizando Universitario");

univerCtrl.deleteUniversitario = (req, res) =>
  res.send("Eliminando Universitario");

module.exports = univerCtrl;
