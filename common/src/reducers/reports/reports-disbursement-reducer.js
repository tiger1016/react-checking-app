
// Constants
import {
  FETCH_DISBURSEMENT_REPORT_REQUESTED,
  FETCH_DISBURSEMENT_REPORT_SUCCEDED,
  FETCH_DISBURSEMENT_REPORT_REJECTED,
  FETCH_DISBURSEMENT_DETAIL_SUCCEDED,
  FETCH_DISBURSEMENT_DETAIL_REJECTED,
  CLEAR_DISBURSEMENT_DETAIL
} from '../../constants/reports/Actions'

// Initial state
import initialstate from '../../initialstate/reports/reports-disbursement-init'
// Models
import { reportModels } from '../../models/reportModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_DISBURSEMENT_REPORT_REQUESTED:
      return reportModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_DISBURSEMENT_REPORT_SUCCEDED:
      return reportModels.updateReport(state, { data: action.payload })
    case FETCH_DISBURSEMENT_REPORT_REJECTED:
      return reportModels.error(state, { error: action.payload })
    case FETCH_DISBURSEMENT_DETAIL_SUCCEDED:
      return reportModels.selectDetails(state, { data: action.payload })
    case FETCH_DISBURSEMENT_DETAIL_REJECTED:
      return reportModels.error(state, { error: action.payload })
    case CLEAR_DISBURSEMENT_DETAIL:
      return reportModels.clearDetails(state)
  }
  return state
}
