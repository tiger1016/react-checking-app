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

export default (startDate, endDate, status, cb, notification = true) => async dispatch => {
  try {
    const param = {}

    if (startDate) {
      param.start_date = startDate.format('YYYY-MM-DD')
    } else if (!status || status === 'all' || status === 'paid') {
      param.offset = 200
      param.page = 1
    }

    if (!startDate && status) {
      param.status = status === 'unpaid' ? 'unpaid,partial' : status
    }

    if (endDate) {
      param.end_date = endDate.format('YYYY-MM-DD')
    }

    dispatch({ type: FETCH_INVOICES_REQUESTED, payload: `Fetching invoices` })

    const { data: { data: { invoices: payload, count } } } = await api.get('invoices/licensee', param)
    dispatch({ type: FETCH_INVOICES_SUCCEDED, payload, ...param, count })
  } catch (error) {
    dispatch({ type: FETCH_INVOICES_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
