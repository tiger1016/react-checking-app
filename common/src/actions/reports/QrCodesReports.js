// Constants
import {
  FETCH_QRCODES_REPORT_REQUESTED,
  FETCH_QRCODES_REPORT_SUCCEDED,
  FETCH_QRCODES_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_QRCODES_REPORT_REQUESTED, payload: `FETCH qrcodes resport` })
    const { data: { data: payload } } = await api.get('/reports/customer_qrcode', { ...data })
    dispatch({ type: FETCH_QRCODES_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_QRCODES_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}
