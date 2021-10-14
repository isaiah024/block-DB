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
it("should return the status Shipped", async ()=> {
    // Instance of our deployed contract
    const instance = await QueryStatus.deployed();

    // Calling the Shipped() function
    await instance.Performed();

    // Checking the initial status in our contract
    const status = await instance.Status();

    // Checking if the status is Shipped
    assert.equal(status, "Performed");
  });

  it('should return correct event description', async()=>{

    // Instance of our deployed contract
    const instance = await QueryStatus.deployed();

    // Calling the Performed() function
    const performed = await instance.Performed();

    // Check event description is correct
    truffleAssert.eventEmitted(performed, 'LogNewAlert', (event) =>{
      return event.description == 'Your query has been performed';
      
    });
  });

});
