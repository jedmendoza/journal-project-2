var express = require('express');
var jsonParser = require('body-parser').json();
var app = express();

app.get('/', function(req, res) {
  res.send('testing')
});

app.post('/login', function(req, res) {
  res.send('log in here');
})

app.listen(8080);
