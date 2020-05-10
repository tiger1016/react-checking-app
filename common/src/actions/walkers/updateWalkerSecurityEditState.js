// Constants
import {
  UPDATE_SECURITY_EDIT_MODE
} from '../../constants/walkers/Actions'

export default (isEditMode = false) => dispatch => dispatch({ type: UPDATE_SECURITY_EDIT_MODE, payload: { isEditMode } })
