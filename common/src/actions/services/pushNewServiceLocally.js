// Constants
import {
  PUSH_NEW_SERVICE_LOCALLY
} from '../../constants/services/Actions'

// Utils
import { utility } from '../../utils/utility'

/**
 * Creates a new service in local store.
 * To be used as new service to then be uploaded
 * to server.
 * @param  {Object} newService newService object
 * @return {Object}            Redux action object
 */
export default (newService = {}) => ({
  type: PUSH_NEW_SERVICE_LOCALLY,
  payload: {
    ...newService,
    new: true,
    id: utility.guid()
  }
})
