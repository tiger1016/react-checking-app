// Constants
import {
  FETCH_WALKERS_REQUESTED,
  FETCH_WALKERS_SUCCEDED,
  FETCH_WALKERS_REJECTED,

  FETCH_WALKER_PROFILE_REQUESTED,
  FETCH_WALKER_PROFILE_SUCCEDED,
  FETCH_WALKER_PROFILE_REJECTED,

  FETCH_WALKER_PAYROLL_REQUESTED,
  FETCH_WALKER_PAYROLL_SUCCEDED,
  FETCH_WALKER_PAYROLL_REJECTED,

  FETCH_WALKER_PAYRATE_REQUESTED,
  FETCH_WALKER_PAYRATE_SUCCEDED,
  FETCH_WALKER_PAYRATE_REJECTED,

  EDIT_WALKER_PROFILE_REQUESTED,
  EDIT_WALKER_PROFILE_SUCCEDED,
  EDIT_WALKER_PROFILE_REJECTED,

  ADD_WALKER_REJECTED,
  ADD_WALKER_REQUESTED,
  ADD_WALKER_SUCCEDED,

  EDIT_WALKER_PAYRATE_REQUESTED,
  EDIT_WALKER_PAYRATE_SUCCEDED,
  EDIT_WALKER_PAYRATE_REJECTED,

  TOGGLE_WALKER_PROFILE_STATUS_REQUESTED,
  TOGGLE_WALKER_PROFILE_STATUS_SUCCEDED,
  TOGGLE_WALKER_PROFILE_STATUS_REJECTED,

  UPDATE_PROFILE_EDIT_MODE,
  UPDATE_SECURITY_EDIT_MODE
} from '../constants/walkers/Actions'

// Model
import { walkersModel } from '../models'

// Initial state
import initialstate from '../initialstate/walkers-init'

export default (state = initialstate, action) => {
  const { payload, type } = action
  switch (type) {
    case FETCH_WALKERS_REQUESTED:
    case FETCH_WALKER_PROFILE_REQUESTED:
    case FETCH_WALKER_PAYROLL_REQUESTED:
    case FETCH_WALKER_PAYRATE_REQUESTED:
    case EDIT_WALKER_PROFILE_REQUESTED:
    case ADD_WALKER_REQUESTED:
    case EDIT_WALKER_PAYRATE_REQUESTED:
    case TOGGLE_WALKER_PROFILE_STATUS_REQUESTED:
      return walkersModel.loadingWithMessage(state, { loadingMessage: payload })

    case FETCH_WALKERS_REJECTED:
    case FETCH_WALKER_PROFILE_REJECTED:
    case FETCH_WALKER_PAYROLL_REJECTED:
    case FETCH_WALKER_PAYRATE_REJECTED:
    case EDIT_WALKER_PROFILE_REJECTED:
    case ADD_WALKER_REJECTED:
    case EDIT_WALKER_PAYRATE_REJECTED:
    case TOGGLE_WALKER_PROFILE_STATUS_REJECTED:
      return walkersModel.error(state, { error: payload })

    case FETCH_WALKERS_SUCCEDED:
      return walkersModel.updateWalkers(state, { walkers: payload })

    case FETCH_WALKER_PROFILE_SUCCEDED:
      return walkersModel.fetchWalkerProfile(state, { walkerProfile: payload })

    case FETCH_WALKER_PAYROLL_SUCCEDED:
      return walkersModel.fetchWalkerPayroll(state, { walkerPayroll: payload, walkerId: action.walkerId })

    case FETCH_WALKER_PAYRATE_SUCCEDED:
      return walkersModel.fetchWalkerPayrate(state, { walkerPayrate: payload, walkerId: action.walkerId })

    case EDIT_WALKER_PROFILE_SUCCEDED:
      return walkersModel.editWalkerProfile(state, { walkerProfile: payload })

    case ADD_WALKER_SUCCEDED:
      return walkersModel.addWalker(state, { newWalker: payload })

    case EDIT_WALKER_PAYRATE_SUCCEDED:
      return walkersModel.editWalkerPayrate(state, { walkerPayrate: payload, payrateType: action.payloadType, walkerId: action.walkerId })

    case TOGGLE_WALKER_PROFILE_STATUS_SUCCEDED:
      return walkersModel.toggleWalkerStatus(state, { walker: payload, walkerId: action.walkerId })

    case UPDATE_PROFILE_EDIT_MODE:
      return walkersModel.updateProfileEditMode(state, { isEditMode: payload.isEditMode })
    case UPDATE_SECURITY_EDIT_MODE:
      return walkersModel.updateSecurityEditMode(state, { isEditMode: payload.isEditMode })
  }
  return state
}
