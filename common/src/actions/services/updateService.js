// Constants
import {
  UPDATE_SERVICE_REJECTED,
  UPDATE_SERVICE_REQUESTED,
  UPDATE_SERVICE_SUCCEDED
} from '../../constants/services/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

/**
 * Updates a service
 * @param  {Object} serviceData Service object.
 * @return {Promise}
 */
export default (service, cb, notification = true) => async dispatch => {
  try {
    const serviceData = {
      archive: service.archive,
      cost: service.cost,
      default_walker_payroll: service.default_walker_payroll,
      dropdown_description: service.dropdown_description,
      id: service.id,
      length: service.length
    }

    dispatch({ type: UPDATE_SERVICE_REQUESTED, payload: `Updating service ${serviceData.id}` })
    const { data: { data: payload } } = await api.put(`/services/${serviceData.id}`, serviceData)
    dispatch({ type: UPDATE_SERVICE_SUCCEDED, payload, oldServiceId: serviceData.id })

    // Notify
    if (notification) {
      const { changedActiveState } = service
      const { archive } = payload.service || {}
      if (!changedActiveState && changedActiveState !== false) notify('success', 'Service updated')
      else notify('success', archive ? 'Service Deactivated' : 'Service Activated')
    }

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_SERVICE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
