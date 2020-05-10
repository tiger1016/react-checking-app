// Constants
import {
  DOWNLOAD_REPORT_SUCCEDED
} from '../../constants/reports/Actions'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

// Config
import axiosConfig from '../../config/axios.config'

export default (type, data, cb) => dispatch => {
  dispatch({ type: DOWNLOAD_REPORT_SUCCEDED, payload: `download report` })
  const url = axiosConfig.baseURL + 'reports/reportscsv/' + type + '?' + serialize(data) + '&jwt=' + api.getSessionToken()
  if (utility.isAFunction(cb)) cb(url)
}

const serialize = (obj) => {
  var str = []
  for (var p in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}
