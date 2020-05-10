// Constants
import {
  FETCH_PHOTOS_OF_WALK_REQUESTED,
  FETCH_PHOTOS_OF_WALK_SUCCEDED,
  FETCH_PHOTOS_OF_WALK_REJECTED
} from '../../constants/photos/Actions'

// Utils
import { api } from '../../utils/api'

export default walkId => async dispatch => {
  try {
    dispatch({ type: FETCH_PHOTOS_OF_WALK_REQUESTED, payload: `Fetching photos` })
    const { data: { walks_photos: photos } } = await api.get(`/photos/${walkId}`)
    dispatch({ type: FETCH_PHOTOS_OF_WALK_SUCCEDED, payload: { walk_id: walkId, photos } })
  } catch (error) {
    dispatch({ type: FETCH_PHOTOS_OF_WALK_REJECTED, payload: error.message || error.toString() })
  }
}
