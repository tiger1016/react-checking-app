// Constants
import {
  SET_SERVICE_EDITMODE_LOCALLY
} from '../../constants/services/Actions'

/**
   * Set edit service in local store.
   * To be used to edit service name
   * to server.
   * @param  {Object} service service to edit
   * @param  {boolean} editMode true/false
   * @return {Object}            Redux action object
   */
export default (service = {}, editMode = false) => ({
  type: SET_SERVICE_EDITMODE_LOCALLY,
  payload: {
    ...service,
    editMode: editMode
  }
})
