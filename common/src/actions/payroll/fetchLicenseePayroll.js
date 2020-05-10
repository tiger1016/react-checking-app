// Invoices
import {
  FETCH_PAYROLL_REQUESTED,
  FETCH_PAYROLL_SUCCEDED,
  FETCH_PAYROLL_REJECTED
} from '../../constants/payroll/Actions'

// Utils
import { api } from '../../utils/api'

export default (startDate, endDate) => async dispatch => {
  try {
    const start = startDate.format('YYYY-MM-DD')
    const end = endDate.format('YYYY-MM-DD')
    dispatch({ type: FETCH_PAYROLL_REQUESTED, payload: `feteching payrolls from ${start} to ${end}` })
    const { data: { data: payload } } = await api.get('walkers/payrolls', {
      start_date: start,
      end_date: end
    })
    dispatch({ type: FETCH_PAYROLL_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PAYROLL_REJECTED, payload: error.message || error.toString() })
  }
}
