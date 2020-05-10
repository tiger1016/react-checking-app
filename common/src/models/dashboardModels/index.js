// Models
import BaseModel from '../baseModel'

export default class DashboardModels extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updateDashboard (state, data) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      ...data
    }
  }
}

export const dashboardModels = new DashboardModels()
