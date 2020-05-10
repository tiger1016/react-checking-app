// Constants
import {
  FETCH_REVENUE_REJECTED,
  FETCH_REVENUE_REQUESTED,
  FETCH_REVENUE_SUCCEDED
} from '../../constants/dashboard/Actions'

// Initial state
import initialstate from '../../initialstate/dashboard/dashboard-revenue-init'
// Models
import { dashboardModels } from '../../models/dashboardModels'
export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_REVENUE_REQUESTED:
      return dashboardModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_REVENUE_SUCCEDED:
      return dashboardModels.updateDashboard(state, { revenue: action.payload })
    case FETCH_REVENUE_REJECTED:
      return dashboardModels.error(state, { error: action.payload })
  }
  return state
}
