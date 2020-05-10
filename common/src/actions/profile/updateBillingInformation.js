// Constants
import {
  UPDATE_PROFILE_BILLING_INFORMATION_REJECTED,
  UPDATE_PROFILE_BILLING_INFORMATION_REQUESTED,
  UPDATE_PROFILE_BILLING_INFORMATION_SUCCEDED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default ({ billingDate, billingFrequency, billingTiming }, cb, notification = true) => async dispatch => {
  try {
    const data = {
      default_billing_date: (billingFrequency === 'weekly' || billingFrequency === 'biweekly') ? 1 : billingDate,
      default_billing_frequency: billingFrequency,
      default_billing_timing: billingTiming
    }

    dispatch({ type: UPDATE_PROFILE_BILLING_INFORMATION_REQUESTED, payload: `Updating profile billing inforamtion` })
    const { data: { data: payload } } = await api.put('/setting/customer_billing', data)
    dispatch({ type: UPDATE_PROFILE_BILLING_INFORMATION_SUCCEDED, payload: data || payload })

    // Notify
    if (notification) notify('success', 'Billing information saved')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_BILLING_INFORMATION_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
