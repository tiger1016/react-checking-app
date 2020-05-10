// Invoices
import {
  DELETE_CUSTOMER_REQUESTED,
  DELETE_CUSTOMER_SUCCEEDED,
  DELETE_CUSTOMER_REJECTED
} from '../../constants/customers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, cb, notification = true) => async dispatch => {
  try {
    dispatch({
      type: DELETE_CUSTOMER_REQUESTED,
      payload: `Deleting customer ${customerId}`
    })
    const { data: { data: payload } } = await api.delete(`/customers/archive/${customerId}`)
    dispatch({ type: DELETE_CUSTOMER_SUCCEEDED, payload })

    // Notify
    if (notification) notify('success', 'Customer deleted')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER_REJECTED,
      payload: error.message || error.toString()
    })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
