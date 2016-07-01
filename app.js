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
});

app.get('/posts/', function(req, res) {
  var valid = []
  posts.data.forEach(function(post) {
    if ((post.time + 10000) > Date.now() || post.delete === 'false') {
      valid.push(post)
    }
  })
    res.json(valid);
    console.log(valid)
});

// app.get('/posts/', function(req, res) {
//   posts.data.forEach(function(entry) {})
//   res.send();
// })

// app.post('/live/:user', function(req, res) {
//   posts.data.push(req.body);
//   res.send();
// })

// app.post('/live/', function(req, res) {
//   posts.data.push(req.body);
//   res.send()
// })

// app.get('/posts/', function(req, res) {
//   var last = posts.data[posts.data.length - 1]
//     res.json(last);
//     console.log(last)
// });
//create code on front end to open request

app.listen(8080);
