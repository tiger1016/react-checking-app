// Libraries
import moment from 'moment'
import _ from 'lodash'

// Constants
import { UPDATE_WALK_REJECTED, UPDATE_WALK_REQUESTED, UPDATE_WALK_SUCCEEDED } from '../../constants/walks/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default ({ updatedWalk }, cb, notification = true) => async dispatch => {
  try {
    let addons = ''
    if (updatedWalk.addons && utility.isAString(updatedWalk.addons)) {
      addons = updatedWalk.addons
    } else if (updatedWalk.addons && utility.isAnArray(updatedWalk.addons)) {
      addons = updatedWalk.addons.map(a => a.id).join()
    } else if (updatedWalk.addons && utility.isANumber(updatedWalk.addons)) {
      addons = `${updatedWalk.addons}`
    }

    let dogs = ''
    if (updatedWalk.pets && utility.isAString(updatedWalk.pets)) {
      dogs = updatedWalk.pets
    } else if (updatedWalk.pets && utility.isAnArray(updatedWalk.pets)) {
      dogs = updatedWalk.pets.map(a => a.id).join()
    } else if (updatedWalk.pets && utility.isANumber(updatedWalk.pets)) {
      dogs = `${updatedWalk.pets}`
    }

    const th = Number(updatedWalk.time_hour)
    const tm = Number(updatedWalk.time_minute)

    const updatedWalkData = {
      ampm: updatedWalk.ampm,
      addons,
      billing_price_group_id: updatedWalk.billing_price_group_id,
      customer_id: updatedWalk.customer.id,
      discount_amount: updatedWalk.discount_amount,
      discount_type: updatedWalk.discount_type,
      days: updatedWalk.days,
      dogs: dogs,
      end_date: updatedWalk.end_date,
      frequency: updatedWalk.frequency,
      licensee_comments: updatedWalk.notes,
      customer_comments: updatedWalk.customer_comments,
      requested_time: moment(updatedWalk.requestedTime).format('YYYY-MM-D'),
      time_hour: th,
      time_minute: tm < 10 ? ('0' + tm) : tm,
      walk_id: updatedWalk.walk_id,
      walker_id: updatedWalk.walker_id
    }
    if (updatedWalk.frequency !== 'once') {
      updatedWalkData.apply_to_all = updatedWalk.apply_to_all
    }

    const hasChangeRequestedRevision = updatedWalk.revision_history && _.find(updatedWalk.revision_history, r => (r.revision_status === 'pending' || r.revision_status === 'cancel_requested'))

    if ((updatedWalk.status === 'approved' || updatedWalk.status === 'in_process') && hasChangeRequestedRevision) {
      updatedWalkData.update_type = 'change_request'
      updatedWalkData.update_action = 'accept'
    }

    if (updatedWalk.status === 'pending') {
      updatedWalkData.status = 'approved'
    }

    if (updatedWalk.update_action) {
      updatedWalkData.update_action = updatedWalk.update_action
      if (!updatedWalkData.update_type) {
        updatedWalkData.update_type = 'change_request'
      }
      updatedWalkData.status = 'rejected'
    }

    if (updatedWalk.status === 'completed') {
      updatedWalkData.pee = updatedWalk.pee
      updatedWalkData.poo = updatedWalk.poo
      updatedWalkData.walker_comments = updatedWalk.walker_comments
      updatedWalkData.start_time = updatedWalk.start_time
      updatedWalkData.end_time = updatedWalk.end_time
    }

    dispatch({ type: UPDATE_WALK_REQUESTED, payload: `Updating walk ${updatedWalk.walk_id} to user ${updatedWalk.walker_id} and time ${updatedWalk.requested_time}` })
    const { data: { data: { walks } } } = await api.put(`/walks/${updatedWalk.walk_id}`, updatedWalkData)

    if (walks && walks.length > 0) {
      dispatch({ type: UPDATE_WALK_SUCCEEDED, payload: walks })
    } else {
      throw new Error('No walks returned walks')
    }

    // Notify
    if (notification) notify('success', 'Appointment updated')

    // Callback
    if (utility.isAFunction(cb)) cb(null, walks)
  } catch (error) {
    dispatch({ type: UPDATE_WALK_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
