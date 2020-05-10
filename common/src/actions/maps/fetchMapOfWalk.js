// Constants
import {
  FETCH_MAP_OF_WALK_REJECTED,
  FETCH_MAP_OF_WALK_REQUESTED,
  FETCH_MAP_OF_WALK_SUCCEDED
} from '../../constants/maps/Actions'

// Utils
import { api } from '../../utils/api'

export default walkId => async dispatch => {
  try {
    dispatch({ type: FETCH_MAP_OF_WALK_REQUESTED, payload: `Fetching map` })
    const { data } = await api.get(`/maps/${walkId}`)
    dispatch({ type: FETCH_MAP_OF_WALK_SUCCEDED, payload: { walk_id: walkId, map_data: data } })
  } catch (error) {
    dispatch({ type: FETCH_MAP_OF_WALK_REJECTED, payload: error.message || error.toString() })
  }
}
