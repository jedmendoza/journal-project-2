var theJournal = document.getElementById('journal');
var submitButton = document.getElementById('post-button');
var deleteButton = document.getElementById('destroy');
var journalDiv = document.getElementById('journal-div');
var writer = document.getElementById('writer')
var writeButton = document.getElementById('write-post');
var newPost = document.getElementById('new-post');
var livePost = document.getElementById('live-post');
var back = document.getElementById('back-to-posts');



// Allow the user to edit the most recent post when the page loads.
document.addEventListener('DOMContentLoaded', function(theEvent) {

  // var author = document.getElementById('author');
  recent = new XMLHttpRequest();
  recent.open('GET', '/posts/recent/jed');
  recent.send()

  recent.addEventListener('load', function() {
    var journal = document.getElementById('journal');
    if (!recent.responseText == '') {
      // We have a journal entry.
      var response = JSON.parse(recent.responseText);

      if (response.user == 'undefined') {
        console.log('No user found.')
      } else {
        journal.setAttribute('data-id', response.id);
        journal.setAttribute('data-user', response.user);
        journal.textContent = response.entry;
        // console.log(recent.responseText);
        makeLiveEntry(response);
        console.log(response.id)
      }
    }
  });
});

// On key press save the entry to the server.
theJournal.addEventListener('keyup', function(e) {
  var theJournal = document.getElementById('journal');
  var id = theJournal.getAttribute('data-id');

  var thePost = {};
  // Check if this post already has an id.
  if (!id) {
    thePost.id = Date.now();
    theJournal.setAttribute('data-id', thePost.id);
  } else {
    thePost.id = id;
  }

  thePost.entry = theJournal.value;
  thePost.user = 'jed';
  thePost.time = Date.now();

  // if (deleteButton.checked) {
  //   thePost.delete = 'true'
  // } else {
  //   thePost.delete = 'false'
  // }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/posts/user');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(thePost));

  makeEntry(thePost);
  console.log(thePost);
});

newPost.addEventListener('click', function() {
  var theJournal = document.getElementById('journal');
  var id = theJournal.getAttribute('data-id');
  var postarea = document.getElementById('post2');

  var entries = [];
  var thePost = {};


  thePost.id = Date.now();
  theJournal.setAttribute('data-id', thePost.id);

  thePost.entry = theJournal.value;
  // thePost.user = writer.value;
  thePost.time = Date.now();

  entries.push(thePost.entry)

  entries.forEach(function(entry) {
    var column = document.createElement('div');
    column.setAttribute('class','col-md-4');

    var div = document.createElement('div');
    div.setAttribute('class', 'panel panel-default');

    var div2 = document.createElement('div');
    div2.setAttribute('class', 'panel-body entries');

    // var text = document.createElement('p');
    var text = document.createElement('textarea');
    text.className = 'form-control';
    text.rows = '8'

    text.textContent = thePost.entry;

    postarea.appendChild(column);
    column.appendChild(div);
    div.appendChild(div2);
    div2.appendChild(text);

    console.log(thePost.id)
  })

  theJournal.value = '';

  console.log(thePost.id);
  console.log(theJournal)

  // if (deleteButton.checked) {
  //   thePost.delete = 'true'
  // } else {
  //   thePost.delete = 'false'
  // }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/posts/jed');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(thePost));
})


back.addEventListener('click', function() {
  $('#journal-container').removeClass('hidden');
  $('#reader-container').addClass('hidden');
});


function makeEntry(response, entry) {
  var livejournal = document.getElementById('livejournal');
  clear(livejournal)
  var entryDiv = document.createElement('div');
  entryDiv.setAttribute('class', 'panel panel-default');
  //
  var entryBody = document.createElement('div');
  entryBody.setAttribute('class', 'panel-body entries');

  var journalEntry = document.createElement('p');
  journalEntry.textContent = response.entry;


  livejournal.appendChild(entryDiv);
  entryDiv.appendChild(entryBody);
  entryBody.appendChild(journalEntry);
}

function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild)
  }
}

// window.setInterval(makeEntry, 10000)
