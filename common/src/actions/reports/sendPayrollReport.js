// Constants
import {
  SEND_PAYROLL_REPORT_REQUESTED,
  SEND_PAYROLL_REPORT_SUCCEDED,
  SEND_PAYROLL_REPORT_REJECTED
} from '../../constants/payroll/Actions'

// Functions
import { notify } from '../../functions/app'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (payrollId, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: SEND_PAYROLL_REPORT_REQUESTED, payload: `send payroll report` })
    const { data: { data: payload } } = await api.get(`/reports/report_payroll/${payrollId}`)
    dispatch({ type: SEND_PAYROLL_REPORT_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Report Sent Successfully')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: SEND_PAYROLL_REPORT_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
