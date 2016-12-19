var currentSite;
var port;

chrome.extension.onConnect.addListener(function(port) {
     console.log("Connected .....");
     port.postMessage({site: currentSite, sessionTime: sessionStorage.getItem(currentSite), localTime: localStorage.getItem(currentSite)});
     this.port = port;
})

//set interval runs every second which acts as the timer
setInterval(timer, 1000);
function timer() {
    updateCurrentSite();
    //update session and lifetime-timer
    if (sessionStorage.getItem(currentSite) === null) sessionStorage.setItem(currentSite, 0);
    sessionStorage.setItem(currentSite,Number(sessionStorage.getItem(currentSite)) + 1);
    if (localStorage.getItem(currentSite) === null) localStorage.setItem(currentSite, 0)
    localStorage.setItem(currentSite,Number(localStorage.getItem(currentSite)) + 1);
    port.postMessage({site: currentSite, sessionTime: sessionStorage.getItem(currentSite), localTime: localStorage.getItem(currentSite)});
}

var updateCurrentSite = function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    //try catch used to suppress error message while chrome inspect page is focused
    try {var url = tabs[0].url;} catch(err){}
    var parser = document.createElement('a');
    parser.href = url;
    currentSite = parser.host;
  });
}
