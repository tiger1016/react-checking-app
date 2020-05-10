// Constants
import {
  UPDATE_PROFILE_EDIT_MODE
} from '../../constants/walkers/Actions'

export default (isEditMode = false) => dispatch => dispatch({ type: UPDATE_PROFILE_EDIT_MODE, payload: { isEditMode } })
