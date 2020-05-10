export default class BaseController {
  /**
   * Returns saved state
   * @return {Object} Hydrated state
   */
  static getState () {
    return this.constructor.state
  }

  /**
   * Saves updated stored state
   * (Used to update controllers reference to the store
   * on hydrateContronller middleware)
   * @param  {Object} state Store state
   * @return {Void}
   */
  static updateState (state = {}) {
    this.constructor.state = state
  }

  /**
   * Returns class
   * @return {Object} BaseController
   */
  baseController () {
    return BaseController
  }

  /**
   * [prepareFunctions description]
   * @param  {Object} functions [description]
   * @return {[type]}           [description]
   */
  prepareFunctions (functions = {}) {
    for (var functionName in functions) {
      if (!Object.prototype.hasOwnProperty.call(functions, functionName)) continue
      this[functionName] = functions[functionName].bind(this)
    }
  }

  /**
   * Saves a function as an instance property
   * @param  {String}   name  name of function to be stored
   * @param  {Function} func  Function to be stored
   * @return {Bool}           True if success, false otherwise
   */
  registerFunction (name = null, func = null) {
    if (name && typeof func === 'function') {
      this[name] = func
      return true
    }
    return false
  }

  /**
   * (tl;dr a setter) Saves a value as an instance property
   * @param  {String} name     Name of property to be saved
   * @param  {Mixed} property  Value of property to be saved
   * @return {Bool}            True if success, false if otherwise
   */
  registerProperty (name = null, property = null) {
    if (name && property) {
      this[name] = property
      return true
    }
    return false
  }

  /**
   * Returns current state
   * @return {Object} Store state
   */
  state () {
    return BaseController.getState()
  }
}
