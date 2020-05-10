// Constants
import {
  TOGGLE_FILTERS_VIEW
} from '../../constants/scheduler/Actions'

export default b => ({
  type: TOGGLE_FILTERS_VIEW,
  payload: !b
})
