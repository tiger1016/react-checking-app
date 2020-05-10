// Constants
import {
  FETCH_PETS_REQUESTED,
  FETCH_PETS_SUCCEDED,
  FETCH_PETS_REJECTED
} from '../../constants/pets/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PETS_REQUESTED, payload: `Fetching pets` })
    const { data: { data: payload } } = await api.get('/pets')
    dispatch({ type: FETCH_PETS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PETS_REJECTED, payload: error.message || error.toString() })
  }
}
