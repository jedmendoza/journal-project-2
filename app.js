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
  // console.log(posts.data)
});

app.get('/posts/', function(req, res) {
  var valid = []
  posts.data.forEach(function(post) {
    if ((post.time + 5000) > Date.now() || post.delete === 'false') {
      valid.push(post)
    }
  })
    res.json(valid);
    console.log(valid)

});

// app.delete

app.listen(8080);
// on back end list of data and timers
//front end c
