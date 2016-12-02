
//removed listeners and just checked the website when incrementing timer
/*
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
*/

var currentSite;

//BUG when inspecting background page it will throw erros
//set interval runs every second which acts as the timer
setInterval(timer, 1000);
function timer() {
    updateCurrentSite();
    localStorage.setItem(currentSite,Number(localStorage.getItem(currentSite)) + 1);
    console.log(currentSite + " " + localStorage.getItem(currentSite));
}

var updateCurrentSite = function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var parser = document.createElement('a');
    parser.href = url;
    currentSite = parser.host;
    if (localStorage.getItem(currentSite) === null)
      localStorage.setItem(currentSite) = 1;

  });
}
