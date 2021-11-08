// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.9;

contract Database
{
    address private id; //User credentials
    string private query; //Users query

    enum QueryStatus { Pending, Performed, Error } // Our predefined values for a query status as enums

    QueryStatus private status; // Save enum QueryStatus in variable status

    event LogNewQuery(string _query, address _id, QueryStatus status); // Event to launch when query has been performmed

    // This initializes our contract state (sets enum status to Pending once the program starts)
    constructor(string memory _query) public{
        query = _query;
        id = msg.sender;
        status = QueryStatus.Pending;
    }

    // Executes the query through performQuery
    function queryDB() public {
        // Call to database
        string memory result = performQuery();
        
        // Check the result of the query
        checkQueryResult(result);
    }

    // Sends query to DB if query does not succeed then must set status to error
    // If query completes must set status to performed
    function performQuery() internal pure returns (string memory queryResult){
        return "Performed";
    }

    // Depending on DB result emit certain status
    function checkQueryResult(string memory _result) internal {
        if (hashCompareWithLengthCheck(_result, "Error")) {
            setStatusError();
            logQuery();
        }
        else {
            setStatusPerformed();
            logQuery();
        }
    }

    // Will call emit to log the query
    function logQuery() internal {
        emit LogNewQuery(query, id, status);
    }

    function hashCompareWithLengthCheck(string memory a, string memory b) internal returns (bool) {
    if(bytes(a).length != bytes(b).length) {
        return false;
    } else {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}

    // Function to get the status of the query
    function getStatus(QueryStatus _status) internal pure returns (string memory) {
        // Check the current status and return the correct name
        if (QueryStatus.Pending == _status) return "Pending";
        if (QueryStatus.Performed == _status) return "Performed";
        if (QueryStatus.Error == _status) return "Error";
    }

   // Get status of your query
    function Status() public view returns (string memory) {
        QueryStatus _status = status;
        return getStatus(_status);
    }

    // Set status to error
    function setStatusError() internal {
        status = QueryStatus.Error;
    }

    // Set status to performed
    function setStatusPerformed() internal {
        status = QueryStatus.Performed;
    }

}