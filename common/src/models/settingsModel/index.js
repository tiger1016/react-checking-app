// Models
import BaseModel from '../baseModel'

export default class SettingsModel extends BaseModel {
  updateSettings (state = {}, { settings }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      settings,
      error: null
    }
  }

  updateSettingsAddons (state = {}, { addons }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      addons,
      error: null
    }
  }

  updateSettingsProfile (state = {}, { profile }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      profile,
      error: null
    }
  }

  updateSettingsScheduler (state = {}, { scheduler }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      scheduler,
      error: null
    }
  }
}

export const settingsModel = new SettingsModel()
