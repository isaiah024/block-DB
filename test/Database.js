const QueryStatus= artifacts.require("Database");
const truffleAssert = require('truffle-assertions');

contract('Database', () => {

  it("should return the status Pending", async ()=> {
    // Instance of our deployed contract
    const instance = await QueryStatus.deployed();
    // Checking the initial status in our contract
    const status = await instance.Status();
    // Checking if the status is initially Pending as set in the constructor
    assert.equal(status, "Pending");
  });
it("should return the status Error", async ()=> {
    // Instance of our deployed contract
    const instance = await QueryStatus.deployed();

    // Calling the Performed() function
    await instance.queryDB();

    // Checking the initial status in our contract
    const status = await instance.Status();

    // Checking if the status is Error
    assert.equal(status, "Error");
  });

  it('should return the status Performed', async()=>{

    // Instance of our deployed contract
    const instance = await QueryStatus.deployed();

    // Calling the Performed() function
    await instance.queryDB();

    // Checking the initial status in our contract
    const status = await instance.Status();

    assert.equal(status, "Performed");
      
  });

});

