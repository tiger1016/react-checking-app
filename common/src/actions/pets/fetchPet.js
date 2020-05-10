// Constants
import {
  FETCH_PET_REQUESTED,
  FETCH_PET_SUCCEDED,
  FETCH_PET_REJECTED
} from '../../constants/pets/Actions'

// Utils
import { api } from '../../utils/api'

export default id => async dispatch => {
  try {
    dispatch({ type: FETCH_PET_REQUESTED, payload: `Fetching pet` })
    const { data: { data: payload } } = await api.get('/pets/' + id)
    dispatch({ type: FETCH_PET_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PET_REJECTED, payload: error.message || error.toString() })
  }
}
