// Constants
import {
  CLOSE_SIDEBAR,
  OPEN_SIDEBAR,
  TOGGLE_ALERT,
  TOGGLE_MODAL,
  TOGGLE_SIDEBAR,
  SYNC_REQUESTED,
  SYNC_SUCCEEDED,
  SYNC_REJECTED,
  UPDATE_CURRENT_SCRIPT,
  TOGGLE_QR_SCANNER
} from '../constants/app/Actions'

// Model
import { appModel } from '../models'

// Initial state
import initialstate from '../initialstate/app-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    case CLOSE_SIDEBAR:
      return appModel.closeSideBar(state)
    case OPEN_SIDEBAR:
      return appModel.openSideBar(state)
    case TOGGLE_ALERT:
      return appModel.toggleAlert(state, { payload: action.payload })
    case TOGGLE_QR_SCANNER:
      return appModel.toggleQrScanner(state, { payload: action.payload })
    case TOGGLE_MODAL:
      return appModel.toggleModal(state, { payload: action.payload })
    case TOGGLE_SIDEBAR:
      return appModel.toggleSideBar(state)
    case UPDATE_CURRENT_SCRIPT:
      return appModel.updateCurrentScript(state, { currentScript: action.payload })
    case SYNC_REQUESTED:
      return appModel.loadingWithMessage(state, { message: action.payload })
    case SYNC_SUCCEEDED:
      return appModel.sync(state, { syncEventsArray: action.payload })
    case SYNC_REJECTED:
      return appModel.error(state, { error: action.payload })
  }
  return state
}
