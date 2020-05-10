// Invoices
import {
  DELETE_INVOICES_REQUESTED,
  DELETE_INVOICES_SUCCEDED,
  DELETE_INVOICES_REJECTED
} from '../../constants/invoices/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (ids = [], cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: DELETE_INVOICES_REQUESTED, payload: `Delete invoices ${ids}` })
    const { data: { data: { message } } } = await api.delete(`/invoices?ids=${ids.join(',')}`)
    dispatch({ type: DELETE_INVOICES_SUCCEDED, payload: ids })

    // Notify
    if (notification) notify('success', message)

    // Callback
    if (utility.isAFunction(cb)) cb(null, ids)
  } catch (error) {
    dispatch({ type: DELETE_INVOICES_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
