// Constants
import {
  FETCH_ADDON_REQUESTED,
  FETCH_ADDON_SUCCEDED,
  FETCH_ADDON_REJECTED
} from '../../constants/addons/Actions'

// Utils
import { api } from '../../utils/api'

export default (id) => async dispatch => {
  try {
    dispatch({ type: FETCH_ADDON_REQUESTED, payload: `Fetching addons` })
    const { data: { data: payload } } = await api.get('/addons/' + id)
    dispatch({ type: FETCH_ADDON_SUCCEDED, payload: [payload.addon] })
  } catch (error) {
    dispatch({ type: FETCH_ADDON_REJECTED, payload: error.message || error.toString() })
  }
}
