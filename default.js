var theJournal = document.getElementById('journal');
var submitButton = document.getElementById('post-button');
var deleteButton = document.getElementById('destroy');
var journalDiv = document.getElementById('journalDiv');
// var entriesDiv = document.getElementById('previous-entries')

// $('#journalModalDiv').modal('toggle')

submitButton.addEventListener('click', function(e) {
  var thePost = {};
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

  entries();

});

function entries() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/posts/');
  xhr.send()

  xhr.addEventListener('load', function() {
    var response = JSON.parse(xhr.response)
    var area = document.getElementById('previous-entries');
    clear(area);
    console.log(response)
    response.forEach(function(entry) {

      var entryPanel = document.createElement('div');
      entryPanel.setAttribute('class', 'panel panel-default');

      var entryPanelContent = document.createElement('div');
      entryPanelContent.setAttribute('class', 'panel-body');

      var oldPost = document.createElement('p');
      oldPost.textContent = entry.entry;

      area.appendChild(entryPanel);
      entryPanel.appendChild(entryPanelContent);
      entryPanelContent.appendChild(oldPost);
    })
  })
}

function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild)
  }
}

window.setInterval(entries, 10000)
