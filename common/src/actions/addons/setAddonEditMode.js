// Constants
import {
  SET_ADDON_EDITMODE_LOCALLY
} from '../../constants/addons/Actions'

/**
   * Set edit addon in local store.
   * To be used to edit addon name
   * to server.
   * @param  {int} id id of addon to edit
   * @param  {boolean} editMode true/false
   * @return {Object}            Redux action object
   */
export default (addon = {}, editMode = false) => ({
  type: SET_ADDON_EDITMODE_LOCALLY,
  payload: {
    ...addon,
    editMode: editMode
  }
})
