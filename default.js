var theJournal = document.getElementById('journal');
var submitButton = document.getElementById('post-button');
var deleteButton = document.getElementById('destroy');
var journalDiv = document.getElementById('journalDiv');
var writer = document.getElementById('writer')
var writeButton = document.getElementById('writePost');

writeButton.addEventListener('click', function(theEvent) {

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/sessions/check/' + writer.value);
  xhr.send();



  xhr.addEventListener('load', function() {
    console.log(xhr.response);

    $('#login-container').addClass('hidden');
    $('#bannerContainer').removeClass('hidden');
    $('#input-area').removeClass('hidden');
  })
})

// Allow the user to edit the most recent post when the page loads.
document.addEventListener('DOMElementChanged', function() {
  var author = document.getElementById('author');
  recent = new XMLHttpRequest();
  recent.open('GET', '/posts/recent/' + writer.value);
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
      }

      makeEntry();
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
  // thePost.user = writer.value;
  thePost.time = Date.now();

  if (deleteButton.checked) {
    thePost.delete = 'true'
  } else {
    thePost.delete = 'false'
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/posts/jed');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(thePost));

  console.log(thePost);
});

function makeEntry(response, entry) {
  var livejournal = document.getElementById('livejournal');
  clear(livejournal)
  var entryDiv = document.createElement('div');
  entryDiv.setAttribute('class', 'panel panel-default');

  var entryBody = document.createElement('div');
  entryBody.setAttribute('class', 'panel-body');

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
