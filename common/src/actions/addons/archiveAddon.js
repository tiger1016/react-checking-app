// Constants
import {
  ARCHIVE_ADDON_REQUESTED,
  ARCHIVE_ADDON_SUCCEDED,
  ARCHIVE_ADDON_REJECTED
} from '../../constants/addons/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (addonId, archive, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: ARCHIVE_ADDON_REQUESTED, payload: `Archive addon ${addonId}` })
    const { data: { data } } = await api.post(`/addons/archive_addon/${addonId}?archive=${archive}`)

    dispatch({ type: ARCHIVE_ADDON_SUCCEDED, payload: addonId })

    // Notify
    if (notification) {
      notify('success', Number(archive) ? 'Add-on Deactivated' : 'Add-on Activated')
    }

    // Callback
    if (utility.isAFunction(cb)) cb(null, data)
  } catch (error) {
    dispatch({ type: ARCHIVE_ADDON_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
