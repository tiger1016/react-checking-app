// Models
import BaseModel from '../baseModel'

export default class WalkersModel extends BaseModel {
  /**
   * Updates walkers, turns of loading & loading message, and resets error
   * @param  {Object} state             Walkers reducer state
   * @param  {Array}  options.walkers   Walkers action payload
   * @return {Object}                   Return new reducer state
   */
  updateWalkers = (state, { walkers }) => {
    const _walkers = [...state.walkers]
    walkers.forEach(item => {
      const index = _walkers.findIndex(w => Number(w.user_id) === Number(item.user_id))
      if (index > -1) {
        _walkers[index] = item
      } else {
        _walkers.unshift(item)
      }
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      walkers: _walkers,
      error: null
    }
  }

  fetchWalkerProfile = (state, { walkerProfile }) => {
    const _updatewalker = state.walkers.map(item => {
      if (item.user_id.toString() === walkerProfile.user_id.toString()) {
        return walkerProfile
      }
      return item
    })
    return this.updateWalkers(state, { walkers: _updatewalker })
  }

  fetchWalkerPayroll = (state, { walkerPayroll, walkerId }) => {
    let _updatewalker = [...state.walkers]
    if (walkerId) {
      _updatewalker = _updatewalker.map(item => {
        if (item.user_id.toString() === walkerId.toString()) {
          item.payrolls = walkerPayroll.payrolls
        }
        return item
      })
    }
    return this.updateWalkers(state, { walkers: _updatewalker })
  }

  fetchWalkerPayrate = (state, { walkerPayrate, walkerId }) => {
    let _updatewalker = [...state.walkers]
    if (walkerId) {
      _updatewalker = _updatewalker.map(item => {
        if (item.user_id.toString() === walkerId.toString()) {
          item.payrates = walkerPayrate.payrates
        }
        return item
      })
    }
    return this.updateWalkers(state, { walkers: _updatewalker })
  }

  editWalkerProfile = (state, { walkerProfile }) => {
    let _updatewalker = [...state.walkers]
    if (!walkerProfile.error) {
      _updatewalker = _updatewalker.map(item => {
        if (item.user_id.toString() === walkerProfile.walker.user_id.toString()) {
          return { ...walkerProfile.walker, ...walkerProfile.user }
        }
        return item
      })
    }
    return this.updateWalkers(state, { walkers: _updatewalker })
  }

  addWalker = (state, { newWalker }) => {
    const _walkers = [...state.walkers]
    if (newWalker && newWalker.message === 'Walker added successfully') {
      _walkers.unshift({ ...newWalker.walker, ...newWalker.user })
    }
    return this.updateWalkers(state, { walkers: _walkers })
  }

  editWalkerPayrate = (state, { walkerPayrate, payrateType, walkerId }) => {
    let _updatewalker = [...state.walkers]
    if (!walkerPayrate.error) {
      const payrateId = payrateType === 'services' ? Object.keys(walkerPayrate.payrates)[0] : Object.keys(walkerPayrate.addons)[0]
      const payrateValue = payrateType === 'services' ? walkerPayrate.payrates[payrateId] : walkerPayrate.addons[payrateId]
      _updatewalker = _updatewalker.map(walker => {
        if (walker.user_id.toString() === walkerId.toString()) {
          if (payrateType === 'services') {
            if (!walker.payrates.services.find(service => service.billing_price_group_id.toString() === payrateValue.billing_price_group_id.toString())) {
              walker.payrates.services = [...walker.payrates.services, payrateValue]
            } else {
              walker.payrates.services = walker.payrates.services.map(service => {
                if (service.billing_price_group_id.toString() === payrateValue.billing_price_group_id.toString()) {
                  return payrateValue
                }
                return service
              })
            }
          } else {
            if (!walker.payrates.addons_walker.find(addon => addon.addon_id.toString() === payrateValue.addon_id.toString())) {
              walker.payrates.addons_walker = [...walker.payrates.addons_walker, payrateValue]
            } else {
              walker.payrates.addons_walker = walker.payrates.addons_walker.map(addon => {
                if (addon.addon_id.toString() === payrateValue.addon_id.toString()) {
                  return payrateValue
                }
                return addon
              })
            }
          }
        }
        return walker
      })
    }
    return this.updateWalkers(state, { walkers: _updatewalker })
  }

  toggleWalkerStatus = (state, { walker, walkerId }) => {
    let _updatewalker = [...state.walkers]
    if (!walker.error) {
      _updatewalker = _updatewalker.map(item => {
        if (item.user_id.toString() === walkerId.toString()) {
          if (item.active === 1) {
            item.active = 0
          } else {
            item.active = 1
          }
        }
        return item
      })
    }
    return this.updateWalkers(state, { walkers: _updatewalker })
  }

  updateProfileEditMode = (state = {}, { isEditMode }) => ({
    ...state,
    isProfileEditing: isEditMode
  })

  updateSecurityEditMode = (state = {}, { isEditMode }) => ({
    ...state,
    isSecurityEditing: isEditMode
  })
}

export const walkersModel = new WalkersModel()
