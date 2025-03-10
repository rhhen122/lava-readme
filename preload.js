const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setTitle: (title) => ipcRenderer.send("setTitle", title),
  quit: () => ipcRenderer.send("quit"),
  getVersion: () => ipcRenderer.invoke("getVersion"),
  getExtensions: (debug) => ipcRenderer.invoke("get-extensions", debug),
  getBookmarks: (debug) => ipcRenderer.invoke("get-bookmarks", debug),
  addBookmark: (debug) => ipcRenderer.invoke("add-bookmark", title, url, debug),
  getSettings: (debug) => ipcRenderer.invoke("get-settings", debug),
  setSetting: (setting, value, debug) =>
    ipcRenderer.invoke("set-setting", setting, value, debug),
  clearData: () => ipcRenderer.invoke("clear-data"),
  toggleBrowserDevTools: (debug) =>
    ipcRenderer.invoke("toggle-dev-tools", debug),
  reloadBrowser: (debug) => ipcRenderer.invoke("reload", debug),
  onInterceptedUrl: (callback) => ipcRenderer.on("intercepted-url", callback),
  onFullscreenChange: (callback) =>
    ipcRenderer.on("fullscreen-change", callback),
});
