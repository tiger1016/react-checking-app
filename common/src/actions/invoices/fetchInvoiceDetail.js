// Invoices
import {
  FETCH_INVOICE_DETAIL_REQUESTED,
  FETCH_INVOICE_DETAIL_SUCCEDED,
  FETCH_INVOICE_DETAIL_REJECTED
} from '../../constants/invoices/Actions'

// Functions
import { notify } from '../../functions/app'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (invoiceId, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: FETCH_INVOICE_DETAIL_REQUESTED, payload: `Fetching invoice term for invoice ${invoiceId}` })

    const { data: { data: { invoice: payload } } } = await api.get(`invoices/${invoiceId}`)
    dispatch({ type: FETCH_INVOICE_DETAIL_SUCCEDED, payload })

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: FETCH_INVOICE_DETAIL_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
