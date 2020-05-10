// Constants
import {
  FETCH_STAFFPAYROLL_REPORT_REQUESTED,
  FETCH_STAFFPAYROLL_REPORT_SUCCEDED,
  FETCH_STAFFPAYROLL_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_STAFFPAYROLL_REPORT_REQUESTED, payload: `FETCH payroll resport` })
    const { data: { data: payload } } = await api.get('/reports/staff_payroll/', { ...data })
    dispatch({ type: FETCH_STAFFPAYROLL_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_STAFFPAYROLL_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
