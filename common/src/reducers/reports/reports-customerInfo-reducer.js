// Constants
import {
  FETCH_CUSTOMER_INFO_REQUESTED,
  FETCH_CUSTOMER_INFO_SUCCEDED,
  FETCH_CUSTOMER_INFO_REJECTED
} from '../../constants/reports/Actions'

// Initial state
import initialstate from '../../initialstate/reports/reports-customerInfo-init'
// Models
import { reportModels } from '../../models/reportModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_INFO_REQUESTED:
      return reportModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_CUSTOMER_INFO_SUCCEDED:
      return reportModels.updateReport(state, { data: action.payload })
    case FETCH_CUSTOMER_INFO_REJECTED:
      return reportModels.error(state, { error: action.payload })
  }
  return state
}
