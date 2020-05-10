// Constants
import {
  FETCH_TOP_ZIPS_REJECTED,
  FETCH_TOP_ZIPS_REQUESTED,
  FETCH_TOP_ZIPS_SUCCEDED
} from '../../constants/dashboard/Actions'

// Initial state
import initialstate from '../../initialstate/dashboard/dashboard-topZips-init'
// Models
import { dashboardModels } from '../../models/dashboardModels'
export default (state = initialstate, action) => {
  switch (action.type) {
    case FETCH_TOP_ZIPS_REQUESTED:
      return dashboardModels.loadingWithMessage(state, { message: action.payload })
    case FETCH_TOP_ZIPS_SUCCEDED:
      return dashboardModels.updateDashboard(state, { topZips: action.payload })
    case FETCH_TOP_ZIPS_REJECTED:
      return dashboardModels.error(state, { error: action.payload })
  }
  return state
}
