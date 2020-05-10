// Constants
import {
  UPDATE_CUSTOMER_REQUESTED,
  UPDATE_CUSTOMER_SUCCEEDED,
  UPDATE_CUSTOMER_REJECTED
} from '../../constants/customers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, customerData, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_REQUESTED, payload: `Updating customer profile` })
    if (!customerData.password) {
      delete customerData.password
    }

    const { data: { data: payload } } = await api.put(`/customers/${customerId}`, customerData)
    dispatch({ type: UPDATE_CUSTOMER_SUCCEEDED, payload })

    // Notify
    if (notification) notify('success', 'Customer updated successfully.')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
