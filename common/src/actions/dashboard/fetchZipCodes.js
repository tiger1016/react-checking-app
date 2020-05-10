// Libraries
import axios from 'axios'

// Constants
import {
  FETCH_ZIP_CODES_REJECTED,
  FETCH_ZIP_CODES_REQUESTED,
  FETCH_ZIP_CODES_SUCCEDED
} from '../../constants/dashboard/Actions'

export default zip => async dispatch => {
  try {
    dispatch({ type: FETCH_ZIP_CODES_REQUESTED, payload: `Fetching zip codes` })
    const { data: { results } } = await axios.get(`//maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}`)
    dispatch({ type: FETCH_ZIP_CODES_SUCCEDED, payload: results[0].geometry.location })
  } catch (error) {
    dispatch({ type: FETCH_ZIP_CODES_REJECTED, payload: error.message || error.toString() })
  }
}
