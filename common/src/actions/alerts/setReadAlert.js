// Constants
import {
  SET_READ_ALERT
} from '../../constants/alerts/Actions'

export default (alertId) => ({ type: SET_READ_ALERT, payload: alertId })
