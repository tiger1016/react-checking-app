// Models
import BaseModel from '../baseModel'

export default class CreditsModels extends BaseModel {
  /**
   * [updateProfile description]
   * @param  {[type]} state        [description]
   * @param  {[type]} options.data [description]
   * @return {[type]}              [description]
   */
  updateCredits =(state, { credits, creditsUsed }) => {
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingLogo: false,
      credits,
      creditsUsed
    }
  }

  /**
   * [description]
   * @param  {[type]} state             [description]
   * @param  {[type]} options.newCredit [description]
   * @return {[type]}                   [description]
   */
  issueCredit =(state, { newCredit }) => {
    const _updatedCredits = [...state.credits]
    newCredit.credit.credits_given = newCredit.credit.credits_given * 100
    _updatedCredits.unshift(newCredit.credit)
    return this.updateCredits(state, { credits: _updatedCredits, creditsUsed: state.creditsUsed })
  }
}

export const creditsModels = new CreditsModels()
