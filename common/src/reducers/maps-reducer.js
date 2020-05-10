// Constants
import {
  FETCH_MAP_OF_WALK_REJECTED,
  FETCH_MAP_OF_WALK_REQUESTED,
  FETCH_MAP_OF_WALK_SUCCEDED
} from '../constants/maps/Actions'

// Initial state
import initialstate from '../initialstate/maps-init'

// Model
import { mapsModel } from '../models'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
     */
    case FETCH_MAP_OF_WALK_REQUESTED:
      return mapsModel.loadingWithMessage(state, { message: action.payload })

    /*
    Rejected
     */
    case FETCH_MAP_OF_WALK_REJECTED:
      return mapsModel.error(state, { error: action.payload })

    /*
    Succeded
     */
    case FETCH_MAP_OF_WALK_SUCCEDED:
      return mapsModel.updateMaps(state, { maps: action.payload })
  }
  return state
}
