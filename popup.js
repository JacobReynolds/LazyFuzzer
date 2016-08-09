//Onload click handler, since CSP prevents onClick
window.addEventListener('load', function() {
        document.getElementById('replaceLinks').addEventListener('click', replaceLinks, false);
    }) //Run a command in the current tab

function executeCode(input) {
    chrome.tabs.executeScript({
        code: input
    });
}

//Replace all hyperlinks with their actual link
function replaceLinks() {
    executeCode('document.body.innerHTML = document.body.innerHTML.replace(/(<a href=")([^\\\'\\"]+)(\".*?>)([\\D\\d]*?)(<\\/a>)/g, \'$1$2$3$2$5\')')
}
