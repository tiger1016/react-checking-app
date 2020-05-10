// Constants
import {
  TOASTR_WARNING,
  TOASTR_SUCCESS,
  TOASTR_ERROR
} from '../../constants/Actions'

export default (type, msg) => dispatch => {
  if (type === 'ERROR') {
    dispatch({ type: TOASTR_ERROR, payload: msg, isActive: true })
    setTimeout(function () {
      dispatch({ type: TOASTR_ERROR, payload: '', isActive: false })
    }, 10000)
  } else if (type === 'WARNING') {
    dispatch({ type: TOASTR_WARNING, payload: msg, isActive: true })
    setTimeout(function () {
      dispatch({ type: TOASTR_WARNING, payload: msg, isActive: false })
    }, 3000)
  } else if (type === 'SUCCESS') {
    dispatch({ type: TOASTR_SUCCESS, payload: msg, isActive: true })
    setTimeout(function () {
      dispatch({ type: TOASTR_SUCCESS, payload: msg, isActive: false })
    }, 3000)
  }
}
