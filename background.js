chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
      var url = tabs[0].url;
      if (url && url.startsWith("https://www.ldoceonline.com")){ 
        // The onClicked callback function.
        function onClickHandler(info, tab) {
          chrome.tabs.sendMessage(tab.id, "getClickedEl", {frameId: info.frameId});
        };

        chrome.contextMenus.onClicked.addListener(onClickHandler);

          // Create a parent item and two children.
        chrome.contextMenus.create({
            "title": "copy audio url", "id": "parent", "contexts":['all'],
        });
      } else {
        chrome.contextMenus.remove("parent")
      }
  });
});

