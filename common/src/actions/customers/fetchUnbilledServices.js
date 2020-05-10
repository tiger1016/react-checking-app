// Invoices
import {
  FETCH_UNBILLED_SERVICES_REQUESTED,
  FETCH_UNBILLED_SERVICES_SUCCEDED,
  FETCH_UNBILLED_SERVICES_REJECTED
} from '../../constants/customers/Actions'

// Functions
import { notify } from '../../functions/app'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, cb, startDate, endDate, notification = true) => async dispatch => {
  try {
    dispatch({ type: FETCH_UNBILLED_SERVICES_REQUESTED, payload: `Fetching customer unbilled services ${customerId}` })
    const { data: { data: { walks } } } = startDate && endDate
      ? await api.get(`invoices/unbilled_services/${customerId}/?start_date=${startDate}&end_date=${endDate}`)
      : await api.get(`invoices/unbilled_services/${customerId}`)

    dispatch({ type: FETCH_UNBILLED_SERVICES_SUCCEDED, payload: { customerId, walks } })

    // Callback
    if (utility.isAFunction(cb)) cb(null, { customerId, walks })
  } catch (error) {
    dispatch({ type: FETCH_UNBILLED_SERVICES_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
