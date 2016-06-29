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
    console.log(response)
    var area = document.getElementById('previous-entries');
    clear(area);
    response.data.forEach(function(entry) {
      var oldPost = document.createElement('p');
      if (entry.delete === 'false') {
      oldPost.textContent = entry.entry;
      area.appendChild(oldPost);
    } else {
      return false
    }
    })
  })
}

function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild)
  }
}

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
