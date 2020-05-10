// Constants
import { FETCH_WALK_DETAIL_REJECTED, FETCH_WALK_DETAIL_REQUESTED, FETCH_WALK_DETAIL_SUCCEEDED } from '../../constants/walks/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (walkId, cb, notification = false) => async dispatch => {
  try {
    dispatch({ type: FETCH_WALK_DETAIL_REQUESTED, payload: `Loading walk Detail ${walkId}` })
    const { data: { data: payload } } = await api.get('/walk/' + walkId)
    dispatch({ type: FETCH_WALK_DETAIL_SUCCEEDED, payload: payload.walks })

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload.walks)
  } catch (error) {
    dispatch({ type: FETCH_WALK_DETAIL_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error.message || error.toString())
  }
}
