// Constants
import {
  FETCH_BUSY_HOURS_REJECTED,
  FETCH_BUSY_HOURS_REQUESTED,
  FETCH_BUSY_HOURS_SUCCEDED
} from '../../constants/dashboard/Actions'

// Initial state
import initialstate from '../../initialstate/dashboard/dashboard-busyHours-init'

// Models
import { dashboardModels } from '../../models/dashboardModels'

export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_BUSY_HOURS_REQUESTED:
      return dashboardModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_BUSY_HOURS_SUCCEDED:
      return dashboardModels.updateDashboard(state, { busyHours: action.payload })
    case FETCH_BUSY_HOURS_REJECTED:
      return dashboardModels.error(state, { error: action.payload })
  }
  return state
}
