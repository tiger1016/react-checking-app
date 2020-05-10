// Constants
import {
  ISSUE_REFUNDS_REQUESTED,
  ISSUE_REFUNDS_SUCCEDED,
  ISSUE_REFUNDS_REJECTED
} from '../../constants/refunds/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, amount, payWith, invoices, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: ISSUE_REFUNDS_REQUESTED, payload: `issue refunds for customer ${customerId}` })
    await api.post('/issue_refund', {
      // This was originally set as query string params, but in docs it says it needs to be post data (ASK which is the correct format)
      amount: amount,
      customer_id: customerId,
      invoices: invoices,
      pay_with: payWith
    })

    const { data: { data: payload } } = await api.get('/refunds')
    dispatch({ type: ISSUE_REFUNDS_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Refund issued')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: ISSUE_REFUNDS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
