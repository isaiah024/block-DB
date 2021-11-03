// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.9;

contract DatabaseRedesign{
    address private senderID;
    string private id;
    string private query;
    string private status;

    event LogNewQueryInfo(address senderID, string id, string query, string status);

    constructor() public{
        
    }

    function setAll(string memory _id, 
        string memory _query, string memory _status) public{
            senderID = msg.sender;
            id = _id;
            query = _query;
            status = _status;
    }

    function logAllInfo() public{
        LogInfo();
    }

    function setAllAndLog(string memory _id, 
        string memory _query, string memory _status) public{
            senderID = msg.sender;
            id = _id;
            query = _query;
            status = _status;
            LogInfo();
    }

    function LogInfo() private{
        emit LogNewQueryInfo(senderID, id, query, status);
    }
}