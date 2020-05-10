// Constants
import {
  FETCH_SETTINGS_PROFILE_REJECTED,
  FETCH_SETTINGS_PROFILE_REQUESTED,
  FETCH_SETTINGS_PROFILE_SUCCEDED,
  FETCH_SETTINGS_SCHEDULER_REJECTED,
  FETCH_SETTINGS_SCHEDULER_REQUESTED,
  FETCH_SETTINGS_SCHEDULER_SUCCEDED,
  FETCH_SETTINGS_SERVICES_REQUESTED,
  FETCH_SETTINGS_SERVICES_SUCCEDED,
  FETCH_SETTINGS_SERVICES_REJECTED,
  PUSH_NEW_SERVICE_LOCALLY
} from '../constants/settings/Actions'

// Models
import { settingsModel } from '../models'

// Initial state
import initialstate from '../initialstate/settings-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case FETCH_SETTINGS_PROFILE_REQUESTED:
    case FETCH_SETTINGS_SCHEDULER_REQUESTED:
    case FETCH_SETTINGS_SERVICES_REQUESTED:
      return settingsModel.loadingWithMessage(state, { loadingMessage: action.payload })

    /*
    Rejected
    */
    case FETCH_SETTINGS_PROFILE_REJECTED:
    case FETCH_SETTINGS_SCHEDULER_REJECTED:
    case FETCH_SETTINGS_SERVICES_REJECTED:
      return settingsModel.error(state, { error: action.payload })

    /*
    Succeded
    */
    case FETCH_SETTINGS_PROFILE_SUCCEDED:
      return settingsModel.updateSettingsProfile(state, { profile: action.payload.profile })
    case FETCH_SETTINGS_SCHEDULER_SUCCEDED:
      return settingsModel.updateSettingsScheduler(state, { scheduler: action.payload })
    case FETCH_SETTINGS_SERVICES_SUCCEDED:
      return settingsModel.updateSettingsServices(state, { services: action.payload })
    case PUSH_NEW_SERVICE_LOCALLY:
      return settingsModel.addNewServiceLocally(state, { service: action.payload })
  }
  return state
}
