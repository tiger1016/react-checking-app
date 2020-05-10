// Constants
import {
  TOGGLE_CUSTOMER_STATUS_REQUESTED,
  TOGGLE_CUSTOMER_STATUS_SUCCEDED,
  TOGGLE_CUSTOMER_STATUS_REJECTED
} from '../../constants/customers/Actions'
import {
  ARCHIVE_PETS_OF_CUSTOMER_SUCCEEDED
} from '../../constants/pets/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, status, cb, notification = true) => async dispatch => {
  try {
    dispatch({
      type: TOGGLE_CUSTOMER_STATUS_REQUESTED,
      payload: `change  customer status`
    })
    const { data: { data: payload } } = await api.delete(`/customers/archive/${customerId}`)
    dispatch({
      type: TOGGLE_CUSTOMER_STATUS_SUCCEDED,
      payload,
      customerId: customerId
    })
    dispatch({
      type: ARCHIVE_PETS_OF_CUSTOMER_SUCCEEDED,
      payload: { customer_id: customerId, archive: payload.active }
    })

    // Notify
    if (notification) notify('success', 'Customer status Changed')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: TOGGLE_CUSTOMER_STATUS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
