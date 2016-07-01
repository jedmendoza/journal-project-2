var theJournal = document.getElementById('journal');
var submitButton = document.getElementById('post-button');
var deleteButton = document.getElementById('destroy');
var journalDiv = document.getElementById('journalDiv');

// All the user to edit the most recent post when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  recent = new XMLHttpRequest();
  recent.open('GET', '/posts/recent/jed')
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

      // TODO XXX(Jed): Add the post to the page.
        // var livejournal = document.getElementById('livejournal');
        //
        // var entryDiv = document.createElement('div');
        // entryDiv.setAttribute('class', 'panel panel-default');
        //
        // var entryBody = document.createElement('div');
        // entryBody.setAttribute('class', 'panel-body');
        //
        // var journalEntry = document.createElement('p');
        // journalEntry.textContent = response.entry;
        //
        // livejournal.appendChild(entryDiv);
        // entryDiv.appendChild(entryBody);
        // entryBody.appendChild(journalEntry);
        makeEntry(response);
    }
  });
});

// On key press save the entry to the server.
theJournal.addEventListener('keyup', function(e) {
  var theJournal = document.getElementById('journal');
  var id = theJournal.getAttribute('data-id');

  var thePost = {};
  // Check if this post already has an idea.
  if (!id) {
    thePost.id = Date.now();
  } else {
    thePost.id = id;
  }

  thePost.entry = theJournal.value;
  thePost.user = 'jed';
  thePost.time = Date.now();

  if (deleteButton.checked) {
    thePost.delete = 'true'
  } else {
    thePost.delete = 'false'
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/posts/' + 'jed');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(thePost));

  makeEntry(thePost);
});
function makeEntry(response) {
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
function entries() {
  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', '/live/');
  // xhr.send()
  //
  // xhr.addEventListener('load', function() {
  //   var response = JSON.parse(xhr.response)
  //
  //   var area = document.getElementById('previous-entries');
  //   clear(area);
  //
  //   response.forEach(function(entry) {
  //
  //     var entryPanel = document.createElement('div');
  //     entryPanel.setAttribute('class', 'panel panel-default');
  //
  //     var entryPanelContent = document.createElement('div');
  //     entryPanelContent.setAttribute('class', 'panel-body');
  //
  //     var oldPost = document.createElement('p');
  //     oldPost.textContent = entry.entry;
  //
  //     area.appendChild(entryPanel);
  //     entryPanel.appendChild(entryPanelContent);
  //     entryPanelContent.appendChild(oldPost);
  //   })
  // })
}

// var livePost = window.setInterval(getLive, 500);

// function getLive() {
//   var xhr = XMLHttpRequest();
//   xhr.open('GET', '/posts/live/')
//   xhr.send()
//
//   xhr.addEventListener('load', function() {
//     var response = JSON.parse(xhr.response)
//     console.log(response);
//   })
// }

function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild)
  }
}

// window.setInterval(entries, 10000)
