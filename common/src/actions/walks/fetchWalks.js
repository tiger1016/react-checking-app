// Constants
import {
  FETCH_WALKS_REJECTED,
  FETCH_WALKS_REQUESTED,
  FETCH_WALKS_SUCCEEDED,
  FETCH_UPDATED_WALKS_REQUESTED,
  UPDATE_WALKS_FILTER
} from '../../constants/walks/Actions'

// Utils
import { api } from '../../utils/api'

export default (startTime, endTime, loading) => async dispatch => {
  try {
    if (loading) {
      dispatch({ type: FETCH_WALKS_REQUESTED, payload: `Loading walks from ${startTime} to ${endTime}` })
    } else {
      dispatch({ type: FETCH_UPDATED_WALKS_REQUESTED, payload: `Loading walks from ${startTime} to ${endTime}` })
    }
    dispatch({ type: UPDATE_WALKS_FILTER, payload: { start_time: startTime, end_time: endTime } })
    const urlParams = {
      format: 'array',
      start_time: startTime,
      end_time: endTime
    }

    const { data: { data: walks } } = await api.get('/walks', urlParams)
    dispatch({ type: FETCH_WALKS_SUCCEEDED, payload: { end_time: endTime, start_time: startTime, walks } })
  } catch (error) {
    dispatch({ type: FETCH_WALKS_REJECTED, payload: error.message || error.toString() })
  }
}
