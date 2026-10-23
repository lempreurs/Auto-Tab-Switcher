let config = [];
let currentIndex = 0;
let timer = null;
let isActive = false; // ON/OFF state

// Load JSON configuration
async function loadConfig() {
  return new Promise(resolve => {
    chrome.storage.sync.get(["tabConfig"], data => {
      try {
        const parsed = JSON.parse(data.tabConfig || "{}");
        resolve(parsed.tabs || []);
      } catch {
        resolve([]);
      }
    });
  });
}

// Close all other tabs and safely open JSON tabs
async function resetTabsAndOpen(keepTabId) {
  chrome.tabs.create({ url: "about:blank", active: true }, blankTab => {
    const blankTabId = blankTab.id;

    chrome.tabs.query({}, tabs => {
      const tabsToClose = tabs
        .filter(t => t.id !== blankTabId && t.id !== keepTabId)
        .map(t => t.id);
      if (tabsToClose.length) chrome.tabs.remove(tabsToClose);

      setTimeout(async () => {
        config = await loadConfig();
        config.forEach(item => {
          if (item.url) chrome.tabs.create({ url: item.url, active: false });
        });

        setTimeout(() => {
          chrome.tabs.remove(blankTabId);
          currentIndex = 0;
          switchTab();
        }, 500);
      }, 200);
    });
  });
}

// Start tab rotation
function startRotation() {
  if (!config.length) return;
  currentIndex = 0;
  switchTab();
}

// Switch between tabs
function switchTab() {
  if (!config.length || !isActive) return;

  chrome.tabs.query({}, tabs => {
    const cfg = config[currentIndex % config.length];
    const targetTab = tabs.find(t => t.url && t.url.startsWith(cfg.url));

    if (targetTab) {
      chrome.tabs.update(targetTab.id, { active: true }, tab => {
        if (cfg.refresh) chrome.tabs.reload(tab.id);
      });
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
      currentIndex = (currentIndex + 1) % config.length;
      switchTab();
    }, (cfg.time || 5) * 1000);
  });
}

// Stop tab rotation
function stopRotation() {
  clearTimeout(timer);
  timer = null;
}

// Set active icons
function setActiveIcon() {
  chrome.action.setIcon({
    path: {
      "16": "assets/icon16_active.png",
      "48": "assets/icon48_active.png",
      "128": "assets/icon128_active.png"
    }
  });
}

// Set inactive icons
function setInactiveIcon() {
  chrome.action.setIcon({
    path: {
      "16": "assets/icon16.png",
      "48": "assets/icon48.png",
      "128": "assets/icon128.png"
    }
  });
}

// Toggle ON/OFF on icon click
chrome.action.onClicked.addListener(() => {
  isActive = !isActive;
  if (isActive) {
    console.log("Rotation enabled");
    resetTabsAndOpen();
    setActiveIcon();
  } else {
    console.log("Rotation disabled");
    stopRotation();
    setInactiveIcon();
  }
});

// Messages from the options page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.action) return;

  if (message.action === "start") {
    isActive = true;
    setActiveIcon();
    sendResponse({ active: true });
    const keepTabId = sender.tab ? sender.tab.id : null;
    setTimeout(() => resetTabsAndOpen(keepTabId), 100);
  } else if (message.action === "stop") {
    isActive = false;
    stopRotation();
    setInactiveIcon();
    sendResponse({ active: false });
  } else if (message.action === "getState") {
    sendResponse({ active: isActive });
  }
});

// Listen for JSON changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.tabConfig && isActive) {
    console.log("New configuration loaded!");
    clearTimeout(timer);
    currentIndex = 0;
    startRotation();
  }
});

// Auto-start if autoStartExtension = true
chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.sync.get(["tabConfig"]);
  if (!data.tabConfig) return;

  try {
    const parsed = JSON.parse(data.tabConfig);
    const autoStart = parsed.autoStartExtension;
    if (autoStart) {
      console.log("Extension auto-start enabled");
      isActive = true;
      setActiveIcon();
      resetTabsAndOpen();
    } else {
      setInactiveIcon();
    }
  } catch {
    console.error("Invalid JSON at startup");
  }
});

// On installation or reload
chrome.runtime.onInstalled.addListener(async () => {
  let data = await chrome.storage.sync.get(["tabConfig"]);
  if (!data.tabConfig) {
    const defaultConfig = {
      autoStartExtension: false,
      tabs: [
        { url: "https://www.google.com", time: 5, refresh: false }
      ]
    };
    await chrome.storage.sync.set({ tabConfig: JSON.stringify(defaultConfig) });
    console.log("Default configuration created");
    data = { tabConfig: JSON.stringify(defaultConfig) };

    // Optional: open options page on first install
    chrome.runtime.openOptionsPage();
  }

  try {
    const parsed = JSON.parse(data.tabConfig);
    const autoStart = parsed.autoStartExtension;

    if (autoStart) {
      console.log("Auto-start enabled");
      isActive = true;
      setActiveIcon();
      resetTabsAndOpen();
    } else {
      console.log("Auto-start disabled");
      setInactiveIcon();
    }
  } catch (e) {
    console.error("Error loading configuration:", e);
    setInactiveIcon();
  }
});
