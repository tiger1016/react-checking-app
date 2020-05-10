// Libraries
import moment from 'moment'

// Constants
import {
  CREATE_WALK_REJECTED,
  CREATE_WALK_REQUESTED,
  CREATE_WALK_SUCCEEDED
} from '../../constants/walks/Actions'

// Functions
import notify from '../../functions/app/notify'

// Controllers
import { sessionController } from '../../controllers/sessionController'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default ({ newWalk }, cb, notification = true) => async (dispatch, getState) => {
  try {
    let addons = ''
    if (newWalk.addons && utility.isAString(newWalk.addons)) {
      addons = newWalk.addons
    } else if (newWalk.addons && utility.isAnArray(newWalk.addons)) {
      addons = newWalk.addons.map(a => a.id).join()
    } else if (newWalk.addons && utility.isANumber(newWalk.addons)) {
      addons = `${newWalk.addons}`
    }

    let dogs = ''
    if (newWalk.pets && utility.isAString(newWalk.pets)) {
      dogs = newWalk.pets
    } else if (newWalk.pets && utility.isAnArray(newWalk.pets)) {
      dogs = newWalk.pets.map(a => a.id).join()
    } else if (newWalk.pets && utility.isANumber(newWalk.pets)) {
      dogs = `${newWalk.pets}`
    }

    const th = Number(newWalk.time_hour)
    const tm = Number(newWalk.time_minute)

    const walkData = {
      addons,
      ampm: newWalk.ampm.toLowerCase(),
      billing_price_group_id: newWalk.billing_price_group_id,
      customer_id: newWalk.customer_id,
      days: newWalk.days,
      discount_amount: newWalk.discount_amount,
      discount_type: newWalk.discount_type,
      end_date: newWalk.end_date,
      frequency: newWalk.frequency.toLowerCase(),
      jwt: sessionController.selectSessionToken(getState()),
      dogs,
      licensee_comments: newWalk.notes,
      requested_time: moment(newWalk.requestedTime).format('YYYY-MM-D'),
      time_hour: th,
      time_minute: tm < 10 ? ('0' + tm) : tm,
      time_zone: sessionController.selectUserTimeZone(getState()),
      walker_id: newWalk.walker_id
    }

    dispatch({ type: CREATE_WALK_REQUESTED, payload: `Creating walk` })
    const { data: { data: payload } } = await api.post(`/walks`, walkData, false)
    dispatch({ type: CREATE_WALK_SUCCEEDED, payload: payload.walks })

    // Notify
    if (notification) notify('success', 'Service Scheduled')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: CREATE_WALK_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
