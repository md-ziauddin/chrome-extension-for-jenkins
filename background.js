// Background script to store and retrieve branch name
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sendBranchName") {
    chrome.storage.local.set({ branchName: request.branchName }, function () {
      // Notify content script to add the button
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "addOpenJenkinsButton" });
      });
    });
  } else if (request.action === "getBranchName") {
    chrome.storage.local.get(["branchName"], function (result) {
      sendResponse({ branchName: result.branchName });
    });
    return true; // Indicates that sendResponse will be called asynchronously
  }
});
