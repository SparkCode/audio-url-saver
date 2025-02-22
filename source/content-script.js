/* global chrome */

let clickedEl = null;

document.addEventListener('contextmenu', (event) => {
    clickedEl = event.target;
}, true);

const showMessage = (message, background) => {
    const messageElement = document.createElement('div');
    messageElement.style.cssText = `position:fixed;top:0;left:0;width:200px;height:100px;background-color:${background};z-index: 100000;`;
    messageElement.innerText = message;
    document.documentElement.appendChild(messageElement);

    console.log('messageElement', messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 5000);
};

chrome.runtime.onMessage.addListener((request) => {
    if (request === 'getClickedEl') {
        let url;
        if (window.location.hostname.includes('ldoceonline')) {
            const node = clickedEl.hasAttribute('data-src-mp3') 
                ? clickedEl 
                : clickedEl.querySelector('[data-src-mp3]');
            if (!node) {
                showMessage('No audio URL found', 'red');
                return;
            }
            url = node.getAttribute('data-src-mp3');
        } else if (window.location.hostname.includes('dictionary.cambridge')) {
            // Traverse up DOM until we find container with audio element
            let container = clickedEl.parentElement;
            while (container && !container.querySelector('audio')) {
                container = container.parentElement;
            }
            if (!container) {
                showMessage('No audio container found', 'red');
                return;
            }
            const audioElement = container.querySelector('audio');
            const source = audioElement.querySelector('source[type="audio/mpeg"]');
            const originalUrl = source?.getAttribute('src');
            if (!originalUrl) {
                showMessage('No MP3 source found', 'red');
                return;
            }
            url = originalUrl;
            if (url.startsWith('/')) {
                url = 'https://dictionary.cambridge.org' + url;
            }
        }
        const urlWithoutParams = url.includes('?') ? url.split('?')[0] : url;
        navigator.clipboard.writeText(urlWithoutParams).then(() => {
            showMessage('Succeed', 'green');
        }, (e) => {
            showMessage(e.toString(), 'red');
        });
    }
});
