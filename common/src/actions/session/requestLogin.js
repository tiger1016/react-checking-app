// Constants
import {
  LOGIN_REQUESTED,
  LOGIN_SUCCEDED,
  LOGIN_REJECTED,
  FETCH_WALKER_SUCCEDED
} from '../../constants/session/Actions'

import { GET_LAST_ALERT } from '../../constants/alerts/Actions'

// Utils
import { api } from '../../utils/api'

/**
 * Requests login to the api
 * @param  {String} username user's username
 * @param  {String} password user's password
 * @return {Void}
 */
export default (username, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN_REQUESTED, payload: `Requesting login for ${username}` })
    const params = {
      username,
      password
    }
    // This defaults to true and indicates the api handler to look for a
    // session token and inject it to the request url params.
    // So, we need to set it to false so it does not do that.
    const injectSessionTokenToUrlParams = false
    const { data: userInfo } = await api.post('/login', params, injectSessionTokenToUrlParams)

    if (userInfo.type === 4) {
      const { data: { data: { walker } } } = await api.get(`/walkers/${userInfo.user_id}`)
      if (walker && walker.admin) {
        dispatch({ type: LOGIN_SUCCEDED, payload: { ...userInfo, schedulingAdmin: 1 } })
      } else if (walker && walker.admin_full) {
        dispatch({ type: LOGIN_SUCCEDED, payload: { ...userInfo, fullSchedulingAdmin: 1 } })
      }
      dispatch({ type: FETCH_WALKER_SUCCEDED, payload: walker })
    } else {
      dispatch({ type: LOGIN_SUCCEDED, payload: userInfo })
      if (userInfo.type === 2) {
        const alertInfo = localStorage.getItem('lastknownAlertId') // eslint-disable-line
        if (alertInfo) {
          const lastUser = JSON.parse(alertInfo).find(alert => alert.userId === userInfo.user_id)
          if (lastUser) {
            dispatch({ type: GET_LAST_ALERT, payload: lastUser.lastAlertId })
          }
        }
      }
    }
  } catch (error) {
    dispatch({ type: LOGIN_REJECTED, payload: error.message || error.toString() })
  }
}
