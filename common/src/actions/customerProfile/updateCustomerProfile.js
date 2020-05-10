// Constants
import {
  UPDATE_CUSTOMER_PROFILE_REQUESTED,
  UPDATE_CUSTOMER_PROFILE_SUCCEDED,
  UPDATE_CUSTOMER_PROFILE_REJECTED
} from '../../constants/customers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, customerData, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_PROFILE_REQUESTED, payload: `Updating customer profile` })
    const { data: { data: payload } } = await api.put(`/customers/${customerId}`, customerData)
    dispatch({ type: UPDATE_CUSTOMER_PROFILE_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'customer info updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_PROFILE_REJECTED, payload: error.message || error.toString() })
    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
