// Constants
import {
  UPDATE_PROFILE_SCHEDULER_SETTINGS_REJECTED,
  UPDATE_PROFILE_SCHEDULER_SETTINGS_REQUESTED,
  UPDATE_PROFILE_SCHEDULER_SETTINGS_SUCCEDED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (profile, cb, notification = true) => async dispatch => {
  try {
    const data = {
      cancel_deadline_days: profile.cancel_deadline_days,
      cancel_deadline_time: profile.cancel_deadline_time,
      edit_deadline_days: profile.edit_deadline_days,
      edit_deadline_time: profile.edit_deadline_time,
      enable_cancel_deadlines: profile.enable_cancel_deadlines,
      enable_edit_deadlines: profile.enable_edit_deadlines,
      enable_request_deadlines: profile.enable_request_deadlines,
      request_deadline_days: profile.request_deadline_days,
      request_deadline_time: profile.request_deadline_time
    }

    dispatch({ type: UPDATE_PROFILE_SCHEDULER_SETTINGS_REQUESTED, payload: `Updating scheduler settings` })
    const { data: { data: payload } } = await api.put('/setting/scheduler', data)
    dispatch({ type: UPDATE_PROFILE_SCHEDULER_SETTINGS_SUCCEDED, payload: data || payload })

    // Notify
    if (notification) notify('success', 'Scheduler settings saved')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_SCHEDULER_SETTINGS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
