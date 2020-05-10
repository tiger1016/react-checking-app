// Constants
import {
  FETCH_REFUNDS_REQUESTED,
  FETCH_REFUNDS_SUCCEDED,
  FETCH_REFUNDS_REJECTED,

  ISSUE_REFUNDS_REQUESTED,
  ISSUE_REFUNDS_SUCCEDED,
  ISSUE_REFUNDS_REJECTED
} from '../constants/refunds/Actions'

// Initial state
import initialstate from '../initialstate/refunds-init'
// Models
import { refundsModel } from '../models/refundsModel'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case FETCH_REFUNDS_REQUESTED:
    case ISSUE_REFUNDS_REQUESTED:
      return refundsModel.loadingWithMessage(state, { message: action.payload })

    /*
    Rejected
    */
    case FETCH_REFUNDS_REJECTED:
    case ISSUE_REFUNDS_REJECTED:
      return refundsModel.error(state, { error: action.payload })

    /*
    Succeded
    */
    case FETCH_REFUNDS_SUCCEDED:
      return refundsModel.updateRefunds(state, { refunds: action.payload })
    case ISSUE_REFUNDS_SUCCEDED:
      return refundsModel.updateRefunds(state, { refunds: action.payload })
  }
  return state
}
