// Constants
import {
  UPDATE_SERVICE_RATES_REJECTED,
  UPDATE_SERVICE_RATES_REQUESTED,
  UPDATE_SERVICE_RATES_SUCCEDED
} from '../../constants/customers/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId, customerData) => async dispatch => {
  try {
    dispatch({ type: UPDATE_SERVICE_RATES_REQUESTED, payload: `Updating customer profile` })
    // There was an error on the original call -> api_handler.axios.put('/customers/' + customerId + '/services/rates' + '?jwt=' + jwt + customerData)
    const { data: { data: payload } } = await api.put(`/customers/${customerId}/services/rates`, customerData)
    dispatch({ type: UPDATE_SERVICE_RATES_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: UPDATE_SERVICE_RATES_REJECTED, payload: error.message || error.toString() })
  }
}
