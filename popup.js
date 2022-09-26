const button = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  button.style.backgroundColor = color;
});

button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // This will inject the script in the current tab.
  // After that, the script will have access to the DOM document and then we will be able to change the background color
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

// Ran in the context of the current tab
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
