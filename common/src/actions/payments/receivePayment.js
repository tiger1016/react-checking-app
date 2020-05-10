// Libraries
import braintree from 'braintree-web'

// Constants
import {
  RECEIVE_PAYMENTS_REQUESTED,
  RECEIVE_PAYMENTS_SUCCEDED,
  RECEIVE_PAYMENTS_REJECTED,
  CREDITS_ERROR
} from '../../constants/payments/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

const creditsError = (err, dispatch, cb, notification) => {
  dispatch({ type: CREDITS_ERROR, creditsError: err.details.originalError.error.message })

  // Notify
  if (notification) notify('error', err.details.originalError.error.message)

  // Callback
  if (utility.isAFunction(cb)) cb(err, null)
}

export default (paymentData, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: RECEIVE_PAYMENTS_REQUESTED, payload: `Updating Payments` })
    if (paymentData.pay_with === 'new') {
      const { data: { data: { token: authorization } } } = await api.get('/setting/getBraintreeToken')

      braintree.client.create({ authorization },
        (err, client) => {
          if (err) {
            creditsError(err, dispatch, cb, notification)
          } else {
            client.request({
              data: {
                creditCard: {
                  expirationDate: paymentData.card_expiration_month + '/' + paymentData.card_expiration_year,
                  number: paymentData.card_number,
                  cvv: paymentData.cvv,
                  billingAddress: { postalCode: paymentData.zip_billing }
                }
              },
              endpoint: 'payment_methods/credit_cards',
              method: 'post'
            },
            async (err, response) => {
              if (err) {
                creditsError(err, dispatch, cb, notification)
              } else {
                // Send response.creditCards[0].nonce to your server
                paymentData.card_nonce = response.creditCards[0].nonce
                const { data: { data: payload } } = await api.post('/receive_payment', paymentData)
                dispatch({ type: RECEIVE_PAYMENTS_SUCCEDED, payload })

                // Notify
                if (notification) notify('success', 'Payment Received')

                // Callback
                if (utility.isAFunction(cb)) cb(null, response.data.data)
              }
            })
          }
        }
      )
    } else {
      const { data: { data: payload } } = await api.post('/receive_payment', paymentData)
      dispatch({ type: RECEIVE_PAYMENTS_SUCCEDED, payload })

      // Notify
      if (notification) notify('success', 'Payment Received')

      // Callback
      if (utility.isAFunction(cb)) cb(null, payload)
    }
  } catch (error) {
    dispatch({ type: RECEIVE_PAYMENTS_REJECTED, payload: (error.message || error.toString()) })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
