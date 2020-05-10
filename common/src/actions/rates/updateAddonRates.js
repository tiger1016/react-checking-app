// Constants
import {
  UPDATE_ADDON_RATES_REJECTED,
  UPDATE_ADDON_RATES_REQUESTED,
  UPDATE_ADDON_RATES_SUCCEDED
} from '../../constants/customers/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId, customerData) => async dispatch => {
  try {
    dispatch({ type: UPDATE_ADDON_RATES_REQUESTED, payload: `Updating Add on Rates` })
    // There was an error on the original call -> api_handler.axios.put('/customers/' + id + '/addons/rates' + '?jwt=' + jwt + customerData)
    const { data: { data: payload } } = await api.put(`/customers/${customerId}/addons/rates`, customerData)
    dispatch({ type: UPDATE_ADDON_RATES_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: UPDATE_ADDON_RATES_REJECTED, payload: error.message || error.toString() })
  }
}
