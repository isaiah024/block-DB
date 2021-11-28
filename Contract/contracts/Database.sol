pragma solidity ^0.8.9;

contract Database{

    struct User {
        uint userId;
    }

    event LogNewQueryInfo(address senderID, uint id, string _query);

    mapping(address => User) public registeredUsers;

    modifier checkUser(uint userId) {
        require(registeredUsers[msg.sender].userId == 0, "User already registered");
        _;
    }

    function registerUser(uint userId) public checkUser(userId) {
        registeredUsers[msg.sender].userId = userId;
    }

    function loginUser(uint userId) public view returns (bool){
        if(registeredUsers[msg.sender].userId == userId){
            return true;
        }else{
            return false;
        }
    }

    function LogInfo(string memory query) public{
        emit LogNewQueryInfo(msg.sender, registeredUsers[msg.sender].userId, query);
    }
}