// Constants
import {
  FETCH_CUSTOMER_QRCODES_REQUESTED,
  FETCH_CUSTOMER_QRCODES_SUCCEDED,
  FETCH_CUSTOMER_QRCODES_REJECTED
} from '../../constants/profile/Actions'

// Utils
import { api } from '../../utils/api'

export default () => async dispatch => {
  try {
    dispatch({ type: FETCH_CUSTOMER_QRCODES_REQUESTED, payload: `Fetching qrcodes for customer` })
    const { data: { data: availableQrcodes } } = await api.get(`/customers/qr_codes`)
    dispatch({ type: FETCH_CUSTOMER_QRCODES_SUCCEDED, payload: { availableQrcodes } })
  } catch (error) {
    dispatch({ type: FETCH_CUSTOMER_QRCODES_REJECTED, payload: error.message || error.toString() })
  }
}
