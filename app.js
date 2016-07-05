var express = require('express');
var jsonParser = require('body-parser').json();
var app = express();
// var users = require('./users.js');
var posts = require('./posts.js');
var cookieParser = require('cookie-parser');

var sessions = []

app.use(cookieParser());

app.use(jsonParser)

app.use(express.static('./'));



// if there are no active sessions, create a session
app.post('/sessions/check/:user', function(req, res) {
  var activeSessions = {};
  var sessionid = Date.now();

  //if sessions is empty, make first sessions
  if (sessions.length < 1) {
    activeSessions.user = req.params.user;
    activeSessions.id = sessionid;
    sessions.push(activeSessions);
    res.cookie('session', sessionid);
    console.log('sessions was empty. first session was made');
    console.log(activeSessions);
    console.log(sessions);
    res.send();
  }

  var matched = false;

  sessions.forEach(function(session) {
    if (session.user == req.params.user) {
      console.log(req.params.user + ' ' + 'already has cookie');
      matched = true
      res.send();
    }
  })
  if (!matched) {
    activeSessions.user = req.params.user;
    activeSessions.id = sessionid;
    sessions.push(activeSessions);
    res.cookie('session', sessionid);
  }
  res.send();
  console.log(sessions);
})


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


app.listen(8080);
