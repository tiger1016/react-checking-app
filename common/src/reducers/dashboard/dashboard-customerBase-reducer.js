// Constants
import {
  FETCH_CUSTOMER_BASE_REJECTED,
  FETCH_CUSTOMER_BASE_REQUESTED,
  FETCH_CUSTOMER_BASE_SUCCEDED
} from '../../constants/dashboard/Actions'

// Initial state
import initialstate from '../../initialstate/dashboard/dashboard-customerBase-init'
// Models
import { dashboardModels } from '../../models/dashboardModels'
export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER_BASE_REQUESTED:
      return dashboardModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_CUSTOMER_BASE_SUCCEDED:
      return dashboardModels.updateDashboard(state, { customerBase: action.payload })
    case FETCH_CUSTOMER_BASE_REJECTED:
      return dashboardModels.error(state, { error: action.payload })
  }
  return state
}
