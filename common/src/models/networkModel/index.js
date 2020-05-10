// Models
import BaseModel from '../baseModel'

export default class NetworkModel extends BaseModel {
  error (state, { error }) {
    return {
      ...state,
      loading: true,
      loadingMessage: null,
      online: false,
      error
    }
  }

  loadingWithMessage (state, { loadingMessage }) {
    return {
      ...state,
      loading: true,
      loadingMessage,
      error: null
    }
  }

  /**
   * Updates network, turns of loading & loading message, and resets error
   * @param  {Object} state           Network reducer state
   * @param  {Array}  options.network  Network action payload
   * @return {Object}                 Return new reducer state
   */
  updateNetworkStatus (state, { online }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      online,
      error: null
    }
  }
}

export const networkModel = new NetworkModel()
