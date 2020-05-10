// Invoices
import {
  FETCH_PAYROLL_REPORT_REQUESTED,
  FETCH_PAYROLL_REPORT_SUCCEDED,
  FETCH_PAYROLL_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (startDate, endDate) => async dispatch => {
  try {
    const start = startDate.format('YYYY-MM-DD')
    const end = endDate.format('YYYY-MM-DD')

    dispatch({ type: FETCH_PAYROLL_REPORT_REQUESTED, payload: `deleting selected invoices from ${start} to ${end}` })
    const { data: { data: payload } } = await api.get('reports/all_payroll', {
      start_date: start,
      end_date: end
    })
    dispatch({ type: FETCH_PAYROLL_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_PAYROLL_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
