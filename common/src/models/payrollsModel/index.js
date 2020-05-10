// Models
import BaseModel from '../baseModel'

export default class PayrollsModel extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updatePayrolls (state, { payrolls }) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      payrolls
    }
  }

  reportError (state = {}, { error }) {
    return {
      ...state,
      reortLoading: false,
      loadingMessage: null,
      error
    }
  }

  loadingReportWithMessage (state = {}, { loadingMessage }) {
    return {
      ...state,
      reortLoading: true,
      loadingMessage,
      error: null
    }
  }

  updatePayrollReport (state) {
    return {
      ...state,
      error: null,
      reortLoading: false,
      loadingMessage: null,
      loadingLogo: false
    }
  }
}

export const payrollsModel = new PayrollsModel()
