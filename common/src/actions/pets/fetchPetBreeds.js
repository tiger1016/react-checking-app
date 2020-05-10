// Constants
import {
  FETCH_PET_BREEDS_REQUESTED,
  FETCH_PET_BREEDS_SUCCEDED,
  FETCH_PET_BREEDS_REJECTED
} from '../../constants/pets/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PET_BREEDS_REQUESTED, payload: `Fetching pet breeds` })
    const { data: { data: payload } } = await api.get('/pets/breeds')
    dispatch({ type: FETCH_PET_BREEDS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PET_BREEDS_REJECTED, payload: (error.message || error.toString()) })
  }
}
