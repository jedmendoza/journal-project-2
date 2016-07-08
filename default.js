var theJournal = document.getElementById('journal');
var submitButton = document.getElementById('post-button');
var deleteButton = document.getElementById('destroy');
var journalDiv = document.getElementById('journalDiv');
var writer = document.getElementById('writer')
var writeButton = document.getElementById('writePost');
var newPost = document.getElementById('newPost');



// Allow the user to edit the most recent post when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  var author = document.getElementById('author');
  recent = new XMLHttpRequest();
  recent.open('GET', '/posts/recent/user');
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

  // if (deleteButton.checked) {
  //   thePost.delete = 'true'
  // } else {
  //   thePost.delete = 'false'
  // }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/posts/jed');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(thePost));

  makeEntry(thePost);
  console.log(thePost);
});

newPost.addEventListener('click', function() {
  var theJournal = document.getElementById('journal');
  var entries = []
  var thePost = {};
  var id = theJournal.getAttribute('data-id');
  var postarea = document.getElementById('post2');


  thePost.id = Date.now();
  theJournal.setAttribute('data-id', thePost.id);

  thePost.entry = theJournal.value;
  // thePost.user = writer.value;
  thePost.time = Date.now();

  entries.push(thePost.entry)

  console.log(entries)

  entries.forEach(function(entry) {
    var div = document.createElement('div');
    div.setAttribute('class', 'panel panel-default');

    var div2 = document.createElement('div');
    div2.setAttribute('class', 'panel-body');

    var text = document.createElement('p');
    text.textContent = thePost.entry;

    postarea.appendChild(div);
    div.appendChild(div2);
    div2.appendChild(text);
  })

  theJournal.value = '';

  // if (deleteButton.checked) {
  //   thePost.delete = 'true'
  // } else {
  //   thePost.delete = 'false'
  // }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/posts/jed');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(thePost));


  // console.log(thePost);

})

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

// var theJournal = document.getElementById('journal');
// var submitButton = document.getElementById('post-button');
// var deleteButton = document.getElementById('destroy');
// var journalDiv = document.getElementById('journalDiv');
// var writer = document.getElementById('writer')
// var writeButton = document.getElementById('writePost');
// var newPost = document.getElementById('newPost');
//
//
//
// // Allow the user to edit the most recent post when the page loads.
// document.addEventListener('DOMContentLoaded', function() {
//   var author = document.getElementById('author');
//   recent = new XMLHttpRequest();
//   recent.open('GET', '/posts/recent/user');
//   recent.send()
//
//   recent.addEventListener('load', function() {
//     var journal = document.getElementById('journal');
//     if (!recent.responseText == '') {
//       // We have a journal entry.
//       var response = JSON.parse(recent.responseText);
//
//       if (response.user == 'undefined') {
//         console.log('No user found.')
//       } else {
//         journal.setAttribute('data-id', response.id);
//         journal.setAttribute('data-user', response.user);
//         journal.textContent = response.entry;
//       }
//
//       makeEntry();
//     }
//   });
// });
//
// // On key press save the entry to the server.
// theJournal.addEventListener('keyup', function(e) {
//   var theJournal = document.getElementById('journal');
//   var id = theJournal.getAttribute('data-id');
//
//   var thePost = {};
//   // Check if this post already has an id.
//   if (!id) {
//     thePost.id = Date.now();
//     theJournal.setAttribute('data-id', thePost.id);
//   } else {
//     thePost.id = id;
//   }
//
//   thePost.entry = theJournal.value;
//   // thePost.user = writer.value;
//   thePost.time = Date.now();
//
//   // if (deleteButton.checked) {
//   //   thePost.delete = 'true'
//   // } else {
//   //   thePost.delete = 'false'
//   // }
//
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/posts/jed');
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(thePost));
//
//   makeEntry(thePost);
//   console.log(thePost);
// });
//
// newPost.addEventListener('click', function() {
//   var theJournal = document.getElementById('journal');
//
//
//   var thePost = {};
//   // Check if this post already has an id.
//
//   thePost.id = Date.now();
//   theJournal.setAttribute('data-id', thePost.id);
//
//
//   thePost.entry = theJournal.value;
//   // thePost.user = writer.value;
//   thePost.time = Date.now();
//
//   theJournal.value ='';
//
//   // if (deleteButton.checked) {
//   //   thePost.delete = 'true'
//   // } else {
//   //   thePost.delete = 'false'
//   // }
//
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/posts/jed');
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(thePost));
//
//   var post = document.getElementById('livejournal');
//   if (post !== '') {
//     //make a new div with same qualities as last entry
//     var newElm = document.createElement('div')
//     newElm.setAttribute('col-md-4');
//
//     var panel = document.createElement('div');
//     panel.setAttribute('class', 'panel panel-default');
//
//     var body = document.createElement('div');
//     body.setAttribute('class', 'panel-body');
//
//     var theEntry = document.createElement('p');
//     theEntry.textContent = thePost.Entry;
//   }
//   makeEntry(thePost);
//   console.log(thePost);
//
// })
//
//
//
//
// function makeNewPost(response, entry ) {
//   var livejournal = document.getElementById('livejournal');
//
//
//   var entryDiv = document.createElement('div');
//
//   entryDiv.setAttribute('class', 'panel panel-default');
//
//   var entryBody = document.createElement('div');
//   clear(entryBody);
//   entryBody.setAttribute('class', 'panel-body');
//
//   var journalEntry = document.createElement('p');
//   journalEntry.textContent = response.entry;
//
//   livejournal.appendChild(entryDiv);
//   entryDiv.appendChild(entryBody);
//   entryBody.appendChild(journalEntry);
// }
//
// function makeEntry(response, entry, livejournal) {
//   var livejournal = document.getElementById('livejournal');
//
//
//   var entryDiv = document.createElement('div');
//   entryDiv.setAttribute('class', 'panel panel-default');
//   //
//   var entryBody = document.createElement('div');
//   entryBody.setAttribute('class', 'panel-body entries');
//
//   var journalEntry = document.createElement('p');
//   journalEntry.textContent = response.entry;
//
//
//   livejournal.appendChild(entryDiv);
//   entryDiv.appendChild(entryBody);
//   entryBody.appendChild(journalEntry);
//
// }
//
// function clear(area) {
//   while(area.firstChild) {
//     area.removeChild(area.firstChild)
//   }
// }

