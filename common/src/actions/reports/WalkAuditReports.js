// Constants
import {
  FETCH_WALKAUDIT_REPORT_REQUESTED,
  FETCH_WALKAUDIT_REPORT_SUCCEDED,
  FETCH_WALKAUDIT_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_WALKAUDIT_REPORT_REQUESTED, payload: `FETCH walkaudit report` })
    const { data: { data: payload } } = await api.get('/reports/customer_walk_audit', { ...data })
    dispatch({ type: FETCH_WALKAUDIT_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_WALKAUDIT_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
