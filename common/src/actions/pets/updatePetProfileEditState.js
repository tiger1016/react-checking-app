// Constants
import {
  UPDATE_PET_EDIT_MODE
} from '../../constants/pets/Actions'

export default (isEditMode = false) => async dispatch => dispatch({ type: UPDATE_PET_EDIT_MODE, payload: { isEditMode } })
