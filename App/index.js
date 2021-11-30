var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('src'));
app.use(express.static('../Contract/build/contracts'));

/*async function queryDB(userQuery){
  let mysql = require('mysql');
  var queryResults = "";

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'student'
  });

  await connection.connect(function(err) {
    if (err) { console.log(err); }
    connection.query("SELECT * FROM students WHERE id = " + userQuery, (error, results, fields) => {
      if (error) { console.log(error); }
      connection.end(function(err) {
        if (err) { console.log(err); }
        return queryResults;
        console.log("Closed the database connection");
      });
      queryResults = results;
      console.log("Results within connection.query function: " + results);
    });
  
    console.log("The results in the queryDB function are: " + queryResults);
  
    console.log("Connected to mySQL serevr");

  });
}*/

app.get('/', function (req, res) {
  res.render('index.ejs');
});

app.get('/query', function (req, res) {
  res.render('query.ejs',{root : __dirname + '/src'});
});

app.post('/query', async function (req, res) {
  try{
    let mysql = require('mysql');
    //const logQuery = require('../App/src/js/app.js').handeLoggingQuery;
    var queryResults = "";

    let connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'student'
    });

    connection.connect(function(err) {
      if (err) { console.log(err); res.send("Error occured");}
      console.log("Connected to mySQL server");

      connection.query("SELECT * FROM students WHERE id = " + req.body.query, (error, results, fields) => {
        if (error) { console.log(error); res.render("Error_occured"); }
        connection.end(function(err) {
          if (err) { console.log(err); res.render("Error_occured");}
        //console.log("result variable in post: ", results[0]);
        res.render('results.ejs', {Result: results});
        console.log("Closed the database connection");
        });
      });

    });
  }catch(err){console.log(err); res.render("Error occured");}
  
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
