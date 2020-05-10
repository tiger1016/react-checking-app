// Constants
import {
  CREATE_CUSTOMER_PROFILE_INFO_REQUESTED,
  CREATE_CUSTOMER_PROFILE_INFO_SUCCEDED,
  CREATE_CUSTOMER_PROFILE_INFO_REJECTED
} from '../../constants/customers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerData, profileInfo, cb, notification = true) => async dispatch => {
  try {
    const { userId, customerId } = customerData
    dispatch({ type: CREATE_CUSTOMER_PROFILE_INFO_REQUESTED, payload: `Updating customer profile for customer ${customerId}` })
    const { data: { data: payload } } = await api.post(`/customers/${userId}/${customerId}`, profileInfo)
    dispatch({ type: CREATE_CUSTOMER_PROFILE_INFO_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'customer profile updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: CREATE_CUSTOMER_PROFILE_INFO_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
