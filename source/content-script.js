/* global chrome */

let clickedEl = null;

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
        const url = clickedEl.getAttribute('data-src-mp3');
        if (!url) {
            showMessage('no url inside dom element', 'red');
            return;
        }
        navigator.clipboard.writeText(url.split('?')[0]).then(() => {
            showMessage('Succeed', 'green');
        }, (e) => {
            showMessage(e.toString(), 'red');
        });
    }
});
