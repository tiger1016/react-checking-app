// Constants
import {
  FETCH_STAFFPAYROLL_REPORT_REQUESTED,
  FETCH_STAFFPAYROLL_REPORT_SUCCEDED,
  FETCH_STAFFPAYROLL_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Initial state
import initialstate from '../../initialstate/reports/reports-payroll-init'
// Models
import { reportModels } from '../../models/reportModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
      Requested
     */
    case FETCH_STAFFPAYROLL_REPORT_REQUESTED:
      return reportModels.loadingWithMessage(state, { message: action.payload })
      /*
      Succeded
     */
    case FETCH_STAFFPAYROLL_REPORT_SUCCEDED:
      return reportModels.updateReport(state, { data: action.payload })
      /*
      Rejected
     */
    case FETCH_STAFFPAYROLL_REPORT_REJECTED:
      return reportModels.error(state, { error: action.payload })
  }
  return state
}
