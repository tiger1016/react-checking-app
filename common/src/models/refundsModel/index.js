// Models
import BaseModel from '../baseModel'

export default class RefundsModel extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updateRefunds (state, { refunds }) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      refunds
    }
  }
}

export const refundsModel = new RefundsModel()
