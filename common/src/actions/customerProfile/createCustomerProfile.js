// Constants
import {
  CREATE_CUSTOMER_PROFILE_REQUESTED,
  CREATE_CUSTOMER_PROFILE_SUCCEEDED,
  CREATE_CUSTOMER_PROFILE_REJECTED
} from '../../constants/customers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerData, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: CREATE_CUSTOMER_PROFILE_REQUESTED, payload: `Updating customer profile` })
    const { data: { data: payload } } = await api.post('/customers/add', customerData)
    dispatch({ type: CREATE_CUSTOMER_PROFILE_SUCCEEDED, payload })

    // Notify
    if (notification) notify('success', 'Customer created')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: CREATE_CUSTOMER_PROFILE_REJECTED, payload: error.message || error.toString() })
    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
