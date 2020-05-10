// Libraries
import { createSelector } from 'reselect'

// Functions
// import { profileFunctions } from '../../functions'

/*
  Billing Information
 */

// Pure Selectors
export const billingInformationSelector = state => state.profile.billingInformation

export const billingInformationErrorSelector = createSelector(
  billingInformation => billingInformation.error
)
export const billingInformationLoadingSelector = createSelector(
  billingInformation => billingInformation.loading
)
export const billingInformationLoadingMessageSelector = createSelector(
  billingInformation => billingInformation.loadingMessage
)
