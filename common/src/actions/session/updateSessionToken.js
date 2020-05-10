// Constants
import {
  UPDATE_SESSION_TOKEN
} from '../../constants/session/Actions'

export default (token = '') => ({ type: UPDATE_SESSION_TOKEN, payload: token })
