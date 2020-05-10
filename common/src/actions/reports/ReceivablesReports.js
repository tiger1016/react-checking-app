// Constants
import {
  FETCH_RECEIVABLES_REPORT_REQUESTED,
  FETCH_RECEIVABLES_REPORT_SUCCEDED,
  FETCH_RECEIVABLES_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_RECEIVABLES_REPORT_REQUESTED, payload: `FETCH receivables report` })
    const { data: { data: payload } } = await api.get('/reports/customer_receivables', { ...data })
    dispatch({ type: FETCH_RECEIVABLES_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_RECEIVABLES_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
