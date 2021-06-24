// var votacion = artifacts.require("./votacion.sol");
var votacion = artifacts.require("../contracts/votacion.sol");

module.exports = function(deployer) {
  deployer.deploy(votacion);
};