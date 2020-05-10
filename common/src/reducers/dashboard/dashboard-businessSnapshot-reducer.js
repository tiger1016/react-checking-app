// Constants
import {
  FETCH_BUSINESS_SNAPSHOT_REJECTED,
  FETCH_BUSINESS_SNAPSHOT_REQUESTED,
  FETCH_BUSINESS_SNAPSHOT_SUCCEDED
} from '../../constants/dashboard/Actions'

// Initial state
import initialstate from '../../initialstate/dashboard/dashboard-businessSnapshot-init'

// Models
import { dashboardModels } from '../../models/dashboardModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_BUSINESS_SNAPSHOT_REQUESTED:
      return dashboardModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_BUSINESS_SNAPSHOT_SUCCEDED:
      return dashboardModels.updateDashboard(state, { businessSnapshot: action.payload })
    case FETCH_BUSINESS_SNAPSHOT_REJECTED:
      return dashboardModels.error(state, { error: action.payload })
  }
  return state
}
