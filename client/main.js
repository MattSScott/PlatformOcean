const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let ssdpProcess;

function createWindow() {
  let mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true, // Only enable if you need it
      //   contextIsolation: false,
    },
  });

  // Load the React app's built files
  mainWindow.loadFile(path.join(__dirname, "build", "index.html"));
  //   mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  // Start SSDP tool (assuming it's a Node.js script)
  ssdpProcess = spawn("node", [path.join(__dirname, "./ssdp/main.js")], {
    stdio: "inherit",
    shell: true,
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (ssdpProcess) {
    ssdpProcess.kill();
  }
  app.quit();
});
