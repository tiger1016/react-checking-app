// Constants
import {
  SELECT_ALL_WALKS
} from '../../constants/scheduler/Actions'

export default (bool = true) => ({
  type: SELECT_ALL_WALKS,
  payload: bool
})
