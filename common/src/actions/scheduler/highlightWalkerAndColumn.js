// Constants
import {
  HIGHLIGHT_WALKER_AND_TIME
} from '../../constants/scheduler/Actions'

export default (walkerId, columnData = {}) => ({
  type: HIGHLIGHT_WALKER_AND_TIME,
  payload: { walkerId, columnData: columnData || {} }
})
