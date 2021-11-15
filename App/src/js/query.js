let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'student'
});
document.getElementById("submitQuery").addEventListener("click", callQuery());

function myTest(){
  alert("It works!");
}

function callQuery(){
    sql = document.getElementById("query").value;
    connection.connect(function(err) {
        if (err) {
          document.getElementById('queryResults').innerHTML = 'error: ' + err.message;
          //return error;
        }
      
        //document.getElementById('queryResults').innerHTML = 'Connected to the MySQL server.';
      });
    
      connection.query(sql, (error, results, fields) => {
        if (error) {
          document.getElementById('queryResults').innerHTML = error.message;
          //return error;
        }
        document.getElementById('queryResults').innerHTML = results;
        //return results;
      });
    
      connection.end(function(err) {
        if (err) {
          document.getElementById('queryResults').innerHTML ='error:' + err.message;
         //return error;
        }
        //document.getElementById('queryResults').innerHTML = 'Closed the database connection.';
      });

      window.onload = callQuery;
}

  
