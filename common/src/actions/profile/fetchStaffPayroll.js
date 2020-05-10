// Constants
import {
  FETCH_PROFILE_STAFF_PAYROLL_REJECTED,
  FETCH_PROFILE_STAFF_PAYROLL_REQUESTED,
  FETCH_PROFILE_STAFF_PAYROLL_SUCCEDED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_PROFILE_STAFF_PAYROLL_REQUESTED, payload: `Fetching profile staff payroll` })
    const { data: { data: payload } } = await api.get('/setting/staff_payroll')
    dispatch({ type: FETCH_PROFILE_STAFF_PAYROLL_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PROFILE_STAFF_PAYROLL_REJECTED, payload: error.message || error.toString() })
  }
}
