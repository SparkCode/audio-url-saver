/* global chrome */

let clickedEl = null;

const showForPages = [{ pageUrl: { hostEquals: 'www.ldoceonline.com' } }];

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: showForPages,
                actions: [new chrome.declarativeContent.ShowPageAction()],
            },
        ]);
    });
});

document.addEventListener('contextmenu', (event) => {
    clickedEl = event.target;
}, true);

const showMessage = (message, background) => {
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `position:fixed;top:0;left:0;width:200px;height:100px;background-color:${background};`;
    messageElement.innerText = message;
    document.documentElement.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 5000);
};

chrome.runtime.onMessage.addListener((request) => {
    if (request === 'getClickedEl') {
        const node = clickedEl.hasAttribute('data-src-mp3') ? clickedEl : clickedEl.querySelector('[data-src-mp3]');
        if (!node) {
            showMessage('no url inside dom element', 'red');
            return;
        }
        const url = node.getAttribute('data-src-mp3');
        navigator.clipboard.writeText(url.split('?')[0]).then(() => {
            showMessage('Succeed', 'green');
        }, (e) => {
            showMessage(e.toString(), 'red');
        });
    }
});
