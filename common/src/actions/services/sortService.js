// Constants
import { SORT_SERVICE_LOCALLY } from '../../constants/services/Actions'

/**
   * Set edit service in local store.
   * To be used to edit service name
   * to server.
   * @param  {string} sortBy date/name
   * @return {Object}            Redux action object
   */
export default (sortBy = 'date') => ({
  type: SORT_SERVICE_LOCALLY,
  payload: {
    sortBy: sortBy
  }
})
