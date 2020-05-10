// Constants
import {
  SESSION_INFO_REQUESTED,
  SESSION_INFO_SUCCEDED,
  SESSION_INFO_REJECTED
} from '../../constants/session/Actions'

// Utils
import { api } from '../../utils/api'

/**
 * Requests session info from endpoint
 * @return {Void}
 */
export default () => async dispatch => {
  try {
    dispatch({ type: SESSION_INFO_REQUESTED, payload: `Requesting sessionInfo` })
    const { data: { data: payload } } = await api.get('//demo.petchecktechnology.com/SessionInfo')
    if (payload) {
      dispatch({ type: SESSION_INFO_SUCCEDED, payload })
    } else {
      dispatch({ type: SESSION_INFO_REJECTED, payload: 'NULL response' })
    }
  } catch (error) {
    dispatch({ type: SESSION_INFO_REJECTED, payload: error.message || error.toString() })
  }
}
