// Constants
import {
  UPDATE_SERVICE_RATES_REJECTED,
  UPDATE_SERVICE_RATES_REQUESTED,
  UPDATE_SERVICE_RATES_SUCCEDED
} from '../../constants/customers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

// There was an error on the original call -> api_handler.axios.put('/customers/' + customerId + '/services/rates' + '?jwt=' + jwt + customerData)
export default (customerId, customerData, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_SERVICE_RATES_REQUESTED, payload: `Updating customer profile` })
    const { data: { data: payload } } = await api.put(`/customers/${customerId}/services/rates`, customerData)
    dispatch({ type: UPDATE_SERVICE_RATES_SUCCEDED, payload, user_id: customerId })

    // Notify
    if (notification) notify('success', 'Service Rate updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_SERVICE_RATES_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
