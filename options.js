const autoStartCheckbox = document.getElementById("autoStart");
const tabsContainer = document.getElementById("tabs-container");
const newTabUrl = document.getElementById("newTabUrl");
const newTabTime = document.getElementById("newTabTime");
const newTabRefresh = document.getElementById("newTabRefresh");
const addTabBtn = document.getElementById("addTabBtn");
const saveConfigBtn = document.getElementById("saveConfig");
const startConfigBtn = document.getElementById("startConfig");
const statusMsg = document.getElementById("statusMsg");
const configTextarea = document.getElementById("config");
const applyJsonBtn = document.getElementById("applyJson");
const jsonStatus = document.getElementById("jsonStatus");
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");
const langCurrent = document.getElementById("langCurrent");
const langFlagUse = document.getElementById("langFlagUse");
const langOptions = document.querySelectorAll(".lang-option");

const DEFAULT_CONFIG = {
  autoStartExtension: false,
  tabs: [
    { url: "https://www.google.com/", time: 5, refresh: false },
    { url: "https://www.wikipedia.org/", time: 8, refresh: true }
  ]
};

const TRANSLATIONS = {
  fr: {
    optionsTitle: "Auto Tab Switcher - Options",
    tabGraphical: "Graphique",
    tabJson: "JSON",
    autoStartLabel: "Démarrer automatiquement l'extension",
    fieldHelpTitle: "Explication des champs",
    helpAutoStartLabel: "Démarrer automatiquement",
    helpAutoStartText: "lance la rotation dès l'ouverture de Chrome.",
    helpUrlLabel: "URL du site",
    helpUrlText: "adresse complète de la page à afficher.",
    helpTimeLabel: "Durée (s)",
    helpTimeText: "nombre de secondes d'affichage avant de passer au site suivant.",
    helpRefreshLabel: "Actualiser",
    helpRefreshText: "recharge la page chaque fois qu'elle redevient active.",
    sitesTitle: "Sites configurés",
    emptyState: "Aucun site configuré pour le moment.",
    addSiteTitle: "Ajouter un site",
    labelUrl: "URL du site",
    labelTime: "Durée (s)",
    labelRefresh: "Actualiser",
    addBtn: "Ajouter",
    placeholderUrl: "https://www.exemple.com/",
    jsonTitle: "Configuration JSON",
    jsonHelpIntro: "Chaque entrée du tableau tabs accepte les propriétés suivantes, avec une valeur d'exemple :",
    jsonUrlDesc: "adresse du site",
    jsonTimeDesc: "durée d'affichage en secondes",
    jsonRefreshDesc: "recharger l'onglet lors du changement",
    jsonAutoStartDesc: "démarrage automatique au lancement de Chrome",
    applyJsonBtn: "Appliquer le JSON",
    saveBtn: "Enregistrer",
    startBtn: "Démarrer",
    saved: "Enregistré !",
    started: "Extension démarrée !",
    startFailed: "Impossible de démarrer l'extension.",
    chromeStoreLink: "Chrome Web Store",
    jsonApplied: "JSON appliqué.",
    invalidJson: "JSON invalide : {message}",
    requiredFields: "URL et durée valides requises.",
    removeTitle: "Supprimer ce site",
    dragHandleTitle: "Glisser pour réorganiser",
    refreshWord: "Actualiser",
    jsonObjectExpected: "Objet JSON attendu.",
    jsonTabsArray: "La propriété « tabs » doit être un tableau.",
    jsonInvalidUrl: "Onglet {index} : URL invalide.",
    jsonInvalidTime: "Onglet {index} : durée invalide."
  },
  en: {
    optionsTitle: "Auto Tab Switcher - Options",
    tabGraphical: "Graphical",
    tabJson: "JSON",
    autoStartLabel: "Start the extension automatically",
    fieldHelpTitle: "Field explanations",
    helpAutoStartLabel: "Start automatically",
    helpAutoStartText: "starts rotation as soon as Chrome opens.",
    helpUrlLabel: "Site URL",
    helpUrlText: "full address of the page to display.",
    helpTimeLabel: "Duration (s)",
    helpTimeText: "number of seconds to display before switching to the next site.",
    helpRefreshLabel: "Refresh",
    helpRefreshText: "reloads the page each time it becomes active again.",
    sitesTitle: "Configured sites",
    emptyState: "No sites configured yet.",
    addSiteTitle: "Add a site",
    labelUrl: "Site URL",
    labelTime: "Duration (s)",
    labelRefresh: "Refresh",
    addBtn: "Add",
    placeholderUrl: "https://www.example.com/",
    jsonTitle: "JSON configuration",
    jsonHelpIntro: "Each entry in the tabs array accepts the following properties, with an example value:",
    jsonUrlDesc: "site address",
    jsonTimeDesc: "display duration in seconds",
    jsonRefreshDesc: "reload the tab when switching",
    jsonAutoStartDesc: "automatic start when Chrome launches",
    applyJsonBtn: "Apply JSON",
    saveBtn: "Save",
    startBtn: "Start",
    saved: "Saved!",
    started: "Extension started!",
    startFailed: "Unable to start the extension.",
    chromeStoreLink: "Chrome Web Store",
    jsonApplied: "JSON applied.",
    invalidJson: "Invalid JSON: {message}",
    requiredFields: "Valid URL and duration required.",
    removeTitle: "Remove this site",
    dragHandleTitle: "Drag to reorder",
    refreshWord: "Refresh",
    jsonObjectExpected: "JSON object expected.",
    jsonTabsArray: "The \"tabs\" property must be an array.",
    jsonInvalidUrl: "Tab {index}: invalid URL.",
    jsonInvalidTime: "Tab {index}: invalid duration."
  },
  es: {
    optionsTitle: "Auto Tab Switcher - Opciones",
    tabGraphical: "Gráfico",
    tabJson: "JSON",
    autoStartLabel: "Iniciar la extensión automáticamente",
    fieldHelpTitle: "Explicación de los campos",
    helpAutoStartLabel: "Iniciar automáticamente",
    helpAutoStartText: "inicia la rotación en cuanto se abre Chrome.",
    helpUrlLabel: "URL del sitio",
    helpUrlText: "dirección completa de la página que se mostrará.",
    helpTimeLabel: "Duración (s)",
    helpTimeText: "número de segundos que se muestra antes de pasar al siguiente sitio.",
    helpRefreshLabel: "Actualizar",
    helpRefreshText: "recarga la página cada vez que vuelve a estar activa.",
    sitesTitle: "Sitios configurados",
    emptyState: "Aún no hay sitios configurados.",
    addSiteTitle: "Añadir un sitio",
    labelUrl: "URL del sitio",
    labelTime: "Duración (s)",
    labelRefresh: "Actualizar",
    addBtn: "Añadir",
    placeholderUrl: "https://www.ejemplo.com/",
    jsonTitle: "Configuración JSON",
    jsonHelpIntro: "Cada entrada del arreglo tabs acepta las siguientes propiedades, con un valor de ejemplo:",
    jsonUrlDesc: "dirección del sitio",
    jsonTimeDesc: "duración de visualización en segundos",
    jsonRefreshDesc: "recargar la pestaña al cambiar",
    jsonAutoStartDesc: "inicio automático al abrir Chrome",
    applyJsonBtn: "Aplicar JSON",
    saveBtn: "Guardar",
    startBtn: "Iniciar",
    saved: "¡Guardado!",
    started: "¡Extensión iniciada!",
    startFailed: "No se pudo iniciar la extensión.",
    chromeStoreLink: "Chrome Web Store",
    jsonApplied: "JSON aplicado.",
    invalidJson: "JSON no válido: {message}",
    requiredFields: "Se requieren una URL y una duración válidas.",
    removeTitle: "Eliminar este sitio",
    dragHandleTitle: "Arrastrar para reordenar",
    refreshWord: "Actualizar",
    jsonObjectExpected: "Se esperaba un objeto JSON.",
    jsonTabsArray: "La propiedad \"tabs\" debe ser un arreglo.",
    jsonInvalidUrl: "Pestaña {index}: URL no válida.",
    jsonInvalidTime: "Pestaña {index}: duración no válida."
  },
  zh: {
    optionsTitle: "自动标签切换器 - 选项",
    tabGraphical: "图形界面",
    tabJson: "JSON",
    autoStartLabel: "自动启动扩展程序",
    fieldHelpTitle: "字段说明",
    helpAutoStartLabel: "自动启动",
    helpAutoStartText: "打开 Chrome 后立即开始轮换。",
    helpUrlLabel: "网站地址",
    helpUrlText: "要显示的页面的完整地址。",
    helpTimeLabel: "时长（秒）",
    helpTimeText: "切换到下一个网站前显示的秒数。",
    helpRefreshLabel: "刷新",
    helpRefreshText: "每次重新激活时刷新页面。",
    sitesTitle: "已配置的网站",
    emptyState: "尚未配置任何网站。",
    addSiteTitle: "添加网站",
    labelUrl: "网站地址",
    labelTime: "时长（秒）",
    labelRefresh: "刷新",
    addBtn: "添加",
    placeholderUrl: "https://www.example.com/",
    jsonTitle: "JSON 配置",
    jsonHelpIntro: "tabs 数组中的每一项接受以下属性，并附示例值：",
    jsonUrlDesc: "网站地址",
    jsonTimeDesc: "显示时长（秒）",
    jsonRefreshDesc: "切换时刷新标签页",
    jsonAutoStartDesc: "启动 Chrome 时自动开始",
    applyJsonBtn: "应用 JSON",
    saveBtn: "保存",
    startBtn: "启动",
    saved: "已保存！",
    started: "扩展已启动！",
    startFailed: "无法启动扩展。",
    chromeStoreLink: "Chrome 应用商店",
    jsonApplied: "JSON 已应用。",
    invalidJson: "JSON 无效：{message}",
    requiredFields: "需要有效的网址和时长。",
    removeTitle: "删除此网站",
    dragHandleTitle: "拖动以重新排序",
    refreshWord: "刷新",
    jsonObjectExpected: "需要 JSON 对象。",
    jsonTabsArray: "属性“tabs”必须是数组。",
    jsonInvalidUrl: "标签页 {index}：网址无效。",
    jsonInvalidTime: "标签页 {index}：时长无效。"
  }
};

