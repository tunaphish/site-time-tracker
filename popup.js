//Current Site
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


//Site List
document.addEventListener("DOMContentLoaded", function(event) {
  var div = document.getElementById('sites-list')
  var table = document.createElement('TABLE');
  for (var i = 0; i < localStorage.length; i++){
      var tr = document.createElement('TR')
      var th = document.createElement('TH');
      var td = document.createElement('TD');
      th.innerHTML = localStorage.key(i);
      td.innerHTML = formatTime(localStorage.getItem(localStorage.key(i)));
      tr.appendChild(th);
      tr.appendChild(td);
      table.appendChild(tr);
  }
  div.appendChild(table);
});
