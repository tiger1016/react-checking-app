// Models
import BaseModel from '../baseModel'

export default class AddonsModel extends BaseModel {
  /**
   * [archiveAddon description]
   * @param  {Object} state          [description]
   * @param  {[type]} options.addons [description]
   * @return {[type]}                [description]
   */
  archiveAddon (state = {}, { addonId }) {
    const addons = state.addons.map(a => {
      if (Number(a.active_addon_id) === Number(addonId)) {
        a.archived = a.archived === '1' ? '0' : '1'
      }
      return a
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      addons
    }
  }

  /**
   * [createAddon description]
   * @param  {Object} state             [description]
   * @param  {[type]} options.newAddon  [description]
   * @param  {[type]} options.tempAddon [description]
   * @return {[type]}                   [description]
   */
  createAddon (state = {}, { addon, tempAddon }) {
    const addons = state.addons.map(a => {
      if (a.id === tempAddon.id) {
        addon.newAdded = true
        return addon
      }
      return a
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      addons
    }
  }

  /**
   * [newTempAddon description]
   * @param  {Object} state         [description]
   * @param  {[type]} options.addon [description]
   * @return {[type]}               [description]
   */
  newTempAddon (state = {}, { addon }) {
    const addons = [...state.addons]
    addons.unshift(addon)
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      addons
    }
  }

  /**
   * [removeTempAddons description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  removeTempAddons (state = {}) {
    const addons = state.addons.filter(a => !a.new)
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      addons
    }
  }

  /**
   * [removeTempAddons description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  removeAddon (state = {}, { addon }) {
    const addons = state.addons.filter(a => Number(a.id) !== Number(addon))
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      addons
    }
  }

  /**
   * [updateAddon description]
   * @param  {Object} state         [description]
   * @param  {[type]} options.addon [description]
   * @return {[type]}               [description]
   */
  updateAddon (state = {}, { addon, oldAddonId }) {
    const addons = [...state.addons]
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      addons: addons.map(a => {
        if (a.active_addon_id === oldAddonId) {
          return addon
        }
        return a
      })
    }
  }

  /**
   * Updates addons, turns of loading & loading message, and resets error
   * @param  {Object} state           Addons reducer state
   * @param  {Array}  options.addons  Addons action payload
   * @return {Object}                 Return new reducer state
   */
  updateAddons (state, { addons }) {
    const _addons = [...state.addons]
    addons.map(a => {
      const index = _addons.findIndex(_a => _a.id === a.id)
      if (index > -1) {
        _addons[index] = a
      } else {
        _addons.push(a)
      }
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      addons: _addons,
      error: null
    }
  }

  /**
   * [editAddon description]
   * @param  {Object} state         [description]
   * @param  {[type]} options.addon [description]
   * @return {[type]}               [description]
   */
  editAddon (state = {}, { addon }) {
    const addons = [...state.addons.map(a => {
      if (a.id === addon.id) { return addon }
      return a
    })]
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      addons
    }
  }
}

export const addonsModel = new AddonsModel()
