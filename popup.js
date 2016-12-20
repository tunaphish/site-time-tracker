var port = chrome.extension.connect({
     name: "Sample"
});
port.onMessage.addListener(function(msg) {
     updatePopup(msg)
});
function updatePopup(timer) {
  document.getElementById('site-title').innerHTML = timer.site;
  document.getElementById('session-timer').innerHTML = "Session: " + formatTime(timer.sessionTime);
  document.getElementById('lifetime-timer').innerHTML = "Lifetime: " + formatTime(timer.localTime);
}
function formatTime(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

document.addEventListener("DOMContentLoaded", function(event) {
  var div = document.getElementById('sites-list')
  for (var i = 0; i < localStorage.length; i++){
      var p = document.createElement('P');
      p.innerHTML = localStorage.key(i) + " " + formatTime(localStorage.getItem(localStorage.key(i)));
      div.appendChild(p);
  }
});
