var express = require('express');
var app = express();
var query;
app.use(express.static('src'));
app.use(express.static('../Contract/build/contracts'));
app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/query', function (req, res) {
  res.sendFile('query.html',{root : __dirname + '/src'});
});

app.get('/results', function (req, res){
  if (typeof window !== 'undefined') {
    console.log('we are running on the client')
  } else {
    console.log('we are running on the server');
  }
  let mysql = require('mysql');
  var queryResults = "";
  //var query = localStorage.getItem("userQuery");

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'student'
  });

  connection.connect(function(err) {
    if (err) {
      //document.getElementById('queryResults').innerHTML = 'error: ' + err.message;
      console.log(err);
      //return error;
    }
  
    //document.getElementById('queryResults').innerHTML = 'Connected to the MySQL server.';
    console.log("Connected to mySQL serevr");
  });

  connection.query("SELECT * FROM students WHERE id = " + queryID, (error, results, fields) => {
    if (error) {
      //document.getElementById('queryResults').innerHTML = error.message;
      console.log(error);
      //return error;
    }
    //document.getElementById('queryResults').innerHTML = results;
    queryResults = results;
    console.log(results);
    //return results;
  });

  connection.end(function(err) {
    if (err) {
      //document.getElementById('queryResults').innerHTML ='error:' + err.message;
      console.log(err);
      //return error;
    }
    //document.getElementById('queryResults').innerHTML = 'Closed the database connection.';
    console.log("Closed the database connection");
  });

  //res.sendFile('results.html',{root : __dirname + '/src'});
  res.send(queryResults);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});