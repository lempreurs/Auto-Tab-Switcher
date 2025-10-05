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
async function resetTabsAndOpen() {
  // 1️⃣ Open a blank tab to secure Chrome
  chrome.tabs.create({ url: "about:blank", active: true }, blankTab => {
    const blankTabId = blankTab.id;

    // 2️⃣ Close all other tabs except the blank tab
    chrome.tabs.query({}, tabs => {
      const tabsToClose = tabs
        .filter(t => t.id !== blankTabId)
        .map(t => t.id);

      if (tabsToClose.length) chrome.tabs.remove(tabsToClose);

      // 3️⃣ Open JSON tabs after a short delay
      setTimeout(async () => {
        config = await loadConfig();
        config.forEach(item => {
          chrome.tabs.create({ url: item.url, active: false });
        });

        // 4️⃣ Close the blank tab after JSON tabs are opened
        setTimeout(() => {
          chrome.tabs.remove(blankTabId);
          // Start rotation
          currentIndex = 0;
          switchTab();
        }, 500); // delay to ensure all tabs are created
      }, 200); // delay after closing old tabs
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
      "16": "icon16_active.png",
      "48": "icon48_active.png",
      "128": "icon128_active.png"
    }
  });
}

// Set inactive icons
function setInactiveIcon() {
  chrome.action.setIcon({
    path: {
      "16": "icon16.png",
      "48": "icon48.png",
      "128": "icon128.png"
    }
  });
}

// Toggle ON/OFF on icon click
chrome.action.onClicked.addListener(() => {
  isActive = !isActive;
  if (isActive) {
    console.log("Rotation enabled");
    resetTabsAndOpen(); // close existing tabs and open JSON tabs
    setActiveIcon();
  } else {
    console.log("Rotation disabled");
    stopRotation();
    setInactiveIcon();
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

// Also on extension reload
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.sync.get(["tabConfig"]);
  if (!data.tabConfig) return;

  try {
    const parsed = JSON.parse(data.tabConfig);
    const autoStart = parsed.autoStartExtension;
    if (autoStart) {
      isActive = true;
      setActiveIcon();
      resetTabsAndOpen();
    } else {
      setInactiveIcon();
    }
  } catch {
    setInactiveIcon();
    console.error("Invalid JSON on installation");
  }
});
