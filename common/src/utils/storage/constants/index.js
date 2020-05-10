/*
  Storage
*/
const storageName = 'petcheck'
const separator = ':'
const storagePrefix = storageName + separator

/*
  Session storage
*/
const sessionName = 'session'
const sessionStoragePrefix = storagePrefix + sessionName + separator
export const SESSION_STORAGE_PREFIX = sessionStoragePrefix

/*
  Local storage
*/
const persistentStorageName = 'storage'
const persistentStoragePrefix = storagePrefix + persistentStorageName + separator
export const PERSISTENT_STORAGE_PREFIX = persistentStoragePrefix
