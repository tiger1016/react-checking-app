// Constants
import {
  TOASTR_WARNING,
  TOASTR_SUCCESS,
  TOASTR_ERROR
} from '../constants/toastr/Actions'

// Initial state
import initialstate from '../initialstate/toastr-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    case TOASTR_WARNING:
      return {
        ...state,
        type: 'warning',
        isActive: action.isActive,
        msg: action.msg
      }
    case TOASTR_SUCCESS:
      return {
        ...state,
        type: 'success',
        isActive: action.isActive,
        msg: action.msg
      }
    case TOASTR_ERROR:
      // debugger
      return {
        ...state,
        type: 'error',
        isActive: action.isActive,
        msg: action.msg
      }
  }
  return state
}
