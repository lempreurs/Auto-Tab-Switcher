# Auto Tab Switcher

## English / Français

---

### **English**

**Auto Tab Switcher** is a Chrome extension that automatically rotates through a list of tabs based on a JSON configuration. You can define URLs, display time for each tab, and whether to refresh the tab when switching.

#### Features
- Automatically switch between tabs according to your JSON config.
- Control rotation ON/OFF via the extension icon.
- Refresh tabs when switching if desired.
- Auto-start feature when Chrome launches.
- Easily editable JSON configuration in the options page.

#### Installation

**Option 1 – Chrome Web Store (recommended)**  
Download the extension directly from the Chrome Web Store:  
👉 [Auto Tab Switcher – Chrome Web Store](https://chromewebstore.google.com/detail/auto-tab-switcher/honbgkddhgahbpgcihnmnbbodpbmacio)

**Option 2 – Manual installation (for developers)**  
1. Clone or download this repository.  
2. Open Chrome and navigate to `chrome://extensions/`.  
3. Enable **Developer mode**.  
4. Click **Load unpacked** and select the extension folder.  
5. Configure your tabs in the options page.  

#### JSON Configuration Example
```json
{
  "autoStartExtension": false,
  "tabs": [
    { "url": "https://www.google.com/", "time": 5, "refresh": false },
    { "url": "https://www.wikipedia.org/", "time": 8, "refresh": true }
  ]
}
```

---

### **Français**

**Auto Tab Switcher** est une extension Chrome qui fait défiler automatiquement une liste d'onglets en se basant sur une configuration JSON. Vous pouvez définir les URL, le temps d'affichage pour chaque onglet, et si l'onglet doit être actualisé lors du changement.

#### Fonctionnalités
- Changement automatique entre les onglets selon votre configuration JSON.
- Contrôle de la rotation ON/OFF via l'icône de l'extension.
- Actualisation des onglets lors du changement si souhaité.
- Fonction de démarrage automatique au lancement de Chrome.
- Configuration JSON facilement modifiable depuis la page des options.

#### Installation

**Option 1 – Chrome Web Store (recommended)**  
Téléchargez l’extension directement depuis le Chrome Web Store :  
👉 [Auto Tab Switcher – Chrome Web Store](https://chromewebstore.google.com/detail/auto-tab-switcher/honbgkddhgahbpgcihnmnbbodpbmacio)


**Option 2 – Installation manuelle (pour développeurs)**  
1. Clonez ou téléchargez ce dépôt.
2. Ouvrez Chrome et allez sur `chrome://extensions/`.
3. Activez le **Mode développeur**.
4. Cliquez sur **Charger l’extension non empaquetée** et sélectionnez le dossier de l’extension.
5. Configurez vos onglets dans la page des options.

#### Exemple de configuration JSON
```json
{
  "autoStartExtension": false,
  "tabs": [
    { "url": "https://www.google.com/", "time": 5, "refresh": false },
    { "url": "https://www.wikipedia.org/", "time": 8, "refresh": true }
  ]
}
```
