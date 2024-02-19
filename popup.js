// Content script (content.js)
(function() {
    // Get the name of the company from the page
    const companyName = document.querySelector('.company-name').innerText;

    // Send message to background script with company name
    chrome.runtime.sendMessage({companyName: companyName});
})();

// Background script (background.js)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Make a request to WarnTracker API
    fetch(`https://api.warntracker.com/companies/${message.companyName}`)
        .then(response => response.json())
        .then(data => {
            // Send data to popup script
            chrome.runtime.sendMessage({data: data});
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle the error gracefully in your extension
        });
});

// Popup script (popup.js)
document.addEventListener('DOMContentLoaded', function () {
    // Get the layoff list container
    const layoffListContainer = document.getElementById('layoff-list');

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.data) {
            // Display the information from WarnTracker
            console.log(message.data);
            // You can update the extension UI with the retrieved data
        }
    });
});
