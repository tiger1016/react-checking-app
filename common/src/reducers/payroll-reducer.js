// Constants

import {
  FETCH_PAYROLL_REQUESTED,
  FETCH_PAYROLL_SUCCEDED,
  FETCH_PAYROLL_REJECTED,

  SEND_PAYROLL_REPORT_REQUESTED,
  SEND_PAYROLL_REPORT_SUCCEDED,
  SEND_PAYROLL_REPORT_REJECTED
} from '../constants/payroll/Actions'

// Initial state
import initialstate from '../initialstate/payrolls-init'
// Models
import { payrollsModel } from '../models/payrollsModel'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
    */
    case FETCH_PAYROLL_REQUESTED:
      return payrollsModel.loadingWithMessage(state, { message: action.payload })
    /*
    Rejected
    */
    case FETCH_PAYROLL_REJECTED:
      return payrollsModel.error(state, { error: action.payload })

    /*
    Succeded
    */
    case FETCH_PAYROLL_SUCCEDED:
      return payrollsModel.updatePayrolls(state, { payrolls: action.payload.payrolls })

    case SEND_PAYROLL_REPORT_REQUESTED:
      return payrollsModel.loadingReportWithMessage(state, { message: action.payload })
    case SEND_PAYROLL_REPORT_SUCCEDED:
      return payrollsModel.reportError(state, { error: action.payload })

    case SEND_PAYROLL_REPORT_REJECTED:
      return payrollsModel.updatePayrollReport(state)
  }
  return state
}
