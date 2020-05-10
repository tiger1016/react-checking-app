// Constants
import {
  FETCH_WALKS_DOWNLOADING,
  FETCH_WALKS_REQUESTED,
  FETCH_WALKS_SUCCEEDED,
  FETCH_WALKS_REJECTED,
  UPDATE_WALKS_FILTER
} from '../../constants/walks/Actions'

// Utils
import { api } from '../../utils/api'

export default (customerId, startTime, endTime, reduxDownload = false) => async dispatch => {
  try {
    // Dispatch that walks request started
    dispatch({ type: FETCH_WALKS_REQUESTED, payload: `Loading walks from ${startTime} to ${endTime}` })
    dispatch({ type: UPDATE_WALKS_FILTER, payload: { start_time: startTime, end_time: endTime } })
    // Params to be sent in url params
    const urlParams = {
      start_time: startTime,
      end_time: endTime
    }

    // Fetch walks, dispatch progress to redux and process response
    const { data: { data: walks } } = await api.getAndDispatchDownloadProgress(`/customers/${customerId}/walks`, urlParams, dispatch, FETCH_WALKS_DOWNLOADING)
    dispatch({ type: FETCH_WALKS_SUCCEEDED, payload: { end_time: endTime, start_time: startTime, walks } })
  } catch (error) {
    dispatch({ type: FETCH_WALKS_REJECTED, payload: error.message || error.toString() })
  }
}
