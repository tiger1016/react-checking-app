// Constants
import {
  DESTROY_SESSION,
  LOGIN_REJECTED,
  LOGIN_REQUESTED,
  LOGIN_SUCCEDED,
  SESSION_INFO_REJECTED,
  SESSION_INFO_REQUESTED,
  SESSION_INFO_SUCCEDED,
  UPDATE_SESSION_TOKEN,
  FETCH_WALKER_SUCCEDED
} from '../constants/session/Actions'

// Models
import { sessionModel } from '../models'

// Initial state
import initialstate from '../initialstate/session-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case LOGIN_REQUESTED:
    case SESSION_INFO_REQUESTED:
      return sessionModel.loadingWithMessage(state, { loadingMessage: action.payload })

    /*
    Rejected
    */
    case LOGIN_REJECTED:
    case SESSION_INFO_REJECTED:
      return sessionModel.error(state, { error: action.payload })

    /*
    Succeeded
    */
    case LOGIN_SUCCEDED:
    case SESSION_INFO_SUCCEDED:
      return sessionModel.updateSession(state, { user: action.payload })

    /*
    Synchronous
    */
    case DESTROY_SESSION:
      return sessionModel.destroySession(state)
    case UPDATE_SESSION_TOKEN:
      return sessionModel.updateSessionToken(state, { token: action.payload })

    /*
    Fetch walker success
    */
    case FETCH_WALKER_SUCCEDED:
      return sessionModel.updateWalkerSession(state, { walker: action.payload })
  }
  return state
}
