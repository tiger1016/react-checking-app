// Constants
import {
  DELETE_CUSTOMER_REJECTED,
  DELETE_CUSTOMER_REQUESTED,
  DELETE_CUSTOMER_SUCCEEDED,

  FETCH_CUSTOMERS_REJECTED,
  FETCH_CUSTOMERS_REQUESTED,
  FETCH_CUSTOMERS_SUCCEEDED,

  FETCH_USER_PAYMENT_INFORMATION_REQUESTED,
  FETCH_USER_PAYMENT_INFORMATION_SUCCEEDED,
  FETCH_USER_PAYMENT_INFORMATION_REJECTED,

  UPDATE_CUSTOMER_REQUESTED,
  UPDATE_CUSTOMER_SUCCEEDED,
  UPDATE_CUSTOMER_REJECTED,

  UPDATE_CUSTOMER_PAYMENT_INFOMATION_REJECTED,
  UPDATE_CUSTOMER_PAYMENT_INFOMATION_REQUESTED,
  UPDATE_CUSTOMER_PAYMENT_INFOMATION_SUCCEEDED,

  FETCH_CUSTOMER_PROFILE_REQUESTED,
  FETCH_CUSTOMER_PROFILE_SUCCEDED,
  FETCH_CUSTOMER_PROFILE_REJECTED,

  UPDATE_CUSTOMER_PROFILE_REQUESTED,
  UPDATE_CUSTOMER_PROFILE_REJECTED,
  UPDATE_CUSTOMER_PROFILE_SUCCEEDED,

  CREATE_CUSTOMER_PROFILE_REQUESTED,
  CREATE_CUSTOMER_PROFILE_REJECTED,
  CREATE_CUSTOMER_PROFILE_SUCCEEDED,

  TOGGLE_CUSTOMER_STATUS_REQUESTED,
  TOGGLE_CUSTOMER_STATUS_SUCCEDED,
  TOGGLE_CUSTOMER_STATUS_REJECTED,

  FETCH_ADDONS_RATES_REQUESTED,
  FETCH_ADDONS_RATES_SUCCEDED,
  FETCH_ADDONS_RATES_REJECTED,

  FETCH_SERVICE_RATES_REQUESTED,
  FETCH_SERVICE_RATES_SUCCEDED,
  FETCH_SERVICE_RATES_REJECTED,

  UPDATE_ADDON_RATES_REJECTED,
  UPDATE_ADDON_RATES_REQUESTED,
  UPDATE_ADDON_RATES_SUCCEDED,

  UPDATE_SERVICE_RATES_REJECTED,
  UPDATE_SERVICE_RATES_REQUESTED,
  UPDATE_SERVICE_RATES_SUCCEDED,

  FETCH_UNBILLED_SERVICES_REJECTED,
  FETCH_UNBILLED_SERVICES_REQUESTED,
  FETCH_UNBILLED_SERVICES_SUCCEDED
} from '../constants/customers/Actions'

// Models
import { customersModel } from '../models/customersModel'

// Utils
// import { utility } from '../utils'

// Initial state
import initialstate from '../initialstate/customers-init'

export default (state = initialstate, action) => {
  const { payload, type } = action

  switch (type) {
    /*
    Rejected
    */
    case CREATE_CUSTOMER_PROFILE_REJECTED:
    case DELETE_CUSTOMER_REJECTED:
    case FETCH_ADDONS_RATES_REJECTED:
    case FETCH_CUSTOMER_PROFILE_REJECTED:
    case FETCH_CUSTOMERS_REJECTED:
    case FETCH_SERVICE_RATES_REJECTED:
    case FETCH_USER_PAYMENT_INFORMATION_REJECTED:
    case TOGGLE_CUSTOMER_STATUS_REJECTED:
    case UPDATE_ADDON_RATES_REJECTED:
    case UPDATE_CUSTOMER_REJECTED:
    case UPDATE_CUSTOMER_PAYMENT_INFOMATION_REJECTED:
    case UPDATE_CUSTOMER_PROFILE_REJECTED:
    case UPDATE_SERVICE_RATES_REJECTED:
    case FETCH_UNBILLED_SERVICES_REJECTED:
      return customersModel.error(state, { error: payload })

    /*
    Requested
    */
    case CREATE_CUSTOMER_PROFILE_REQUESTED:
    case DELETE_CUSTOMER_REQUESTED:
    case FETCH_ADDONS_RATES_REQUESTED:
    case FETCH_CUSTOMER_PROFILE_REQUESTED:
    case FETCH_CUSTOMERS_REQUESTED:
    case FETCH_SERVICE_RATES_REQUESTED:
    case FETCH_USER_PAYMENT_INFORMATION_REQUESTED:
    case TOGGLE_CUSTOMER_STATUS_REQUESTED:
    case UPDATE_ADDON_RATES_REQUESTED:
    case UPDATE_CUSTOMER_PAYMENT_INFOMATION_REQUESTED:
    case UPDATE_CUSTOMER_PROFILE_REQUESTED:
    case UPDATE_CUSTOMER_REQUESTED:
    case UPDATE_SERVICE_RATES_REQUESTED:
    case FETCH_UNBILLED_SERVICES_REQUESTED:
      return customersModel.loadingWithMessage(state, { message: payload })

    /*
    Succeded
    */
    case CREATE_CUSTOMER_PROFILE_SUCCEEDED:
      return customersModel.createCustomer(state, { newCustomer: payload })

    case DELETE_CUSTOMER_SUCCEEDED:
      return customersModel.deleteCustomer(state, { customer: payload })

    case FETCH_CUSTOMERS_SUCCEEDED:
      return customersModel.updateCustomers(state, { customers: payload, inactive: action.inactive })
    case FETCH_SERVICE_RATES_SUCCEDED:
      return customersModel.fetchCustomerServiceRate(state, { services: payload, user_id: action.user_id })
    case FETCH_ADDONS_RATES_SUCCEDED:
      return customersModel.fetchCustomerAddonRate(state, { _addon: payload, user_id: action.user_id })
    case FETCH_CUSTOMER_PROFILE_SUCCEDED:
      return customersModel.updateCustomerProfile(state, { customer: payload })
    case FETCH_USER_PAYMENT_INFORMATION_SUCCEEDED:
      return customersModel.updatePaymentInformationOfUser(state, { paymentInformation: payload })
    case FETCH_UNBILLED_SERVICES_SUCCEDED:
      return customersModel.updateUnbilledServices(state, payload)

    case TOGGLE_CUSTOMER_STATUS_SUCCEDED:
      return customersModel.toggleCustomerStatus(state, { _customer: payload, customerId: action.customerId })

    case UPDATE_CUSTOMER_SUCCEEDED:
      return customersModel.updateCustomer(state, { customer: payload })
    case UPDATE_CUSTOMER_PAYMENT_INFOMATION_SUCCEEDED:
      return customersModel.updatePaymentInformation(state, { paymentInformation: payload })
    case UPDATE_CUSTOMER_PROFILE_SUCCEEDED:
      return customersModel.updateCustomersProfile(state, { customerProfile: payload })
    case UPDATE_ADDON_RATES_SUCCEDED:
      return customersModel.updateCustomerAddonRate(state, { _addon: payload, user_id: action.user_id })
    case UPDATE_SERVICE_RATES_SUCCEDED:
      return customersModel.updateCustomerServiceRate(state, { _service: payload, user_id: action.user_id })
  }
  return state
}
