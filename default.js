


var theJournal = document.getElementById('journal');
var submitButton = document.getElementById('post-button');
// var content = [];


submitButton.addEventListener('click', function(e) {
  var thePost = {};
  thePost.entry = theJournal.value;
  thePost.user = 'jed';
  thePost.time = Date.now();
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/posts/' + 'jed');
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(thePost));

  entries();

  // xhr.addEventListener('load', function() {
  //   var response = xhr.response
  // })

})

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
      oldPost.textContent = entry.entry;
      area.appendChild(oldPost);

    })
  })
}

function clear(area) {
  while(area.firstChild) {
    area.removeChild(area.firstChild)
  }
}
