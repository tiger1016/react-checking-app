// Constants
import {
  USER_SS_KEY
} from '../../constants/Constants'

// Utils
import { logger, utility } from '../../utils'

class SessionHelper {
  constructor () {
    this.dispatch = null
    this.logInAction = null
    this.sessionStore = null
    this.asyncStore = null
    this.sessionUserIdent = USER_SS_KEY
    // window.addEventListener('storage', function (event) {
    //  console.log('Storage Event',event)
    // })
  }

  getSessionJwt = () => {
    try {
      const user = this.getSessionUser()
      if (utility.isAnObject(user)) {
        if (user.jwt) {
          logger.slog('Succesfully retrieved jwt from window.sessionStorage', user.jwt)
          return user.jwt
        }
        logger.slog('Invalid user jwt retrieved from user saved in window.sessionStorage', user.jwt)
      }
      logger.slog('Invalid user retrieved from window.sessionStorage in getSessionJwt()', user)
      return undefined
    } catch (err) {
      logger.slog('Error retrieving jwt from window.sessionStorage in getSessionJwt()', err)
    }
    return undefined
  }

  getSessionTimeZone = () => {
    try {
      const user = this.getSessionUser()
      if (utility.isAnObject(user)) {
        if (user.time_zone) {
          logger.slog('Succesfully retrieved time_zone from window.sessionStorage', user.time_zone)
          return user.time_zone
        }
        logger.slog('Invalid user time_zone retrieved from user saved in window.sessionStorage', user.time_zone)
      }
      logger.slog('Invalid user retrieved from window.sessionStorage in getSessionToken()', user)
      return undefined
    } catch (err) {
      logger.slog('Error retrieving time_zone from window.sessionStorage in getSessionToken()', err)
    }
    return undefined
  }

  getSessionUser = () => {
    try {
      const user = JSON.parse(window.sessionStorage.getItem(this.sessionUserIdent))
      if (utility.isAnObject(user)) {
        logger.slog('Succesfully retrieved user from window.sessionStorage', user)
        return user
      }
      logger.slog('Invalid user retrieved from window.sessionStorage in getSessionJwt()', user)
      return undefined
    } catch (err) {
      logger.slog('Error retrieving user from window.sessionStorage in getSessionJwt()', err)
    }
    return undefined
  }

  loggedIn = (sessionStore = null) => {
    if (this.sessionStore && utility.isAnObject(this.sessionStore)) {
      return this.sessionStore.user ? (!!this.sessionStore.user.jwt) : false
    }
    if (sessionStore && utility.isAnObject(sessionStore)) {
      return sessionStore.user ? (!!sessionStore.user.jwt) : false
    }
    logger.slog('Invalid this.sessionStore property on loggedIn()', this.sessionStore)
    logger.slog('Invalid argument sessionStore on loggedIn()', sessionStore)
    return null
  }

  loggingIn = (sessionStore = null) => {
    if (this.sessionStore && utility.isAnObject(this.sessionStore)) {
      return this.sessionStore.loading && !this.sessionStore.user
    }
    if (sessionStore && utility.isAnObject(sessionStore)) {
      return sessionStore.loading && !sessionStore.user
    }
    logger.slog('Invalid this.sessionStore property on loggedIn()', this.sessionStore)
    logger.slog('Invalid argument sessionStore on loggedIn()', sessionStore)
    return null
  }

  logIn = (user, password, dispatch = null, logInAction = null) => {
    if (utility.isAFunction(this.dispatch) && utility.isAFunction(this.logInAction)) {
      this.dispatch(this.logInAction(user, password))
      return
    }
    if (utility.isAFunction(dispatch) && utility.isAFunction(logInAction)) {
      dispatch(logInAction(user, password))
      return
    }
    logger.slog('Invalid this.dispatch on logIn()', this.dispatch)
    logger.slog('Invalid dispatch on logIn()', dispatch)
    logger.slog('Invalid this.logInAction on logIn()', this.logInAction)
    logger.slog('Invalid logInAction on logIn()', logInAction)
    return null
  }

  removeUserFromSession = () => {
    try {
      window.sessionStorage.removeItem(this.sessionUserIdent)
      if (utility.isAnObject(this.getSessionUser())) {
        logger.slog('Unable to remove user from window.sessionStorage in removeUserFromSession()', this.getSessionUser())
        return false
      }
      logger.slog('Remove user from window.sessionStorage succesfully in removeUserFromSession()', true)
      return true
    } catch (err) {
      logger.slog('Error removing user from window.sessionStorage in removeUserFromSession()', err)
    }
    return false
  }

  setDispatch = (dispatch = null) => {
    if (dispatch && utility.isAFunction(dispatch)) {
      this.dispatch = dispatch
      return true
    }
    logger.slog('Dispatch set succesfully', dispatch)
    return false
  }

  setLogInAction = (logInAction = null) => {
    if (logInAction && utility.isAFunction(logInAction)) {
      this.logInAction = logInAction
      return true
    }
    logger.slog('Login action set succesfully', logInAction)
    return false
  }

  setSessionStore = (sessionStore = null) => {
    if (sessionStore && utility.isAnObject(sessionStore)) {
      this.sessionStore = sessionStore
      logger.slog('sessionStore saved succesfully', this.sessionStore)
      return true
    }
    logger.slog('Invalid argument for setSessionStore()', sessionStore)
    return false
  }

  storeUserToSession = user => {
    try {
      if (utility.isAnObject(user)) {
        window.sessionStorage.setItem(this.sessionUserIdent, JSON.stringify(user))
        if (utility.isAnObject(this.getSessionUser())) {
          logger.slog('Stored user to window.sessionStorage succesfully in storeUserToSession()', user)
          return true
        }
        logger.slog('Error saving user to window.sessionStorage in storeUserToSession()', user)
        return false
      }
      logger.slog('Invalid user type for storeUserToSession in storeUserToSession()', user)
      return false
    } catch (err) {
      logger.slog('Error storing user to sessionStore in storeUserToSession()', err)
    }
    return false
  }

  updateSessionJwt = jwt => {
    try {
      const user = this.getSessionUser()
      if (utility.isAnObject(user)) {
        window.sessionStorage.setItem(this.sessionUserIdent, JSON.stringify({ ...user, jwt }))
        if (this.getSessionJwt()) {
          logger.slog('Succesfully saved updated jwt to window.sessionStorage', user.jwt)
          return true
        }
        logger.slog('Error saving updated Jwt to window.sessionStorage', user.jwt)
        return false
      }
      logger.slog('Stored user invalid in updateSessionJwt()', user)
      return false
    } catch (err) {
      logger.slog('Error updating session Jwt in updateSessionJwt()', err)
    }
    return false
  }
}
export const session_helper = new SessionHelper() // eslint-disable-line camelcase
