// Constants
import {
  FETCH_RECEIVABLES_REPORT_REQUESTED,
  FETCH_RECEIVABLES_REPORT_SUCCEDED,
  FETCH_RECEIVABLES_REPORT_REJECTED
} from '../../constants/reports/Actions'

// Initial state
import initialstate from '../../initialstate/reports/reports-receivables-init'
// Models
import { reportModels } from '../../models/reportModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_RECEIVABLES_REPORT_REQUESTED:
      return reportModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_RECEIVABLES_REPORT_SUCCEDED:
      return reportModels.updateReport(state, { data: action.payload })
    case FETCH_RECEIVABLES_REPORT_REJECTED:
      return reportModels.errorAndUpdate(state, { data: { receivables: [] }, error: action.payload })
  }
  return state
}
