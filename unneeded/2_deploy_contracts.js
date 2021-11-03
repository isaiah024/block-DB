const Database = artifacts.require("Database");
var arg = "Query being performed";

module.exports = function (deployer) {
  deployer.deploy(Database, arg);
};