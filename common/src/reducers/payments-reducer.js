// Constants
import {
  FETCH_PAYMENTS_REQUESTED,
  FETCH_PAYMENTS_SUCCEDED,
  FETCH_PAYMENTS_REJECTED,

  UPDATE_PAYMENTS_REQUESTED,
  UPDATE_PAYMENTS_SUCCEDED,
  UPDATE_PAYMENTS_REJECTED,

  CREDITS_ERROR,

  UPDATE_BILLING_PAYMENTS_REQUESTED,
  UPDATE_BILLING_PAYMENTS_SUCCEDED,
  UPDATE_BILLING_PAYMENTS_REJECTED,

  FETCH_BILLING_REQUESTED,
  FETCH_BILLING_SUCCEDED,
  FETCH_BILLING_REJECTED,

  RECEIVE_PAYMENTS_REQUESTED,
  RECEIVE_PAYMENTS_SUCCEDED,
  RECEIVE_PAYMENTS_REJECTED
} from '../constants/payments/Actions'

// Initial state
import initialstate from '../initialstate/payments-init'
// Models
import { paymentModel } from '../models/paymentModel'

export default (state = initialstate, action) => {
  switch (action.type) {
    /*
    Requested
     */
    case FETCH_PAYMENTS_REQUESTED:
    case RECEIVE_PAYMENTS_REQUESTED:
    case UPDATE_PAYMENTS_REQUESTED:
    case UPDATE_BILLING_PAYMENTS_REQUESTED:
    case FETCH_BILLING_REQUESTED:
      return paymentModel.loadingWithMessage(state, { message: action.payload })

    /*
    Rejected
    */
    case FETCH_PAYMENTS_REJECTED:
    case RECEIVE_PAYMENTS_REJECTED:
    case UPDATE_BILLING_PAYMENTS_REJECTED:
    case UPDATE_PAYMENTS_REJECTED:
    case FETCH_BILLING_REJECTED:
    case CREDITS_ERROR:
      return paymentModel.error(state, { error: action.payload })

    /*
    Succeded
    */
    case FETCH_PAYMENTS_SUCCEDED:
      return paymentModel.updatePayments(state, { payments: action.payload })
    case UPDATE_PAYMENTS_SUCCEDED:
      return paymentModel.updatePayments(state, { payments: state.payments })
    case RECEIVE_PAYMENTS_SUCCEDED:
      return paymentModel.updatePayments(state, { payments: state.payments })
    case UPDATE_BILLING_PAYMENTS_SUCCEDED:
      return paymentModel.updateBilling(state, { billings: state.billings })
    case FETCH_BILLING_SUCCEDED:
      return paymentModel.updateBilling(state, { billings: action.payload })
  }
  return state
}
