/*
  Session storage handler
 */

// Constants
import * as CONSTANTS from '../constants'

// Utils
import { logger } from '../../logger'
import { utility } from '../../utility'

export default class SessionStore {
  constructor () {
    this.engine = window.sessionStorage
  }

  /**
   * Remove all saved data from session store
   * @return {Void}
   */
  clear = () => {
    this.engine.clear()
  }

  /**
   * Deletes an item from session storage
   * @param  {Srting} key Item name in session storage
   * @return {Void}
   */
  deleteItem = (key) => {
    let processedKey
    try {
      processedKey = this.processKey(key)
      this.engine.removeItem(this.processKey(processedKey))
    } catch (err) {
      logger.dlog(`Error removing key '${processedKey}'' from session storage`, err)
    }
  }

  /**
   * Gets an item from session storage
   * @param  {String} key Item name in session storage
   * @return {Object}      Item in JSON
   */
  getItem = (key) => {
    let processedKey
    try {
      processedKey = this.processKey(key)
      return this.processGetItem(this.engine.getItem(processedKey))
    } catch (err) {
      logger.dlog(`Error getting '${processedKey}' from session storage`, err)
    }
    return undefined
  }

  /**
   * Process a fetched item from session storage
   * @param  {String} item Item to be processed
   * @return {Object}      Item in JSON
   */
  processGetItem (item) {
    try {
      return JSON.parse(item)
    } catch (err) {
      logger.dlog(`Error JSON parsing item on session storage GET`, item, err)
    }
    return undefined
  }

  /**
   * Process key before it gets used in session store
   * @param  {[Mixed} key Key to be processed to string with appropiate prefix
   * @return {String}     processed and prefeixed key
   */
  processKey (key) {
    if (utility.isAString(key)) {
      return CONSTANTS.SESSION_STORAGE_PREFIX + key
    }
    try {
      return CONSTANTS.SESSION_STORAGE_PREFIX + JSON.stringify(key)
    } catch (err) {
      logger.dlog(`Error JSON stringifying key in session storage`, JSON.stringify(key), err)
    }
    return undefined
  }

  /**
   * Processes an item before it is saved to session store (generally needs to be stringified)
   * @param  {Mixed} item Item to be processed and/or stringified
   * @return {String}     Stringified item
   */
  processSetItem (item) {
    try {
      return JSON.stringify(item)
    } catch (err) {
      logger.dlog(`Error JSON stringifying item on session storage SET`, item, err)
    }
    return undefined
  }

  /**
   * Saves an item to session storage
   * @param  {String} key   Key to save item to
   * @param  {Mixed}  value Value of item
   * @return {Void}
   */
  setItem = (key, value) => {
    let processedKey
    try {
      processedKey = this.processKey(key)
      this.engine.setItem(processedKey, this.processSetItem(value))
    } catch (err) {
      logger.dlog(`Error setting ${processedKey} with value ${value} in session storage`, err)
    }
  }
}
