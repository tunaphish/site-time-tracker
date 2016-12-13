var currentSite;

//set interval runs every second which acts as the timer
setInterval(timer, 1000);
function timer() {
    updateCurrentSite();
    //update daily, weekly, and lifetime-timer
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
  views[0].document.getElementById('site-title').innerHTML = currentSite;
  views[0].document.getElementById('lifetime-timer').innerHTML = "Lifetime: " + new Date(time * 1000).toISOString().substr(11, 8);
}