let currentLang = "fr";
let currentTabs = [];
let dragIndex = null;

function t(key, vars) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.fr;
  let str = dict[key];
  if (str === undefined) str = TRANSLATIONS.fr[key];
  if (str === undefined) str = key;
  if (vars) {
    Object.keys(vars).forEach((name) => {
      str = str.replace("{" + name + "}", vars[name]);
    });
  }
  return str;
}

const LANGUAGE_LABELS = { fr: "FR", en: "EN", es: "ES", zh: "中文" };

const HEADER_TRANSLATIONS = {
  fr: { headerUrl: "URL", headerTime: "Durée (s)", headerRefresh: "Actualiser" },
  en: { headerUrl: "URL", headerTime: "Duration (s)", headerRefresh: "Refresh" },
  es: { headerUrl: "URL", headerTime: "Duración (s)", headerRefresh: "Actualizar" },
  zh: { headerUrl: "URL", headerTime: "时长（秒）", headerRefresh: "刷新" }
};

function updateLanguageUI() {
  langCurrent.textContent = LANGUAGE_LABELS[currentLang] || currentLang.toUpperCase();
  langFlagUse.setAttribute("href", "#flag-" + currentLang);
  langOptions.forEach((opt) => {
    const active = opt.dataset.lang === currentLang;
    opt.classList.toggle("active", active);
    opt.setAttribute("aria-selected", String(active));
  });
}

