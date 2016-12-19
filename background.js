var currentSite;

/*(function (){
  var views = chrome.extension.getViews({
    type: "popup"
  });
  views[0].document.getElementById("sites-link").addEventListener("click", displaySites);
  function displaySites() {
    preventDefault();
    console.log("clicked");
  };
})();*/

//set interval runs every second which acts as the timer
setInterval(timer, 1000);
function timer() {
    updateCurrentSite();
    //update session and lifetime-timer
    if (localStorage.getItem(currentSite) === null) localStorage.setItem(currentSite) = 0;
    localStorage.setItem(currentSite,Number(localStorage.getItem(currentSite)) + 1);
    if (sessionStorage.getItem(currentSite) === null) sessionStorage.setItem(currentSite, 0);
    sessionStorage.setItem(currentSite,Number(sessionStorage.getItem(currentSite)) + 1);
    updatePopup(localStorage.getItem(currentSite), sessionStorage.getItem(currentSite));
}

var updateCurrentSite = function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var parser = document.createElement('a');
    parser.href = url;
    currentSite = parser.host;
  });
}

var updatePopup = function(localTime, sessionTime) {
  //update popup view
  var views = chrome.extension.getViews({
    type: "popup"
  });
  views[0].document.getElementById('site-title').innerHTML = currentSite;
  views[0].document.getElementById('session-timer').innerHTML = "Session: " + new Date(sessionTime * 1000).toISOString().substr(11, 8);
  views[0].document.getElementById('lifetime-timer').innerHTML = "Lifetime: " + new Date(localTime * 1000).toISOString().substr(11, 8);
}
