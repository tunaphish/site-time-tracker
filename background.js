var sites =  {};
var currentSite;

//listeners
chrome.tabs.onActivated.addListener(function() {
  updateCurrentSite();
});
//add older chrome support in future, also won't work unless you add the check for onhashchange for some reason
//inconsistent, doesn't always work, replace with setinterval
if ("onhashchange" in window) {
  window.onhashchange = function() {
    updateCurrentSite();
  };
}

setInterval(timer, 1000);
function timer() {
    sites[currentSite]++;
    console.log(currentSite + " " + sites[currentSite]);
}

var updateCurrentSite = function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var parser = document.createElement('a');
    parser.href = url;
    if (!(parser.host in sites)) {
      sites[parser.host] = 1;
      currentSite = parser.host;
    }
    currentSite = parser.host;
  });
}
