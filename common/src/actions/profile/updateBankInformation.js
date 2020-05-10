// Constants
import {
  UPDATE_PROFILE_BANK_INFORMATION_REJECTED,
  UPDATE_PROFILE_BANK_INFORMATION_REQUESTED,
  UPDATE_PROFILE_BANK_INFORMATION_SUCCEDED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (bankInfo = {}, cb, notification = true) => async dispatch => {
  try {
    const data = {
      bank_account_number: bankInfo.bank_account_number,
      bank_routing_number: bankInfo.bank_routing_number,
      birth_day: bankInfo.birth_day < 10 ? '0' + bankInfo.birth_day : bankInfo.birth_day,
      birth_month: bankInfo.birth_month < 10 ? '0' + bankInfo.birth_month : bankInfo.birth_month,
      birth_year: bankInfo.birth_year,
      fein_number: bankInfo.fein_number,
      social_number: bankInfo.social_number
    }

    dispatch({ type: UPDATE_PROFILE_BANK_INFORMATION_REQUESTED, payload: `updating profile bank information` })
    await api.put('/profile/update_bankinformation', data)
    const { data: { data: payload } } = await api.get('/profile/getbankinformation')
    dispatch({ type: UPDATE_PROFILE_BANK_INFORMATION_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Bank information saved')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_BANK_INFORMATION_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
