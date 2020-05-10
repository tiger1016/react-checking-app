// Constants
import {
  UPDATE_ADDON_REQUESTED,
  UPDATE_ADDON_SUCCEDED,
  UPDATE_ADDON_REJECTED
} from '../../constants/addons/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

/**
 * Update an addon by Id
 * @param  {Object} addon                         Addon object to be updated
 * @param  {Number} addon.id                      Addon Id
 * @param  {String} addon.addon_name              Addon name
 * @param  {Number} addon.active_addon_id         Active addon Id
 * @param  {String} addon.addon_price             Addon price
 * @param  {Number} addon.default_walker_payroll  Walker payroll Id
 * @param  {String} addon.archived                "0" for not archived, "1" for archived
 * @return {Void}
 */
export default (addon = {}, cb, notification = true) => async dispatch => {
  try {
    const data = {
      addon_name: addon.addon_name || addon.name,
      addon_price: addon.addon_price,
      default_walker_payroll: addon.default_walker_payroll
    }
    const oldAddonId = addon.active_addon_id
    dispatch({ type: UPDATE_ADDON_REQUESTED, payload: `Updating addon ${oldAddonId}` })

    const { data: { data: payload } } = await api.put(`/addons/${oldAddonId}`, data)
    dispatch({ type: UPDATE_ADDON_SUCCEDED, payload, oldAddonId })

    // Notify
    if (notification) notify('success', 'Addon updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_ADDON_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
