import {
  CHANGE_ROUTE
} from '../constants/Actions'

// Initial state
import initialstate from '../initialstate/route-init'

export default (state = initialstate, action) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        currentroute: action.route,
        params: action.params
      }
  }
  return state
}
