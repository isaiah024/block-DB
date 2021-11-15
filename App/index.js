var express = require('express');
var app = express();
app.use(express.static('src'));
app.use(express.static('../Contract/build/contracts'));
app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/query', function (req, res) {
  res.sendFile('query.html',{root : __dirname + '/src'});
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});