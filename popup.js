var port = chrome.extension.connect({
     name: "Sample"
});
port.onMessage.addListener(function(msg) {
     updatePopup(msg)
});

function updatePopup(timer) {
  document.getElementById('site-title').innerHTML = timer.site;
  document.getElementById('session-timer').innerHTML = "Session: " + new Date(timer.sessionTime * 1000).toISOString().substr(11, 8);
  document.getElementById('lifetime-timer').innerHTML = "Lifetime: " + new Date(timer.localTime * 1000).toISOString().substr(11, 8);
}
