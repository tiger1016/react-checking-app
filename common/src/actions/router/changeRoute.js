// Libraries
// import { push } from 'react-router-redux'

// Constants
import {
  CHANGE_ROUTE
} from '../../constants/Actions'

export default (route, params) => dispatch => {
  // dispatch(push(route))
  dispatch({ type: CHANGE_ROUTE, route: route, params: params })
}
