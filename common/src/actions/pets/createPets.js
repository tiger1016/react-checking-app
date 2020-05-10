import {
  ADD_CUSTOMER_PET_REJECTED,
  ADD_CUSTOMER_PET_REQUESTED,
  ADD_CUSTOMER_PET_SUCCEEDED
} from '../../constants/customers/Actions'
import {
  ADD_PET_SUCCEDED,
  ADD_PET_REJECTED,
  ADD_PET_REQUESTED } from '../../constants/pets/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, customerData, cb, notification = true) => async dispatch => {
  try {
    const data = new window.FormData()
    for (var key in customerData) {
      data.append(key, customerData[key])
    }

    dispatch({ type: ADD_CUSTOMER_PET_REQUESTED, payload: `Creating Customer Pet` })
    dispatch({ type: ADD_PET_REQUESTED, payload: `Creating Pet` })

    const { data: { data: payload } } = await api.post(`/pets/${customerId}`, data)

    dispatch({ type: ADD_CUSTOMER_PET_SUCCEEDED, payload, customerId })
    dispatch({ type: ADD_PET_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Pet Added Successfully.')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: ADD_CUSTOMER_PET_REJECTED, payload: error.message || error.toString() })
    dispatch({ type: ADD_PET_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
