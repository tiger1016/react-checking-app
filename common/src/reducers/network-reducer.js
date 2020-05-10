// Constants
import {
  FETCH_NETWORK_STATUS_REQUESTED,
  FETCH_NETWORK_STATUS_SUCCEDED,
  FETCH_NETWORK_STATUS_REJECTED
} from '../constants/network/Actions'

// Model
import { networkModel } from '../models'

// Initial state
import initialstate from '../initialstate/network-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
     */
    case FETCH_NETWORK_STATUS_REQUESTED:
      return networkModel.loadingWithMessage(state, { message: action.payload })

    /*
    Rejected
     */
    case FETCH_NETWORK_STATUS_REJECTED:
      return networkModel.error(state, { error: action.payload })

    /*
    Succeded
     */
    case FETCH_NETWORK_STATUS_SUCCEDED:
      return networkModel.updateNetworkStatus(state, { online: action.payload })
  }
  return state
}
