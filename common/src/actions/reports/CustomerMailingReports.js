// Constants
import {
  FETCH_CUSTOMERMAIL_REPORT_REQUESTED,
  FETCH_CUSTOMERMAIL_REPORT_SUCCEDED,
  FETCH_CUSTOMERMAIL_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_CUSTOMERMAIL_REPORT_REQUESTED, payload: `FETCH customer mail report` })
    const { data: { data: payload } } = await api.get('/reports/customer_emails', { ...data })
    dispatch({ type: FETCH_CUSTOMERMAIL_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_CUSTOMERMAIL_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
