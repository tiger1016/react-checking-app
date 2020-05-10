// Constants
import {
  FETCH_TRANSACTION_REPORT_REQUESTED,
  FETCH_TRANSACTION_REPORT_SUCCEDED,
  FETCH_TRANSACTION_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Initial state
import initialstate from '../../initialstate/reports/reports-transaction-init'
// Models
import { reportModels } from '../../models/reportModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_TRANSACTION_REPORT_REQUESTED:
      return reportModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_TRANSACTION_REPORT_SUCCEDED:
      return reportModels.updateReport(state, { data: action.payload })
    case FETCH_TRANSACTION_REPORT_REJECTED:
      return reportModels.error(state, { error: action.payload })
  }
  return state
}
