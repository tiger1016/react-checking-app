// Constants
import {
  FETCH_PHOTOS_OF_WALK_REQUESTED,
  FETCH_PHOTOS_OF_WALK_SUCCEDED,
  FETCH_PHOTOS_OF_WALK_REJECTED
} from '../constants/photos/Actions'

// Model
import { photosModel } from '../models'

// Initial state
import initialstate from '../initialstate/photos-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case FETCH_PHOTOS_OF_WALK_REQUESTED:
      return photosModel.loadingWithMessage(state, { loadingMessage: action.payload })

    /*
    Rejected
    */
    case FETCH_PHOTOS_OF_WALK_REJECTED:
      return photosModel.error(state, { error: action.payload })

    /*
    Succeded
    */
    case FETCH_PHOTOS_OF_WALK_SUCCEDED:
      return photosModel.updatePhotos(state, { photos: action.payload })
  }
  return state
}
