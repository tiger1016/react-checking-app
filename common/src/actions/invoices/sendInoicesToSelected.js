// Invoices
import {
  EMAIL_SELECTED_INVOICES_REQUESTED,
  EMAIL_SELECTED_INVOICES_SUCCEDED,
  EMAIL_SELECTED_INVOICES_REJECTED
} from '../../constants/invoices/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (data, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: EMAIL_SELECTED_INVOICES_REQUESTED, payload: `Email selected invoices` })
    const { data: { data: payload } } = await api.delete('/invoices/email_selected', { invoices: data })
    dispatch({ type: EMAIL_SELECTED_INVOICES_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Invoice sent!')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: EMAIL_SELECTED_INVOICES_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
