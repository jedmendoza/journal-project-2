var express = require('express');
var jsonParser = require('body-parser').json();
var app = express();
var users = require('./users.js');
var posts = require('./posts.js');

app.use(jsonParser)

app.use(express.static('./'));

// Add a new post for a particular user.
app.post('/posts/:user', function(req, res) {
  // If the post already exists, replace it.
  var match = false;
  posts.data.forEach(function(post) {
    if (req.body.id == post.id) {
      post.entry = req.body.entry;
      match = true;
    }
  });
  // If the post doesn't already exist, add it.
  if (!match) {
    posts.data.push(req.body);
  }

  res.send();
});

// Return posts that haven't yet expired.
app.get('/posts/', function(req, res) {
  // Get all the valid posts.
  var valid = isValid();
  res.json(valid);
});

// Return the lastest post that isn't expired for this user.
app.get('/posts/recent/:user', function(req, res) {
  var valid = isValid();

  var last = valid[valid.length - 1];
  res.json(last);
});

function isValid() {
  var valid = []

  posts.data.forEach(function(post) {
    // If the post hasn't expired it will be returned.
    if ((post.time + 10000) > Date.now() || post.delete === 'false') {
      valid.push(post)
    }
  });

  return valid;
}

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
