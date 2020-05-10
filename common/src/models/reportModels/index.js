// Models
import BaseModel from '../baseModel'

export default class ReportModels extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updateReport (state, { data }) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      data
    }
  }

  errorAndUpdate (state = {}, { data, error }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      data,
      error
    }
  }

  selectDetails (state = {}, { data }) {
    return {
      ...state,
      disbursementDetail: data
    }
  }

  clearDetails (state = {}) {
    return {
      ...state,
      disbursementDetail: []
    }
  }
}

export const reportModels = new ReportModels()
