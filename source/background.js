/* global chrome */

chrome.contextMenus.create({
    title: 'copy audio url',
    id: 'parent',
    contexts: ['all'],
    documentUrlPatterns: ['https://www.ldoceonline.com/*']
});

// The onClicked callback function.
function onClickHandler(info, tab) {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            const clickedEl = document.activeElement;
            const node = clickedEl.hasAttribute('data-src-mp3') ? clickedEl : clickedEl.querySelector('[data-src-mp3]');
            if (!node) {
                alert('no url inside dom element');
                return;
            }
            const url = node.getAttribute('data-src-mp3');
            navigator.clipboard.writeText(url.split('?')[0]).then(() => {
                alert('Succeed');
            }, (e) => {
                alert(e.toString());
            });
        }
    });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);