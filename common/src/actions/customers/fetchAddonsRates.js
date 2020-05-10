// Constants
import {
  FETCH_ADDONS_RATES_REQUESTED,
  FETCH_ADDONS_RATES_SUCCEDED,
  FETCH_ADDONS_RATES_REJECTED
} from '../../constants/customers/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId) => async dispatch => {
  try {
    dispatch({
      type: FETCH_ADDONS_RATES_REQUESTED,
      payload: `Fetching addons rates for customer ${customerId}`
    })
    const { data: { data: payload } } = await api.get(`/customers/${customerId}/addons/rates`)
    dispatch({
      type: FETCH_ADDONS_RATES_SUCCEDED,
      payload,
      user_id: customerId
    })
  } catch (error) {
    dispatch({
      type: FETCH_ADDONS_RATES_REJECTED,
      payload: error.message || error.toString()
    })
  }
}
