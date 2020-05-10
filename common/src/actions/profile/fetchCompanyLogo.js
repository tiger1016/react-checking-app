// Constants
import {
  FETCH_LOGO_REQUESTED,
  FETCH_LOGO_SUCCEDED,
  FETCH_LOGO_REJECTED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_LOGO_REQUESTED, payload: `Fetching company logo` })
    const { data: { data: { logo: payload } } } = await api.get('/setting/logo')
    dispatch({ type: FETCH_LOGO_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_LOGO_REJECTED, payload: error.message || error.toString() })
  }
}
