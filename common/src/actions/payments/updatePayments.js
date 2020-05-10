// Libraires
import braintree from 'braintree-web'

// Constants
import {
  UPDATE_PAYMENTS_REQUESTED,
  UPDATE_PAYMENTS_SUCCEDED,
  UPDATE_PAYMENTS_REJECTED,
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

export default (customerId, paymentData, cb, notification = true) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PAYMENTS_REQUESTED, payload: `Updating payments for customer ${customerId}` })

    if (paymentData.payment_type === 'cc') {
      const { data: { data: { token: authorization }, jwt } } = await api.get('/setting/getBraintreeToken')
      braintree.client.create({ authorization }, (err, client) => {
        if (err) {
          creditsError(err, dispatch, cb, notification)
        } else {
          client.request({
            data: {
              creditCard: {
                billingAddress: {
                  postalCode: paymentData.zip_billing
                },
                cvv: paymentData.cvv,
                expirationDate: paymentData.exp_month + '/' + paymentData.exp_year,
                number: paymentData.card_number
              }
            },
            endpoint: 'payment_methods/credit_cards',
            method: 'post'
          }, async (err, response) => {
            if (err) {
              creditsError(err, dispatch, cb, notification)
            } else {
              const credit = {
                address_billing: paymentData.address_billing,
                address2_billing: paymentData.address2_billing,
                invoice_terms: paymentData.invoice_terms,
                billing_date: paymentData.billing_date,
                billing_frequency: paymentData.billing_frequency,
                billing_timing: paymentData.billing_timing,
                card_nonce: response.creditCards[0].nonce,
                card_number: paymentData.card_number,
                card_type: paymentData.card_type,
                city_billing: paymentData.city_billing,
                cvv: paymentData.cvv,
                exp_year: paymentData.exp_year,
                first_name_billing: paymentData.first_name_billing,
                jwt,
                last_name_billing: paymentData.last_name_billing,
                payment_type: paymentData.payment_type,
                state_billing: paymentData.state_billing,
                zip_billing: paymentData.zip_billing
              }
              const { data: { data: payload } } = await api.put(`/customers/payment_info/${customerId}`, credit, false)
              dispatch({ type: UPDATE_PAYMENTS_SUCCEDED, payload })

              // Notify
              if (notification) notify('success', 'payment updated')

              // Callback
              if (utility.isAFunction(cb)) cb(null, payload)
            }
          })
        }
      })
    } else {
      const credit = {
        billing_date: paymentData.billing_date,
        billing_frequency: paymentData.billing_frequency,
        billing_timing: paymentData.billing_timing,
        invoice_terms: paymentData.invoice_terms,
        payment_type: paymentData.payment_type
      }
      const { data: { data: payload } } = await api.put(`/customers/payment_info/${customerId}`, credit)
      dispatch({ type: UPDATE_PAYMENTS_SUCCEDED, payload })

      // Notify
      if (notification) notify('success', 'payment updated')

      // Callback
      if (utility.isAFunction(cb)) cb(null, payload)
    }
  } catch (error) {
    dispatch({ type: UPDATE_PAYMENTS_REJECTED, payload: error.message || error.toString() })

    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
