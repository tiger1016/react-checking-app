// Model
import { profileModel } from '../models'
// Initial state
import initialstate from '../initialstate/profile-init'

/**
 * Updates profile reducer. (NO NEED TO UPDATE THIS WHEN ADDING NEW PROFILE ACTIONS, READ BELOW)
 * This is a bit different from the other reducers because
 * we are using one single big object for profile that updates
 * target keys when changes are made.
 * So we don't need to do one reducer per action but a general
 * reducer that updates the keys brovided by the action.
 *
 * @param  {Object} state  Store's state
 * @param  {Object} action Action creator
 * @return {Object}        New store's state
 */
export default (state = initialstate, action) => {
  switch (action.type) {
    default:
      const profilePrefixRegex = '^@@petcheck/PROFILE/'
      const profileRejectedPostfix = '.*REJECTED$'
      const profileRequestedPostfix = '.*REQUESTED$'
      const profileSuccededPostfix = '.*SUCCEDED$'

      const profileRejectedRegex = new RegExp(`${profilePrefixRegex}${profileRejectedPostfix}`)
      const profileRequestedRegex = new RegExp(`${profilePrefixRegex}${profileRequestedPostfix}`)

      const actionRejected = profileRejectedRegex.test(action.type)
      const actionRequested = profileRequestedRegex.test(action.type)
      const actionSucceded = (
        (new RegExp(`${profilePrefixRegex}FETCH${profileSuccededPostfix}`)).test(action.type) ||
        (new RegExp(`${profilePrefixRegex}UPDATE${profileSuccededPostfix}`)).test(action.type)
      )

      if (actionRejected) return profileModel.error(state, { error: action.payload })
      if (actionRequested) return profileModel.loadingWithMessage(state, { message: action.payload })
      if (actionSucceded) return profileModel.updateProfile(state, { data: action.payload })
  }
  return state
}
