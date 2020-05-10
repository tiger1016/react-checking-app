
// Constants
import {
  CANCEL_WALK_REJECTED,
  CANCEL_WALK_REQUESTED,
  CANCEL_WALK_SUCCEEDED,

  CANCEL_WALKS_REJECTED,
  CANCEL_WALKS_REQUESTED,
  CANCEL_WALKS_SUCCEEDED,

  CREATE_WALK_REJECTED,
  CREATE_WALK_REQUESTED,
  CREATE_WALK_SUCCEEDED,

  FETCH_WALKS_DOWNLOADING,
  FETCH_WALKS_REJECTED,
  FETCH_WALKS_REQUESTED,
  FETCH_WALKS_SUCCEEDED,
  FETCH_UPDATED_WALKS_REQUESTED,

  UPDATE_WALK_REJECTED,
  UPDATE_WALK_REQUESTED,
  UPDATE_WALK_SUCCEEDED,

  FETCH_WALK_DETAIL_REJECTED,
  FETCH_WALK_DETAIL_REQUESTED,
  FETCH_WALK_DETAIL_SUCCEEDED,

  UPDATE_WALKS_FILTER
} from '../constants/walks/Actions'

// Initial state
import initialstate from '../initialstate/walks-init'

// Model
import { walksModel } from '../models'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Rejected
     */
    case CANCEL_WALK_REJECTED:
    case CANCEL_WALKS_REJECTED:
    case CREATE_WALK_REJECTED:
    case FETCH_WALKS_REJECTED:
    case UPDATE_WALK_REJECTED:
    case FETCH_WALK_DETAIL_REJECTED:
      return walksModel.error(state, { error: action.payload })

    /*
    Requested
     */
    case CANCEL_WALK_REQUESTED:
    case CANCEL_WALKS_REQUESTED:
    case CREATE_WALK_REQUESTED:
    case UPDATE_WALK_REQUESTED:
    case FETCH_WALK_DETAIL_REQUESTED:
      return walksModel.loadingWithMessage(state, { message: action.payload })
    case FETCH_UPDATED_WALKS_REQUESTED:
      return walksModel.loadingWithMessage(state, { message: action.payload })
    case FETCH_WALKS_REQUESTED:
      return walksModel.loadingWithMessage(state, { message: action.payload, loadingEvent: 'fetch' })

    /*
    Succeded
     */
    case CANCEL_WALK_SUCCEEDED:
      return walksModel.cancelWalk(state, { applyToAll: action.payload.applyToAll, walkId: action.payload.walkId })
    case CANCEL_WALKS_SUCCEEDED:
      return walksModel.cancelWalks(state, { walksIds: action.payload.walksIds })
    case CREATE_WALK_SUCCEEDED:
      return walksModel.createWalk(state, { walk: action.payload })
    case FETCH_WALKS_SUCCEEDED:
      return walksModel.updateWalks(state, { newWalks: action.payload.walks, startTime: action.payload.start_time, endTime: action.payload.end_time })
    case UPDATE_WALK_SUCCEEDED:
      return walksModel.updateWalk(state, { updatedWalk: action.payload })
    case FETCH_WALK_DETAIL_SUCCEEDED:
      return walksModel.updateWalk(state, { updatedWalk: action.payload })
    /*
    Downloading
     */
    case FETCH_WALKS_DOWNLOADING:
      return walksModel.downloading(state, { progress: action.payload.progress, progressTotal: action.payload.progressTotal })

    case UPDATE_WALKS_FILTER:
      return walksModel.updateFilter(state, action.payload)
  }
  return state
}
