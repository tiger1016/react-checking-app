// Constants
import {
  UPDATE_PROFILE_STAFF_PAYROLL_REJECTED,
  UPDATE_PROFILE_STAFF_PAYROLL_REQUESTED,
  UPDATE_PROFILE_STAFF_PAYROLL_SUCCEDED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default ({ automaticPayrollEmail, payrollDate, payrollFrequency, payrollOption }, cb, notification = true) => async dispatch => {
  try {
    let data = {
      payroll_date: (payrollFrequency === 'weekly' || payrollFrequency === 'biweekly') ? 1 : payrollDate,
      payroll_frequency: payrollFrequency
    }

    if (automaticPayrollEmail) {
      data = {
        ...data,
        automatic_payroll_email: automaticPayrollEmail
      }
    }

    // Not implemented yet
    // if (payrollOption) {
    //   params = {
    //     ...params,
    //     payroll_option: payrollOption
    //   }
    // }

    dispatch({ type: UPDATE_PROFILE_STAFF_PAYROLL_REQUESTED, payload: `Uploading profile staff payroll` })
    const { data: { data: payload } } = await api.put('/setting/staff_payroll', data)
    dispatch({ type: UPDATE_PROFILE_STAFF_PAYROLL_SUCCEDED, payload: data })

    // Notify
    if (notification) notify('success', 'Staff payroll updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_STAFF_PAYROLL_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
