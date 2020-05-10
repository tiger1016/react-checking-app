// Constants
import {
  UPDATE_CUSTOMER_PAYMENT_INFOMATION_REJECTED,
  UPDATE_CUSTOMER_PAYMENT_INFOMATION_REQUESTED,
  UPDATE_CUSTOMER_PAYMENT_INFOMATION_SUCCEEDED
} from '../../constants/customers/Actions'

// Functions
import notify from '../../functions/app/notify'

// Utils
import { api } from '../../utils/api'
import { utility } from '../../utils/utility'

export default (customerId, paymentData, cbF, notification = true) => dispatch => {
  dispatch({
    payload: `Updating paymentinformation for customer ${customerId}`,
    type: UPDATE_CUSTOMER_PAYMENT_INFOMATION_REQUESTED
  })
  if (paymentData.payment_type === 'cc') {
    creditCard(dispatch, customerId, paymentData, cbF, notification)
  } else {
    cashOrCheck(dispatch, customerId, paymentData, cbF, notification)
  }
}

const cashOrCheck = async (dispatch, customerId, paymentData, cbF, notification) => {
  try {
    const paymentInformation = {
      billing_date: paymentData.billing_date,
      billing_frequency: paymentData.billing_frequency,
      invoice_terms: paymentData.invoice_terms,
      billing_timing: paymentData.billing_timing,
      payment_type: paymentData.payment_type
    }
    const { data: { data } } = await api.put(`/customers/payment_info/${customerId}`, paymentInformation)
    dispatch({ type: UPDATE_CUSTOMER_PAYMENT_INFOMATION_SUCCEEDED,
      payload: {
        ...data,
        ...paymentData,
        user_id: customerId
      }
    })

    if (notification) notify('success', 'Payment information updated successfully.')
    if (utility.isAFunction(cbF)) cbF(null, data)
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_PAYMENT_INFOMATION_REJECTED, payload: error.message || error.toString() })

    if (notification) notify('error', error.message || error.toString())
    if (utility.isAFunction(cbF)) cbF(error, null)
  }
}

const creditCard = async (dispatch, customerId, paymentData, cbF, notification) => {
  try {
    if (!paymentData.nonce) {
      throw new Error('Invalid Card!')
    }

    // console.log('daat foro token-==-=--=->>> ',response.creditCards[0].nonce)
    // Send response.creditCards[0].nonce to your server
    const paymentInformation = {
      payment_type: paymentData.payment_type,
      invoice_terms: paymentData.invoice_terms,
      billing_timing: paymentData.billing_timing,
      billing_frequency: paymentData.billing_frequency,
      billing_date: paymentData.billing_date,
      first_name_billing: paymentData.first_name_billing,
      last_name_billing: paymentData.last_name_billing,
      address_billing: paymentData.address_billing,
      address2_billing: paymentData.address2_billing,
      state_billing: paymentData.state_billing,
      city_billing: paymentData.city_billing,
      zip_billing: paymentData.zip_billing,
      card_type: paymentData.card_type,
      exp_year: paymentData.card_expiration_year,
      exp_month: paymentData.card_expiration_month,
      card_number: paymentData.card_digits,
      cvv: paymentData.cvv,
      card_nonce: paymentData.nonce
    }

    if (paymentData.noCCUpdates) {
      delete paymentData.card_nonce
    }

    if (paymentInformation.cvv && paymentInformation.cvv.includes('*')) {
      delete paymentInformation.cvv
    }

    const { data: { data } } = await api.put(`/customers/payment_info/${customerId}`, paymentInformation)
    dispatch({ type: UPDATE_CUSTOMER_PAYMENT_INFOMATION_SUCCEEDED,
      payload: {
        ...data,
        ...paymentInformation,
        card_expiration_year: paymentData.card_expiration_year,
        card_expiration_month: paymentData.card_expiration_month,
        card_digits: paymentData.card_digits,
        user_id: customerId
      }
    })

    if (notification) notify('success', 'Payment information updated successfully.')
    if (utility.isAFunction(cbF)) cbF(null, data)
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMER_PAYMENT_INFOMATION_REJECTED,
      payload: error.message || error.toString()
    })

    if (notification) notify('error', error.message || error.toString())
    if (utility.isAFunction(cbF)) cbF(error, null)
  }
}
