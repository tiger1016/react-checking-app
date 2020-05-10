// Libraries
import { createSelector } from 'reselect'

// Utils
import { utility } from '../../utils/utility'

// Pure Selectors
export const errorSelector = state => state.session.error
export const loadingSelector = state => state.session.loading
export const loadingMessageSelector = state => state.session.loadingMessage
export const sessionSelector = state => state.session.session
export const userSelector = state => state.session.user
export const walkerSelector = state => state.session.walker

/**
 * Checks if user is logged in
 * @param  {Func}   sessionSelector   Selects if session is true or false (if there is a sessio or not)
 * @param  {Func}   userSelector      Selects user object saved in store
 * @param  {Bool}   session           True if session existst, false otherwise
 * @param  {Object} user              User object save in store, or null if non-existent
 * @return {Bool}                     True if logged in, false otherwise
 */
export const loggedIn = createSelector(
  [sessionSelector, userSelector],
  (session, user) => {
    if (session && user && utility.isAnObject(user) && user.user_id && utility.isAString(user.jwt) && !utility.isEmpty(user.jwt)) {
      return true
    }
    return false
  }
)

/**
 * [description]
 * @param  {[type]} [loggedIn        [description]
 * @param  {[type]} loadingSelector] [description]
 * @param  {[type]} (loggedIn,       loading       [description]
 * @return {[type]}                  [description]
 */
export const loggingIn = createSelector(
  [loggedIn, loadingSelector],
  (loggedIn, loading) => {
    if (!loggedIn && loading) {
      return true
    }
    return false
  }
)

/**
 * [description]
 * @param  {[type]} [loggedIn      [description]
 * @param  {[type]} loggingIn      [description]
 * @param  {[type]} errorSelector] [description]
 * @param  {[type]} (loggedIn,     loggingIn,    error [description]
 * @return {[type]}                [description]
 */
export const loginFailed = createSelector(
  [loggedIn, loggingIn, errorSelector],
  (loggedIn, loggingIn, error) => {
    if (!utility.isEmpty(error) && (!loggedIn && !loggingIn)) {
      return true
    }
    return false
  }
)

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export const sessionTokenSelector = createSelector(
  userSelector,
  user => {
    return user ? (user.jwt || null) : null
  }
)

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export const userTypeSelector = createSelector(
  userSelector,
  user => {
    return user ? (user.type || null) : null
  }
)

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export const walkerAdminSelector = createSelector(
  walkerSelector,
  walker => {
    return walker ? (walker.admin || null) : null
  }
)

/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export const walkerAdminFullSelector = createSelector(
  walkerSelector,
  walker => {
    return walker ? (walker.admin_full || null) : null
  }
)
/**
 * [description]
 * @param  {[type]} user [description]
 * @return {[type]}      [description]
 */
export const userTimeZoneSelector = createSelector(
  userSelector,
  user => {
    return user ? (user.time_zone || null) : null
  }
)
