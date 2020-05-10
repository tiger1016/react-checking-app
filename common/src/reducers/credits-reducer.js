// Constants
import {
  FETCH_CREDITS_REQUESTED,
  FETCH_CREDITS_SUCCEDED,
  FETCH_CREDITS_REJECTED,
  ISSUE_CREDITS_REQUESTED,
  ISSUE_CREDITS_SUCCEDED,
  ISSUE_CREDITS_REJECTED
} from '../constants/credits/Actions'

// Initial state
import initialstate from '../initialstate/credits-init'
// Models
import { creditsModels } from '../models/creditsModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case FETCH_CREDITS_REQUESTED:
    case ISSUE_CREDITS_REQUESTED:
      return creditsModels.loadingWithMessage(state, { message: action.payload })

    /*
    Rejected
    */
    case FETCH_CREDITS_REJECTED:
    case ISSUE_CREDITS_REJECTED:
      return creditsModels.error(state, { error: action.payload })

    /*
    Succeded
    */
    case FETCH_CREDITS_SUCCEDED:
      return creditsModels.updateCredits(state, { credits: action.payload.credits, creditsUsed: action.payload['credits-used'] || [] })
    case ISSUE_CREDITS_SUCCEDED:
      return creditsModels.issueCredit(state, { newCredit: action.payload })
  }
  return state
}
