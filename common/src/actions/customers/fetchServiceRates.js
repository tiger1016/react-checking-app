// Constants
import {
  FETCH_SERVICE_RATES_REQUESTED,
  FETCH_SERVICE_RATES_SUCCEDED,
  FETCH_SERVICE_RATES_REJECTED
} from '../../constants/customers/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId) => async dispatch => {
  try {
    dispatch({
      type: FETCH_SERVICE_RATES_REQUESTED,
      payload: `Fetching service rates for customer ${customerId}`
    })
    const { data: { data: payload } } = await api.get(`/customers/${customerId}/services/rates`)
    dispatch({
      type: FETCH_SERVICE_RATES_SUCCEDED,
      payload,
      user_id: customerId
    })
  } catch (error) {
    dispatch({
      type: FETCH_SERVICE_RATES_REJECTED,
      payload: error.message || error.toString()
    })
  }
}
