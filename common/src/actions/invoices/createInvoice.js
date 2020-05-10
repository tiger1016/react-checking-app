// Invoices
import {
  CREATE_INVOICES_REQUESTED,
  CREATE_INVOICES_SUCCEDED,
  CREATE_INVOICES_REJECTED
} from '../../constants/invoices/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (newInvoice, cb, notification = true) => async dispatch => {
  dispatch({ type: CREATE_INVOICES_REQUESTED, payload: `Create Invoice` })

  try {
    const { data: { invoice, items, message } } = await api.post('invoices', newInvoice)
    const payload = { ...invoice, items }
    dispatch({ type: CREATE_INVOICES_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', message)

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: CREATE_INVOICES_REJECTED, payload: (error.message || error.toString()) })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
