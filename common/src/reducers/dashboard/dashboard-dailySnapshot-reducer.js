// Constants
import {
  FETCH_DAILY_SNAPSHOT_REQUESTED,
  FETCH_DAILY_SNAPSHOT_SUCCEDED,
  FETCH_DAILY_SNAPSHOT_REJECTED
} from '../../constants/dashboard/Actions'

// Initial state
import initialstate from '../../initialstate/dashboard/dashboard-dailySnapshot-init'
// Models
import { dashboardModels } from '../../models/dashboardModels'
export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_DAILY_SNAPSHOT_REQUESTED:
      return dashboardModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_DAILY_SNAPSHOT_SUCCEDED:
      return dashboardModels.updateDashboard(state, { dailySnapshot: action.payload })
    case FETCH_DAILY_SNAPSHOT_REJECTED:
      return dashboardModels.error(state, { error: action.payload })
  }
  return state
}
