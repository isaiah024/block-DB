const dbObject = artifacts.require("DatabaseRedesign");
const truffleAssert = require('truffle-assertions');

contract('DatabaseRedesign', () => {

    it("Should log the msg.sender, user id, query, and status", async ()=>{

        const instance = await dbObject.deployed();

        await instance.setAllAndLog("1234567890", "INSERT", "Error");
        /*
        const id = await instance.id;
        const query = await instance.query;
        const status = await instance.status;

        assert.equal(id, "1234567890");
        assert.equal(query, "INSERT");
        assert.equal(status, "Error");

        await instance.logAllInfo();
        */
        
    });
});