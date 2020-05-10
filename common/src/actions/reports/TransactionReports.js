// Constants
import {
  FETCH_TRANSACTION_REPORT_REQUESTED,
  FETCH_TRANSACTION_REPORT_SUCCEDED,
  FETCH_TRANSACTION_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_TRANSACTION_REPORT_REQUESTED, payload: `FETCH transaction resport` })
    const { data: { data: payload } } = await api.get('/reports/customer_transaction', { ...data })
    dispatch({ type: FETCH_TRANSACTION_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_TRANSACTION_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
