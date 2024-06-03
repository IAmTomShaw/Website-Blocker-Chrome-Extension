document.addEventListener("DOMContentLoaded", function () {
  var addSiteButton = document.getElementById("addSite");
  addSiteButton.addEventListener("click", function () {
    var siteInput = document.getElementById("siteInput").value;
    if (siteInput) {
      chrome.storage.sync.get("blockedSites", function (data) {
        var blockedSites = data.blockedSites || [];
        blockedSites.push(siteInput);
        chrome.storage.sync.set({ blockedSites: blockedSites });
        updateBlockedList();
      });
      document.getElementById("siteInput").value = "";
    }
  });

  function updateBlockedList() {
    chrome.storage.sync.get("blockedSites", function (data) {
      var blockedSites = data.blockedSites;
      if (!blockedSites) {
        blockedSites = [];
      }
      var blockedList = document.getElementById("blockedList");
      blockedList.innerHTML = "";
      blockedSites.forEach(function (site) {
        var li = document.createElement("li");
        li.textContent = site;

        // add a remove button

        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.id = "removeSite";
        removeButton.addEventListener("click", function () {
          chrome.storage.sync.get("blockedSites", function (data) {
            var blockedSites = data.blockedSites;
            var index = blockedSites.indexOf(site);
            if (index !== -1) {
              blockedSites.splice(index, 1);
              chrome.storage.sync.set({ blockedSites: blockedSites });
              updateBlockedList();
            }
          });
        });

        li.appendChild(removeButton);

        blockedList.appendChild(li);
      });
    });
  }

  updateBlockedList();
});
