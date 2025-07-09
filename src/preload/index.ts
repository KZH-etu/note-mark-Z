import { contextBridge } from 'electron'

if(!process.contextIsolated) {
  throw new Error('Context isolation is not enabled. Please enable it in your Electron app.')
}

try {
  contextBridge.exposeInMainWorld('context', {
    //TODO: Add your preload functions here
  })
} catch (error) {
  console.error('Failed to expose context:', error)
}