function closeLangMenu() {
  langMenu.classList.remove("open");
  langToggle.setAttribute("aria-expanded", "false");
}

function applyTranslations() {
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : currentLang;
  document.title = t("optionsTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder));
  });

  const h = HEADER_TRANSLATIONS[currentLang] || HEADER_TRANSLATIONS.fr;
  document.querySelectorAll(".tab-list-header [data-i18n='headerUrl']").forEach((el) => (el.textContent = h.headerUrl));
  document.querySelectorAll(".tab-list-header [data-i18n='headerTime']").forEach((el) => (el.textContent = h.headerTime));
  document.querySelectorAll(".tab-list-header [data-i18n='headerRefresh']").forEach((el) => (el.textContent = h.headerRefresh));
}

function showStatus(el, message, isError) {
  el.style.color = isError ? "#e04b4b" : "#1a4dab";
  el.innerText = message;
}

function clearStatusSoon(el) {
  setTimeout(() => (el.innerText = ""), 2500);
}

function renderTabs(tabs) {
  tabsContainer.innerHTML = "";

  if (!tabs || tabs.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = t("emptyState");
    tabsContainer.appendChild(empty);
    return;
  }

  tabs.forEach((tab, index) => {
    const div = document.createElement("div");
    div.className = "tab-item";
    div.draggable = false;

    const dragHandle = document.createElement("span");
    dragHandle.className = "drag-handle";
    dragHandle.title = t("dragHandleTitle");
    dragHandle.textContent = "⠿";
    dragHandle.addEventListener("mousedown", () => {
      div.draggable = true;
    });
    dragHandle.addEventListener("mouseup", () => {
      div.draggable = false;
    });

    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.value = tab.url;
    urlInput.placeholder = t("placeholderUrl");

    const timeInput = document.createElement("input");
    timeInput.type = "number";
    timeInput.min = "1";
    timeInput.value = tab.time;

    const refreshWrap = document.createElement("label");
    refreshWrap.className = "switch refresh-wrap";
    const refreshInput = document.createElement("input");
    refreshInput.type = "checkbox";
    refreshInput.checked = !!tab.refresh;
    const refreshTrack = document.createElement("span");
    refreshTrack.className = "switch-track";
    refreshWrap.appendChild(refreshInput);
    refreshWrap.appendChild(refreshTrack);

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.title = t("removeTitle");
    removeBtn.textContent = "✕";

    div.appendChild(dragHandle);
    div.appendChild(urlInput);
    div.appendChild(timeInput);
    div.appendChild(refreshWrap);
    div.appendChild(removeBtn);
    tabsContainer.appendChild(div);

    const syncRow = () => {
      currentTabs[index] = {
        url: urlInput.value.trim(),
        time: parseInt(timeInput.value, 10) || 1,
        refresh: refreshInput.checked
      };
      syncJsonFromState();
    };
    urlInput.addEventListener("input", syncRow);
    timeInput.addEventListener("input", syncRow);
    refreshInput.addEventListener("change", syncRow);

    removeBtn.addEventListener("click", () => {
      currentTabs.splice(index, 1);
      renderTabs(currentTabs);
      syncJsonFromState();
    });

    div.addEventListener("dragstart", (e) => {
      dragIndex = index;
      div.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(index));
    });

    div.addEventListener("dragend", () => {
      dragIndex = null;
      div.draggable = false;
      div.classList.remove("dragging");
      tabsContainer.querySelectorAll(".tab-item").forEach((el) => {
        el.classList.remove("drag-over");
      });
    });

    div.addEventListener("dragover", (e) => {
      if (dragIndex === null) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      div.classList.add("drag-over");
    });

    div.addEventListener("dragleave", () => {
      div.classList.remove("drag-over");
    });

    div.addEventListener("drop", (e) => {
      e.preventDefault();
      div.classList.remove("drag-over");
      const from = dragIndex;
      dragIndex = null;
      if (from === null || from === index) return;
      const [moved] = currentTabs.splice(from, 1);
      currentTabs.splice(index, 0, moved);
      renderTabs(currentTabs);
      syncJsonFromState();
    });
  });
}

