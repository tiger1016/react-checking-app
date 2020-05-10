// Constants
import {
  CREATE_SERVICE_REQUESTED,
  CREATE_SERVICE_SUCCEDED,
  CREATE_SERVICE_REJECTED
} from '../../constants/services/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

/**
 * Creates a new service
 * @param {numeric} serviceObject.event_type_id         Event type id
 * @param {numeric} serviceObject.cost                  Service cost
 * @param {numeric} serviceObject.staff_pay_rate        Default walker payroll
 * @param {numeric} serviceObject.length                Service length
 * @param {numeric} serviceObject.archive               Service is archived?
 * @param {string}  serviceObject.type                  Service type
 * @param {string}  serviceObject.dropdown_description  Service name
 * @return {Void}
 */
export default (serviceObject, cb, notification = true) => async dispatch => {
  try {
    const eventTypeId = serviceObject.event_type_id ? serviceObject.event_type_id : 1

    // Make sure event type id is not missing as per API requirement
    const service = {
      cost: serviceObject.cost,
      default_walker_payroll: serviceObject.default_walker_payroll,
      dropdown_description: serviceObject.dropdown_description,
      event_type_id: eventTypeId,
      length: serviceObject.length
    }

    dispatch({ type: CREATE_SERVICE_REQUESTED, payload: `Creating service ${service.name}` })
    const { data: { data: payload } } = await api.post('/services', service)
    dispatch({
      type: CREATE_SERVICE_SUCCEDED,
      payload: {
        newService: {
          ...payload.service,
          lengthHours: serviceObject.lengthHours,
          lengthMinutes: serviceObject.lengthMinutes
        },
        tempService: serviceObject
      }
    })

    // Notify
    if (notification) notify('success', 'Service created')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: CREATE_SERVICE_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
