// Constants
import {
  PUSH_NEW_ADDON_LOCALLY
} from '../../constants/addons/Actions'

// Utils
import { utility } from '../../utils/utility'

/**
 * Creates a new addon in local store.
 * To be used as new addon to then be uploaded
 * to server.
 * @param  {Object} newAddon newAddon object
 * @return {Object}            Redux action object
 */
export default (newAddon = {}) => ({
  type: PUSH_NEW_ADDON_LOCALLY,
  payload: {
    ...newAddon,
    new: true,
    id: utility.guid()
  }
})
