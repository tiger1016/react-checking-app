// Models
import BaseModel from '../baseModel'

// Utils
import { utility } from '../../utils/utility'

export default class SessionModel extends BaseModel {
  destroySession (state = {}) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      user: null,
      error: null,
      session: false
    }
  }

  error (state = {}, { error }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      user: null,
      error,
      session: false
    }
  }

  loadingWithMessage (state = {}, { loadingMessage }) {
    return {
      ...state,
      loading: true,
      loadingMessage,
      user: null,
      error: null,
      session: false
    }
  }

  updateSession (state = {}, { user }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      user,
      error: null,
      loadingLogo: false,
      session: utility.isAString(user.jwt) && !utility.isEmpty(user.jwt)
    }
  }

  updateSessionToken (state = {}, { token }) {
    return {
      ...state,
      user: {
        ...state.user,
        jwt: token
      },
      session: utility.isAString(token) && !utility.isEmpty(token)
    }
  }

  updateWalkerSession (state = {}, { walker }) {
    return {
      ...state,
      walker
    }
  }
}

export const sessionModel = new SessionModel()
