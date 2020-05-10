// Constants
import {
  CREATE_ADDON_REQUESTED,
  CREATE_ADDON_SUCCEDED,
  CREATE_ADDON_REJECTED
} from '../../constants/addons/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

/**
 * Creates a new addon
 * @param  {[type]} addonObject                         Addon to be created
 * @param  {String} addonObject.name                    Addon name
 * @param  {String} addonObject.addon_price             Addon price
 * @param  {Number} addonObject.default_walker_payroll  Walker payroll Id
 * @param  {String} addonObject.archived                "0" for not archived, "1" for archived
 * @return {[type]}             [description]
 */
export default (addonObject, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: CREATE_ADDON_REQUESTED, payload: `Creating addon ${addonObject.name}` })

    const { data: { data: { addon } } } = await api.post('/addons', addonObject)
    dispatch({ type: CREATE_ADDON_SUCCEDED, payload: { addon, tempAddon: addonObject } })

    // Notify
    if (notification) notify('success', 'Addon created')

    // Callback
    if (utility.isAFunction(cb)) cb(null, addon)
  } catch (error) {
    dispatch({ type: CREATE_ADDON_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
