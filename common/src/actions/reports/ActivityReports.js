// Constants
import {
  FETCH_ACTIVITY_REPORT_REQUESTED,
  FETCH_ACTIVITY_REPORT_SUCCEDED,
  FETCH_ACTIVITY_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_ACTIVITY_REPORT_REQUESTED, payload: `FETCH activity report` })
    const { data: { data: payload } } = await api.get('/reports/customer_activity', { ...data })
    dispatch({ type: FETCH_ACTIVITY_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_ACTIVITY_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
