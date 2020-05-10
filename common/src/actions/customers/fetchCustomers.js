// Constants
import {
  FETCH_CUSTOMERS_REQUESTED,
  FETCH_CUSTOMERS_SUCCEEDED,
  FETCH_CUSTOMERS_REJECTED
} from '../../constants/customers/Actions'

// Utils
import { api } from '../../utils/api'

/**
 * Gets all customers
 * @return {Void}
 */
export default (inactive, ids) => async dispatch => {
  try {
    dispatch({
      type: FETCH_CUSTOMERS_REQUESTED,
      payload: `Fetching customers`
    })
    const params = {}
    if (inactive) params['inactive'] = inactive
    if (ids) params['ids'] = ids

    const { data: { data: payload } } = await api.get('/customers', params)
    dispatch({
      type: FETCH_CUSTOMERS_SUCCEEDED,
      payload,
      inactive: true
    })
  } catch (error) {
    dispatch({ type: FETCH_CUSTOMERS_REJECTED, payload: error.message || error.toString() })
  }
}
