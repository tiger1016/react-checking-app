// Constants
import {
  FETCH_CUSTOMER_INFO_REQUESTED,
  FETCH_CUSTOMER_INFO_SUCCEDED,
  FETCH_CUSTOMER_INFO_REJECTED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_CUSTOMER_INFO_REQUESTED, payload: `FETCH fetchCustomerInfo ` })
    const { data: { data: payload } } = await api.get('/reports/get_customers_info')
    dispatch({ type: FETCH_CUSTOMER_INFO_SUCCEDED, payload })
  } catch (error) {
    dispatch({ type: FETCH_CUSTOMER_INFO_REJECTED, payload: error.message || error.toString() })
  }
}
