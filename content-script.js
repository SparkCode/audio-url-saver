//content script
var clickedEl = null;

document.addEventListener("contextmenu", function(event){
    clickedEl = event.target;
}, true);

navigator.permissions.query({name: "clipboard-write"}).then(result => {
  if (result.state == "granted" || result.state == "prompt") {

  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request == "getClickedEl") {
        setTimeout(() => {
            const url = clickedEl.getAttribute('data-src-mp3');
            if (!url) {
                throw Error('no url inside dom element');
            }
            navigator.clipboard.writeText(url.split('?')[0]).then(function() {
                 /* clipboard successfully set */
            }, function(e) {
                console.error(e);
                throw e;
            });
            }, 
        100)
    }
});