function getStateConfig() {
  return {
    autoStartExtension: autoStartCheckbox.checked,
    tabs: currentTabs.map((tab) => ({
      url: tab.url,
      time: tab.time,
      refresh: !!tab.refresh
    }))
  };
}

function syncJsonFromState() {
  configTextarea.value = JSON.stringify(getStateConfig(), null, 2);
}

function parseJsonConfig(text) {
  const parsed = JSON.parse(text);
  if (!parsed || typeof parsed !== "object") {
    throw new Error(t("jsonObjectExpected"));
  }
  if (!Array.isArray(parsed.tabs)) {
    throw new Error(t("jsonTabsArray"));
  }

  const tabs = parsed.tabs.map((tab, index) => {
    if (!tab || typeof tab.url !== "string" || !tab.url.trim()) {
      throw new Error(t("jsonInvalidUrl", { index: index + 1 }));
    }
    const time = parseInt(tab.time, 10);
    if (isNaN(time) || time < 1) {
      throw new Error(t("jsonInvalidTime", { index: index + 1 }));
    }
    return { url: tab.url.trim(), time, refresh: !!tab.refresh };
  });

  return { autoStartExtension: !!parsed.autoStartExtension, tabs };
}

function applyJsonToState(config) {
  currentTabs = config.tabs;
  autoStartCheckbox.checked = config.autoStartExtension;
  renderTabs(currentTabs);
  syncJsonFromState();
}

