// Constants
import {
  FETCH_SALES_REPORT_REQUESTED,
  FETCH_SALES_REPORT_SUCCEDED,
  FETCH_SALES_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_SALES_REPORT_REQUESTED, payload: `FETCH sales resport` })
    const { data: { data: payload } } = await api.get('/reports/sales_report', { ...data })
    dispatch({ type: FETCH_SALES_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_SALES_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
