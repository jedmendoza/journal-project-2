var express = require('express');
var jsonParser = require('body-parser').json();
var app = express();
var users = require('./users.js');
var posts = require('./posts.js');

app.use(jsonParser)

app.use(express.static('./'));

app.get('/', function(req, res) {
  res.send('testing')
});

app.post('/posts/:user', function(req, res) {
  posts.data.push(req.body);
  res.send();
  console.log(posts.data);
});

app.get('/posts/', function(req, res) {
  res.json(posts)
});


app.listen(8080);
