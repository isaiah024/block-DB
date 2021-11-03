let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'student'
});

function callQuery(sql){
    connection.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
      
        console.log('Connected to the MySQL server.');
      });
    
      connection.query(sql, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        console.log(results);
      });
    
      connection.end(function(err) {
        if (err) {
          return console.log('error:' + err.message);
        }
        console.log('Closed the database connection.');
      });
}

callQuery('SELECT * FROM students');
  
