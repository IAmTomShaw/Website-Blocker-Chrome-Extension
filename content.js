chrome.storage.sync.get("blockedSites", function(data) {
  var blockedSites = data.blockedSites;

  for (var i = 0; i < blockedSites.length; i++) {
    if (window.location.href.includes(blockedSites[i])) {
      
      // empty the content of the page
      document.documentElement.innerHTML = "";
    }
  }
});