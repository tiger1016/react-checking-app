// Linraries
import braintree from 'braintree-web'

// Functions
import { notify } from '../app'

// Utils
import { api, utility } from '../../utils'

export default (creditCard, cb, notification = true) => {
  api.get('/setting/getBraintreeToken')
    .then(braintreeTokenResponse => {
      const cardIsMasked = utility.cardIsMasked(creditCard.number)
      if (!cardIsMasked && !utility.isEmpty(creditCard.number)) {
        braintree.client.create({ authorization: braintreeTokenResponse.data.data.token },
          (err, client) => {
            if (err) {
              const error = err || {}
              error.details = error.details || {}
              error.details.originalError = error.details.originalError || {}
              error.details.originalError.error = error.details.originalError.error || {}
              if (notification) notify('error', error.details.originalError.error)
              if (utility.isAFunction(cb)) cb(error.details.originalError.error, null)
              return
            }

            client.request(
              { endpoint: 'payment_methods/credit_cards', method: 'post', data: { creditCard: creditCard } },
              (err, response) => {
                if (response) {
                  if (utility.isAFunction(cb)) cb(null, response)
                  cb(response)
                } else if (err) {
                  const error = err || {}
                  error.details = error.details || {}
                  error.details.originalError = error.details.originalError || {}
                  error.details.originalError.error = error.details.originalError.error || {}
                  let errMsg = error.details.originalError.error.message
                  if (error.details.originalError.fieldErrors && error.details.originalError.fieldErrors.length > 0) {
                    if (error.details.originalError.fieldErrors[0].fieldErrors && error.details.originalError.fieldErrors[0].fieldErrors.length > 0) {
                      errMsg = error.details.originalError.fieldErrors[0].fieldErrors[0].message
                    }
                  }
                  errMsg = errMsg || 'Something went wrong!'
                  if (notification) notify('error', errMsg)
                  if (utility.isAFunction(cb)) cb(errMsg, null)
                }
              })
          })
      } else {
        const _err = 'Invalid Card Number !'
        if (notification) notify('error', _err)
        if (utility.isAFunction(cb)) cb(_err, null)
      }
    })
    .catch(error => {
      if (error) { if (notification) notify('error', error.message || error.toString()) }
      if (utility.isAFunction(cb)) cb(error, null)
    })
}
