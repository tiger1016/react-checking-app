// Models
import BaseModel from '../baseModel'

export default class ProfileModel extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updateProfile (state, { data }) {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      profile: {
        ...state.profile,
        ...data
      }
    }
  }
}

export const profileModel = new ProfileModel()
