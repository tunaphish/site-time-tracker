
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

(function (){

})(window);

//BUG when inspecting background page it will throw erros
//set interval runs every second which acts as the timer
setInterval(timer, 1000);
function timer() {
    updateCurrentSite();
    //update site timer
    localStorage.setItem(currentSite,Number(localStorage.getItem(currentSite)) + 1);
    updateTimer(localStorage.getItem(currentSite));
}

var updateCurrentSite = function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var parser = document.createElement('a');
    parser.href = url;
    currentSite = parser.host;
    if (localStorage.getItem(currentSite) === null)
      localStorage.setItem(currentSite) = 0;
  });
}

var updateTimer = function(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor(time % 3600 / 60);
  var seconds = Math.floor(time % 3600 % 60);

  //update popup view
  var views = chrome.extension.getViews({
    type: "popup"
  });
  for (var i = 0; i < views.length; i++) {
    views[i].document.getElementById('site-title').innerHTML = currentSite;
    views[i].document.getElementById('daily-timer').innerHTML = "Lifetime: " + hours + ":" + minutes + ":" + seconds;
    views[i].document.getElementById('weekly-timer').innerHTML = "Lifetime: " + hours + ":" + minutes + ":" + seconds;
    views[i].document.getElementById('lifetime-timer').innerHTML = "Lifetime: " + hours + ":" + minutes + ":" + seconds;
  }
}
