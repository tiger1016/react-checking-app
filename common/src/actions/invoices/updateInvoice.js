// Invoices
import {
  UPDATE_INVOICE_REQUESTED,
  UPDATE_INVOICE_SUCCEDED,
  UPDATE_INVOICE_REJECTED
} from '../../constants/invoices/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (invoiceId, invoiceData, cb, notififications = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_INVOICE_REQUESTED, payload: `Updating invoice ${invoiceId}` })
    const { data: { data: { invoice: payload, message } } } = await api.put(`invoices/${invoiceId}`, invoiceData)
    dispatch({ type: UPDATE_INVOICE_SUCCEDED, payload, oldInvoiceId: invoiceId })

    // Notify
    if (notififications) notify('success', message)

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_INVOICE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notififications) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
