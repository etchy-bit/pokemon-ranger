import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openRoute: (file: string) => {
    ipcRenderer.send('route:open', [file]);
  },
  closeRoute: () => {
    ipcRenderer.send('route:close');
  },
  onRouteUpdate: (callback: (event: Electron.IpcRendererEvent, contents: string[]) => void) => {
    ipcRenderer.on('route:update', callback);
  }
});