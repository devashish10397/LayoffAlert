// Content script (content.js)
(function() {
    const companyName = document.querySelector('.company-name').innerText;
    chrome.runtime.sendMessage({companyName: companyName});
})();

// Background script (background.js)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    fetch(`https://api.warntracker.com/companies/${message.companyName}`)
        .then(response => response.json())
        .then(data => {
            // Send data to popup script
            chrome.runtime.sendMessage({data: data});
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Popup script (popup.js)
document.addEventListener('DOMContentLoaded', function () {
    const layoffListContainer = document.getElementById('layoff-list');
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.data) {
            console.log(message.data);
        }
    });
});