function saveConfig(onSaved) {
  let config = getStateConfig();
  const text = configTextarea.value.trim();

  if (text) {
    try {
      config = parseJsonConfig(text);
      currentTabs = config.tabs;
      autoStartCheckbox.checked = config.autoStartExtension;
      renderTabs(currentTabs);
    } catch (e) {
      showStatus(statusMsg, t("invalidJson", { message: e.message }), true);
      clearStatusSoon(statusMsg);
      if (onSaved) onSaved(false);
      return;
    }
  }

  chrome.storage.sync.set({ tabConfig: JSON.stringify(config) }, () => {
    syncJsonFromState();
    if (onSaved) {
      onSaved(true);
    } else {
      showStatus(statusMsg, t("saved"), false);
      clearStatusSoon(statusMsg);
    }
  });
}

chrome.storage.sync.get(["tabConfig", "language"], (data) => {
  currentLang = data.language || "fr";
  updateLanguageUI();
  applyTranslations();

  let config = DEFAULT_CONFIG;
  if (data.tabConfig) {
    try {
      config = JSON.parse(data.tabConfig);
    } catch (e) {
      console.error("Erreur de parsing de la configuration", e);
    }
  } else {
    chrome.storage.sync.set({ tabConfig: JSON.stringify(DEFAULT_CONFIG) });
  }

  currentTabs = Array.isArray(config.tabs) ? config.tabs.slice() : [];
  autoStartCheckbox.checked = !!config.autoStartExtension;
  renderTabs(currentTabs);
  syncJsonFromState();
});

addTabBtn.addEventListener("click", () => {
  const url = newTabUrl.value.trim();
  const time = parseInt(newTabTime.value, 10);

  if (!url || isNaN(time) || time < 1) {
    showStatus(statusMsg, t("requiredFields"), true);
    clearStatusSoon(statusMsg);
    return;
  }

  currentTabs.push({ url, time, refresh: newTabRefresh.checked });
  renderTabs(currentTabs);
  syncJsonFromState();

  newTabUrl.value = "";
  newTabTime.value = "5";
  newTabRefresh.checked = false;
  newTabUrl.focus();
});

applyJsonBtn.addEventListener("click", () => {
  try {
    const config = parseJsonConfig(configTextarea.value);
    applyJsonToState(config);
    showStatus(jsonStatus, t("jsonApplied"), false);
    clearStatusSoon(jsonStatus);
  } catch (e) {
    showStatus(jsonStatus, t("invalidJson", { message: e.message }), true);
    clearStatusSoon(jsonStatus);
  }
});

autoStartCheckbox.addEventListener("change", syncJsonFromState);
saveConfigBtn.addEventListener("click", () => saveConfig());

function sendStartMessage(retriesLeft) {
  chrome.runtime.sendMessage({ action: "start" }, (response) => {
    const error = chrome.runtime.lastError;
    if (error) {
      console.error("Start message failed:", error.message);
    }

    const failed = error || !response || !response.active;
    if (failed && retriesLeft > 0) {
      setTimeout(() => sendStartMessage(retriesLeft - 1), 300);
      return;
    }

    showStatus(statusMsg, failed ? t("startFailed") : t("started"), failed);
    clearStatusSoon(statusMsg);
  });
}

startConfigBtn.addEventListener("click", () => {
  saveConfig((ok) => {
    if (!ok) return;
    sendStartMessage(2);
  });
});

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = langMenu.classList.toggle("open");
  langToggle.setAttribute("aria-expanded", String(isOpen));
});

langOptions.forEach((opt) => {
  opt.addEventListener("click", () => {
    const lang = opt.dataset.lang;
    if (lang !== currentLang) {
      currentLang = lang;
      chrome.storage.sync.set({ language: currentLang });
      updateLanguageUI();
      applyTranslations();
      renderTabs(currentTabs);
      syncJsonFromState();
    }
    closeLangMenu();
  });
});

document.addEventListener("click", (e) => {
  if (!langMenu.contains(e.target) && !langToggle.contains(e.target)) {
    closeLangMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLangMenu();
});

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle("active", active);
      b.setAttribute("aria-selected", String(active));
    });
    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === "panel-" + btn.dataset.tab);
    });
  });
});
