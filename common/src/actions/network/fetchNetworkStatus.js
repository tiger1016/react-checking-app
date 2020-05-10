// Constants
import {
  FETCH_NETWORK_STATUS_REQUESTED,
  FETCH_NETWORK_STATUS_SUCCEDED,
  FETCH_NETWORK_STATUS_REJECTED
} from '../../constants/network/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_NETWORK_STATUS_REQUESTED, payload: `Checking network status.` })
    const { data: { online: payload } } = await api.get('/network', {}, false)
    dispatch({ type: FETCH_NETWORK_STATUS_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_NETWORK_STATUS_REJECTED, payload: error.message || error.toString() })
  }
}
