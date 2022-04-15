/* global chrome */

const addContextMenuOption = () => {
    const showForPages = ['https://www.ldoceonline.com/*'];

    chrome.contextMenus.create({
        title: 'copy audio url', id: 'parent', contexts: ['all'], documentUrlPatterns: showForPages,
    });

    // The onClicked callback function.
    function onClickHandler(info, tab) {
        chrome.tabs.sendMessage(tab.id, 'getClickedEl', { frameId: info.frameId });
    }

    chrome.contextMenus.onClicked.addListener(onClickHandler);
};

chrome.runtime.onStartup.addListener(addContextMenuOption);

chrome.runtime.onInstalled.addListener(addContextMenuOption);
