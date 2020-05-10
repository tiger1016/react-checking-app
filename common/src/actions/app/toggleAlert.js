// Constants
import {
  TOGGLE_ALERT
} from '../../constants/app/Actions'

export default ({ alertIsVisible = true, alertData = {} }) => ({
  type: TOGGLE_ALERT,
  payload: { alertIsVisible, alertData }
})
