// Constants
import {
  ISSUE_CREDITS_REQUESTED,
  ISSUE_CREDITS_SUCCEDED,
  ISSUE_CREDITS_REJECTED
} from '../../constants/credits/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, amount, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: ISSUE_CREDITS_REQUESTED, payload: `issue credits` })
    const { data: { data: payload } } = await api.post('/credit_customer', { amount: amount, customer_id: customerId })
    dispatch({ type: ISSUE_CREDITS_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Credit issued')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: ISSUE_CREDITS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
