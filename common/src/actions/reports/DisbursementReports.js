// Constants
import {
  FETCH_DISBURSEMENT_REPORT_REQUESTED,
  FETCH_DISBURSEMENT_REPORT_SUCCEDED,
  FETCH_DISBURSEMENT_REPORT_REJECTED,
  FETCH_DISBURSEMENT_DETAIL_SUCCEDED,
  FETCH_DISBURSEMENT_DETAIL_REJECTED,
  CLEAR_DISBURSEMENT_DETAIL
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_DISBURSEMENT_REPORT_REQUESTED, payload: `FETCH payroll resport` })
    const { data: { data: payload } } = await api.get('/reports/disbursement_report', { ...data })
    dispatch({ type: FETCH_DISBURSEMENT_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_DISBURSEMENT_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}

export const getDisbursementReports = (data) => async dispatch => {
  try {
    dispatch({ type: FETCH_DISBURSEMENT_REPORT_REQUESTED, payload: `FETCH payroll resport` })
    const { data: { data: payload } } = await api.get('/reports/disbursement_report', { ...data })
    dispatch({ type: FETCH_DISBURSEMENT_REPORT_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_DISBURSEMENT_REPORT_REJECTED, payload: error.message || error.toString() })
  }
}

export const getDisbursementDetail = (data) => async dispatch => {
  try {
    const { data: { data: payload } } = await api.get('/reports/disbursement/detail', { ...data })
    dispatch({ type: FETCH_DISBURSEMENT_DETAIL_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_DISBURSEMENT_DETAIL_REJECTED, payload: error.message || error.toString() })
  }
}

export const clearDisbursementDetail = () => ({ type: CLEAR_DISBURSEMENT_DETAIL })