// window.setInterval(makeEntry, 10000)
//
//
// var theJournal = document.getElementById('journal');
// var submitButton = document.getElementById('post-button');
// var deleteButton = document.getElementById('destroy');
// var journalDiv = document.getElementById('journalDiv');
// var writer = document.getElementById('writer')
// var writeButton = document.getElementById('writePost');
// var newPost = document.getElementById('newPost');
//
//
//
// // Allow the user to edit the most recent post when the page loads.
// document.addEventListener('DOMContentLoaded', function() {
//   var author = document.getElementById('author');
//   recent = new XMLHttpRequest();
//   recent.open('GET', '/posts/recent/user');
//   recent.send()
//
//   recent.addEventListener('load', function() {
//     var journal = document.getElementById('journal');
//     if (!recent.responseText == '') {
//       // We have a journal entry.
//       var response = JSON.parse(recent.responseText);
//
//       if (response.user == 'undefined') {
//         console.log('No user found.')
//       } else {
//         journal.setAttribute('data-id', response.id);
//         journal.setAttribute('data-user', response.user);
//         journal.textContent = response.entry;
//       }
//
//       makeEntry();
//     }
//   });
// });
//
// // On key press save the entry to the server.
// theJournal.addEventListener('keyup', function(e) {
//   var theJournal = document.getElementById('journal');
//   var id = theJournal.getAttribute('data-id');
//
//   var thePost = {};
//   // Check if this post already has an id.
//   if (!id) {
//     thePost.id = Date.now();
//     theJournal.setAttribute('data-id', thePost.id);
//   } else {
//     thePost.id = id;
//   }
//
//   thePost.entry = theJournal.value;
//   // thePost.user = writer.value;
//   thePost.time = Date.now();
//
//   // if (deleteButton.checked) {
//   //   thePost.delete = 'true'
//   // } else {
//   //   thePost.delete = 'false'
//   // }
//
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', '/posts/jed');
//   xhr.setRequestHeader('content-type', 'application/json');
//   xhr.send(JSON.stringify(thePost));
//
//
//
//   makeEntry(thePost);
//   console.log(thePost);
// });
//
// // newPost.addEventListener('click', function() {
// //   var theJournal = document.getElementById('journal');
// //
// //
// //   var thePost = {};
// //   // Check if this post already has an id.
// //
// //   thePost.id = Date.now();
// //   theJournal.setAttribute('data-id', thePost.id);
// //
// //
// //   thePost.entry = theJournal.value;
// //   // thePost.user = writer.value;
// //   thePost.time = Date.now();
// //
// //   theJournal.value ='';
// //
// //   // if (deleteButton.checked) {
// //   //   thePost.delete = 'true'
// //   // } else {
// //   //   thePost.delete = 'false'
// //   // }
// //
// //   var xhr = new XMLHttpRequest();
// //   xhr.open('POST', '/posts/jed');
// //   xhr.setRequestHeader('content-type', 'application/json');
// //   xhr.send(JSON.stringify(thePost));
// //
// //
// //   console.log(thePost);
// //
// // })
//
// function makeEntry(response, entry) {
//   var journal = document.getElementById('post2');
//   // clear(post2);
//
//   var entryDiv = document.createElement('div');
//   entryDiv.setAttribute('class', 'panel panel-default');
//   //
//   var entryBody = document.createElement('div');
//   entryBody.setAttribute('class', 'panel-body');
//
//   var journalEntry = document.createElement('p');
//   journalEntry.textContent = response.entry;
//
//   journal.appendChild('entryDiv');
//   entryDiv.appendChild('entryBody');
//   entryBody.appendChild('journalEntry')
//
//   // livejournal.appendChild(entryDiv);
//   // entryDiv.appendChild(entryBody);
//   // entryBody.appendChild(journalEntry);
//
// }
//
// function clear(area) {
//   while(area.firstChild) {
//     area.removeChild(area.firstChild)
//   }
// }
//
// // window.setInterval(makeEntry, 10000)
