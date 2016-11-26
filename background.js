chrome.tabs.onActivated.addListener(function() {
  printHost();
});

var printHost = function () {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var parser = document.createElement('a');
    parser.href = url;
    console.log(parser.host);
  });
}
