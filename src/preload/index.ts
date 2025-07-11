import { contextBridge } from 'electron'

if(!process.contextIsolated) {
  throw new Error('Context isolation is not enabled. Please enable it in your Electron app.')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language
  })
} catch (error) {
  console.error('Failed to expose context:', error)
}