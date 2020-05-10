// Models
import BaseModel from '../baseModel'

export default class PaymentModel extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updatePayments (state, { payments }) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      payments
    }
  }

  updateBilling (state, { billing }) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      billing
    }
  }
}

export const paymentModel = new PaymentModel()
