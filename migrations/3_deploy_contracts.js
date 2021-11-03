const DatabaseRedesign = artifacts.require("DatabaseRedesign");

module.exports = function (deployer) {
  deployer.deploy(DatabaseRedesign);
};