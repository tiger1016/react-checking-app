// Libraries
import braintree from 'braintree-web'

// Constants
import {
  UPDATE_PROFILE_PAYMENT_INFORMATION_REQUESTED,
  UPDATE_PROFILE_PAYMENT_INFORMATION_SUCCEDED,
  UPDATE_PROFILE_PAYMENT_INFORMATION_REJECTED
} from '../../constants/profile/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

const updateProfileInformation = async (dispatch, data, cb, notification = true) => {
  try {
    await api.put('/profile/update_paymentinformation', data)

    const { data: { data: payload } } = await api.get('profile/getpaymentinformation')
    dispatch({ type: UPDATE_PROFILE_PAYMENT_INFORMATION_SUCCEDED, payload })

    // Notify
    if (notification) notify('success', 'Payment information saved')

    // Callback
    if (utility.isAFunction(cb)) cb(null, payload)
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_PAYMENT_INFORMATION_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}

const getCardNonceAndUpdateProfileInformation = async (dispatch, data, cb, notification = true) => {
  try {
    const { data: { data: { token: authorization } } } = await api.get('/setting/getBraintreeToken')

    braintree.client.create({ authorization }, (err, client) => {
      if (err) {
        throw err
      } else {
        client.request({
          data: {
            creditCard: {
              expirationDate: data.card_expiration_month + '/' + data.card_expiration_year,
              number: data.card_number,
              cvv: data.cvv,
              billingAddress: {
                postalCode: data.zip_billing
              }
            }
          },
          endpoint: 'payment_methods/credit_cards',
          method: 'post'
        }, (err, response) => {
          if (err) {
            const error = err || {}
            error.details = error.details || {}
            error.details.originalError = error.details.originalError || {}
            error.details.originalError.error = error.details.originalError.error || {}
            error.details.originalError.error.message = error.details.originalError.error.message || 'Something went wrong!'

            throw new Error(error.details.originalError.error.message)
          } else {
            data.card_nonce = response.creditCards[0].nonce
            updateProfileInformation(dispatch, data, cb, notify)
          }
        })
      }
    })
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_PAYMENT_INFORMATION_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}

export default (data, cb, notify = true) => dispatch => {
  const creditCardIsValid = utility.isANumber(data.card_number)
  const cvvIsValid = utility.isANumber(data.cvv)
  const cardDataIsValid = creditCardIsValid && cvvIsValid

  dispatch({ type: UPDATE_PROFILE_PAYMENT_INFORMATION_REQUESTED, payload: `updating profile payment information` })
  if (cardDataIsValid) {
    getCardNonceAndUpdateProfileInformation(dispatch, data, cb, notify)
  } else {
    const noCreditCardData = { ...data }
    delete noCreditCardData.card_number
    delete noCreditCardData.cvv
    updateProfileInformation(dispatch, noCreditCardData, cb, notify)
  }
}
