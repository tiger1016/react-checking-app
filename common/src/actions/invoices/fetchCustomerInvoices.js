// Invoices
import {
  FETCH_INVOICES_REQUESTED,
  FETCH_INVOICES_SUCCEDED,
  FETCH_INVOICES_REJECTED
} from '../../constants/invoices/Actions'

// Functions
import { notify } from '../../functions/app'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: FETCH_INVOICES_REQUESTED, payload: `Fetching customer profile for cutomer ${customerId}` })
    const { data: { data: { invoice: payload } } } = await api.get(`invoices?user_id=${customerId}`)
    dispatch({ type: FETCH_INVOICES_SUCCEDED, payload, overwrite: false })
  } catch (error) {
    dispatch({ type: FETCH_INVOICES_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
