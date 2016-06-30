var theJournal = document.getElementById('journal');
var submitButton = document.getElementById('post-button');
var deleteButton = document.getElementById('destroy');
var journalDiv = document.getElementById('journalDiv');



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
      var oldPost = document.createElement('p');
      oldPost.textContent = entry.entry;
      area.appendChild(oldPost);
      // if (entry.delete === 'false') {
      //   oldPost.textContent = entry.entry;
      //   area.appendChild(oldPost);
      // } else {
      //   setTimeout()
    // }
    })
  })
}

function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild)
  }
}

window.setInterval(entries, 5000)
// function deleteEntry () {
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', '/posts/');
//   xhr.send()
//
//   xhr.addEventListener('load', function() {
//     var response = JSON.parse(xhr.response);
//     response.data.forEach(function(post) {
//       if post.delete === 'true' {
//         post.data.entry = ''
//       }
//     })
//   })
//
//
// }
