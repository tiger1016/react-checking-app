// Linraries
import braintree from 'braintree-web'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

const adjustBraintreeError = err => {
  const error = err || {}
  error.details = error.details || {}
  error.details.originalError = error.details.originalError || {}
  error.details.originalError.error = error.details.originalError.error || {}
  error.details.originalError.error.message = error.details.originalError.error.message || 'Something went wrong!'

  return error
}

export default async (creditCard, cb, notification = true) => {
  try {
    const { data: { data: { token: authorization } } } = await api.get('/setting/getBraintreeToken')
    const cardIsMasked = utility.cardIsMasked(creditCard.number)

    if (!cardIsMasked && !utility.isEmpty(creditCard.number)) {
      braintree.client.create({ authorization },
        (err, client) => {
          if (err) {
            const error = adjustBraintreeError(err)
            throw new Error(error.details.originalError.error.message)
          } else {
            client.request(
              { endpoint: 'payment_methods/credit_cards', method: 'post', data: { creditCard } },
              (err, response) => {
                if (err) {
                  const error = adjustBraintreeError(err)
                  throw new Error(error.details.originalError.error.message)
                } else {
                  // Callback
                  if (utility.isAFunction(cb)) cb(null, response)
                }
              }
            )
          }
        })
    } else {
      throw new Error('Invalid Card Number!')
    }
  } catch (error) {
    // Notify
    if (notification) notify('error', error.message || error.toString())

    // Callback
    if (utility.isAFunction(cb)) cb(error, null)
  }
}
