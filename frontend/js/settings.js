import { createSidebar } from "./sidebars.js";

let menuButton = document.getElementById("menu");

export async function getSettings() {
  return window.electronAPI.getSettings(true);
}

export async function setSetting(setting, value) {
  window.electronAPI.setSetting(setting, value, true);
}

export async function openSettingsSidebar() {
  let settings = await getSettings();

  let sidebar = createSidebar(
    "settings",
    `
        <h1><i class="fa-solid fa-gear"></i> Settings</h1>

        <h2><i class="fa-solid fa-magnifying-glass"></i> Search</h2>
        <label class="code" for="search-engine">Search engine</label>
        <select name="search-engine" id="searchEngine" class="urlbar">
          <option class="dropdown-option" value="https://google.com/search?q=%s">Select...</option>
          <option class="dropdown-option" value="https://google.com/search?q=%s" "https://google.com/search?q=%s">Google</option>
          <option class="dropdown-option" value="https://duckduckgo.com/?q=%s">DuckDuckGo</option>
        </select>

        <div class="label-with-warning">
          <p class="code">Custom search engine</label>
          <p class="warning">Will disregard engine above when set!</p>
        </div>
        <input type="text" class="urlbar" placeholder="Search URL (replace query with %s) | Enter to confirm" id="customEngine" style="margin-bottom: 10px !important;">

        <label class="code" for="homepage">Homepage</label>
        <input type="text" name="homepage" id="homepage" class="urlbar" placeholder="Homepage URL (precede with https://)">

        <h2><i class="fa-solid fa-lock"></i> Privacy & Data</h2>

        <div class="label-with-warning" style="margin-bottom: 20px !important">
          <div class="label-with-note">
            <label class="code">Clear data</label>
            <label class="settings-note">Clears cookies and history</label>
          </div>
          <button class="settings-button button-hdr" id="clearData">Clear</button>
        </div>

        <div class="label-with-warning">
          <div class="label-with-note">
            <label class="code" for="clearDataOnExit">Clear data on browser exit</label>
            <label class="settings-note" for="clearDataOnExit">Clears cookies and history</label>
          </div>
          <input type="checkbox" id="clearDataOnExit" name="clearDataOnExit" class="settings-checkbox">
        </div>

        <h2><i class="fa-solid fa-paintbrush"></i> Theme</h2>
        <p class="code">Theme settings are not yet implemented. Please use a client extension to change the browser theming until this is added.</p>

        <h2><i class="fa-solid fa-code"></i> Developer Options</h2>
        <p class="code" id="settingsJson">Click to reveal settings JSON...</p>
    `,
  );

  document.getElementById("settingsJson").addEventListener("click", () => {
    document.getElementById("settingsJson").innerText =
      JSON.stringify(settings);
  });

  const searchEngine = document.getElementById("searchEngine");
  searchEngine.addEventListener("change", () => {
    setSetting("searchEngine", searchEngine.value);
  });

  const customEngine = document.getElementById("customEngine");
  customEngine.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      setSetting("searchEngine", customEngine.value);
    }
  });

  const homepage = document.getElementById("homepage");
  homepage.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      setSetting("homepage", homepage.value);
    }
  });

  const clearDataOnExit = document.getElementById("clearDataOnExit");
  clearDataOnExit.checked = settings.clearDataOnExit || false;
  clearDataOnExit.addEventListener("change", () => {
    setSetting("clearDataOnExit", clearDataOnExit.checked);
  });

  const clearData = document.getElementById("clearData");
  clearData.addEventListener("click", () => {
    let clearDataListener = clearData.addEventListener("click", () => {
      window.electronAPI.clearData();
      clearData.innerText = "Clear";
      clearData.removeEventListener(clearDataListener);
    });
    clearData.innerText = "Are you sure?";
  });
}

export async function initSettingsSidebar() {
  menuButton.addEventListener("click", () => {
    openSettingsSidebar();
  });
}
