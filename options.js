const textarea = document.getElementById("config");
const saveBtn = document.getElementById("save");

// Charger le JSON existant ou mettre une valeur par défaut
chrome.storage.sync.get(["tabConfig"], data => {
  if (!data.tabConfig) {
    const defaultConfig = {
      autoStartExtension: false,
      tabs: [
        { "url": "https://www.google.com/", "time": 5, "refresh": false },
        { "url": "https://www.wikipedia.org/", "time": 8, "refresh": true }
      ]
    };
    textarea.value = JSON.stringify(defaultConfig, null, 2);
    chrome.storage.sync.set({ tabConfig: JSON.stringify(defaultConfig) });
  } else {
    try {
      const parsed = JSON.parse(data.tabConfig);
      textarea.value = JSON.stringify(parsed, null, 2);
    } catch {
      textarea.value = data.tabConfig;
    }
  }
});

// Sauvegarder la config
saveBtn.addEventListener("click", () => {
  try {
    const parsed = JSON.parse(textarea.value);
    chrome.storage.sync.set({ tabConfig: JSON.stringify(parsed) }, () => {
      alert("Configuration saved !");
    });
  } catch {
    alert("Invalid JSON !");
  }
});
