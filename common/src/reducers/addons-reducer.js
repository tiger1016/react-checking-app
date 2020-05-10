// Constants
import {
  ARCHIVE_ADDON_REQUESTED,
  ARCHIVE_ADDON_SUCCEDED,
  ARCHIVE_ADDON_REJECTED,
  CREATE_ADDON_REQUESTED,
  CREATE_ADDON_SUCCEDED,
  CREATE_ADDON_REJECTED,
  FETCH_ADDONS_REJECTED,
  FETCH_ADDONS_REQUESTED,
  FETCH_ADDONS_SUCCEDED,
  FETCH_ADDON_REJECTED,
  FETCH_ADDON_REQUESTED,
  FETCH_ADDON_SUCCEDED,
  FETCH_FULL_ADDONS_REJECTED,
  FETCH_FULL_ADDONS_REQUESTED,
  FETCH_FULL_ADDONS_SUCCEDED,
  PUSH_NEW_ADDON_LOCALLY,
  REMOVE_NEW_LOCAL_ADDONS,
  REMOVE_UPDATED_ADDON,
  UPDATE_ADDON_REQUESTED,
  UPDATE_ADDON_SUCCEDED,
  UPDATE_ADDON_REJECTED,
  SET_ADDON_EDITMODE_LOCALLY
} from '../constants/addons/Actions'

// Model
import { addonsModel } from '../models'

// Initial state
import initialstate from '../initialstate/addons-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
      Requested
     */
    case ARCHIVE_ADDON_REQUESTED:
    case CREATE_ADDON_REQUESTED:
    case FETCH_ADDONS_REQUESTED:
    case FETCH_ADDON_REQUESTED:
    case FETCH_FULL_ADDONS_REQUESTED:
    case UPDATE_ADDON_REQUESTED:
      return addonsModel.loadingWithMessage(state, { message: action.payload })

    /*
      Rejected
     */
    case ARCHIVE_ADDON_REJECTED:
    case CREATE_ADDON_REJECTED:
    case FETCH_ADDONS_REJECTED:
    case FETCH_ADDON_REJECTED:
    case FETCH_FULL_ADDONS_REJECTED:
    case UPDATE_ADDON_REJECTED:
      return addonsModel.error(state, { error: action.payload })

    /*
      Succeded
     */
    case ARCHIVE_ADDON_SUCCEDED:
      return addonsModel.archiveAddon(state, { addonId: action.payload })
    case CREATE_ADDON_SUCCEDED:
      return addonsModel.createAddon(state, { addon: action.payload.addon, tempAddon: action.payload.tempAddon })
    case FETCH_ADDONS_SUCCEDED:
    case FETCH_ADDON_SUCCEDED:
      return addonsModel.updateAddons(state, { addons: action.payload })
    case FETCH_FULL_ADDONS_SUCCEDED:
      return addonsModel.updateAddons(state, { addons: action.payload })
    case UPDATE_ADDON_SUCCEDED:
      return addonsModel.updateAddon(state, { addon: action.payload.addon, oldAddonId: action.oldAddonId })

    /*
    Other
     */
    case PUSH_NEW_ADDON_LOCALLY:
      return addonsModel.newTempAddon(state, { addon: action.payload })
    case REMOVE_NEW_LOCAL_ADDONS:
      return addonsModel.removeTempAddons(state)
    case REMOVE_UPDATED_ADDON:
      return addonsModel.removeAddon(state, { addon: action.payload })
    case SET_ADDON_EDITMODE_LOCALLY:
      return addonsModel.editAddon(state, { addon: action.payload })
  }
  return state
}
