import { GetNotes } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if(!process.contextIsolated) {
  throw new Error('Context isolation is not enabled. Please enable it in your Electron app.')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),
  })
} catch (error) {
  console.error('Failed to expose context:', error)
}