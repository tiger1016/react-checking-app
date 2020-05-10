// Constants
import { ACTIONS_BASE } from '../globals'

const globalIdent = ACTIONS_BASE + 'CUSTOMERS/'

export const DELETE_CUSTOMER_REJECTED = globalIdent + 'DELETE_CUSTOMER_REJECTED'
export const DELETE_CUSTOMER_REQUESTED = globalIdent + 'DELETE_CUSTOMER_REQUESTED'
export const DELETE_CUSTOMER_SUCCEEDED = globalIdent + 'DELETE_CUSTOMER_SUCCEEDED'

export const FETCH_CUSTOMERS_REJECTED = globalIdent + 'FETCH_CUSTOMERS_REJECTED'
export const FETCH_CUSTOMERS_REQUESTED = globalIdent + 'FETCH_CUSTOMERS_REQUESTED'
export const FETCH_CUSTOMERS_SUCCEEDED = globalIdent + 'FETCH_CUSTOMERS_SUCCEEDED'

export const FETCH_USER_PAYMENT_INFORMATION_REJECTED = globalIdent + 'FETCH_USER_PAYMENT_INFORMATION_REJECTED'
export const FETCH_USER_PAYMENT_INFORMATION_REQUESTED = globalIdent + 'FETCH_USER_PAYMENT_INFORMATION_REQUESTED'
export const FETCH_USER_PAYMENT_INFORMATION_SUCCEEDED = globalIdent + 'FETCH_USER_PAYMENT_INFORMATION_SUCCEEDED'

export const UPDATE_CUSTOMER_REJECTED = globalIdent + 'UPDATE_CUSTOMER_REJECTED'
export const UPDATE_CUSTOMER_REQUESTED = globalIdent + 'UPDATE_CUSTOMER_REQUESTED'
export const UPDATE_CUSTOMER_SUCCEEDED = globalIdent + 'UPDATE_CUSTOMER_SUCCEEDED'

export const UPDATE_CUSTOMER_PAYMENT_INFOMATION_REJECTED = globalIdent + 'UPDATE_CUSTOMER_PAYMENT_INFOMATION_REJECTED'
export const UPDATE_CUSTOMER_PAYMENT_INFOMATION_REQUESTED = globalIdent + 'UPDATE_CUSTOMER_PAYMENT_INFOMATION_REQUESTED'
export const UPDATE_CUSTOMER_PAYMENT_INFOMATION_SUCCEEDED = globalIdent + 'UPDATE_CUSTOMER_PAYMENT_INFOMATION_SUCCEEDED'

export const ADD_CUSTOMER_PET_REJECTED = globalIdent + 'ADD_CUSTOMER_PET_REJECTED'
export const ADD_CUSTOMER_PET_REQUESTED = globalIdent + 'ADD_CUSTOMER_PET_REQUESTED'
export const ADD_CUSTOMER_PET_SUCCEEDED = globalIdent + 'ADD_CUSTOMER_PET_SUCCEEDED'

export const UPDATE_CUSTOMER_PET_REJECTED = globalIdent + 'UPDATE_CUSTOMER_PET_REJECTED'
export const UPDATE_CUSTOMER_PET_REQUESTED = globalIdent + 'UPDATE_CUSTOMER_PET_REQUESTED'
export const UPDATE_CUSTOMER_PET_SUCCEEDED = globalIdent + 'UPDATE_CUSTOMER_PET_SUCCEEDED'

export const DELETE_CUSTOMER_PET_REJECTED = globalIdent + 'DELETE_CUSTOMER_PET_REJECTED'
export const DELETE_CUSTOMER_PET_REQUESTED = globalIdent + 'DELETE_CUSTOMER_PET_REQUESTED'
export const DELETE_CUSTOMER_PET_SUCCEEDED = globalIdent + 'DELETE_CUSTOMER_PET_SUCCEEDED'

/*
  Customer Profile
*/
export const FETCH_CUSTOMER_PROFILE_REJECTED = globalIdent + 'FETCH_CUSTOMER_PROFILE_REJECTED'
export const FETCH_CUSTOMER_PROFILE_REQUESTED = globalIdent + 'FETCH_CUSTOMER_PROFILE_REQUESTED'
export const FETCH_CUSTOMER_PROFILE_SUCCEDED = globalIdent + 'FETCH_CUSTOMER_PROFILE_SUCCEDED'

export const UPDATE_CUSTOMER_PROFILE_REJECTED = globalIdent + 'UPDATE_CUSTOMER_PROFILE_REJECTED'
export const UPDATE_CUSTOMER_PROFILE_REQUESTED = globalIdent + 'UPDATE_CUSTOMER_PROFILE_REQUESTED'
export const UPDATE_CUSTOMER_PROFILE_SUCCEDED = globalIdent + 'UPDATE_CUSTOMER_PROFILE_SUCCEDED'

export const CREATE_CUSTOMER_PROFILE_REJECTED = globalIdent + 'CREATE_CUSTOMER_PROFILE_REJECTED'
export const CREATE_CUSTOMER_PROFILE_REQUESTED = globalIdent + 'CREATE_CUSTOMER_PROFILE_REQUESTED'
export const CREATE_CUSTOMER_PROFILE_SUCCEEDED = globalIdent + 'CREATE_CUSTOMER_PROFILE_SUCCEEDED'

export const CREATE_CUSTOMER_PROFILE_INFO_REJECTED = globalIdent + 'CREATE_CUSTOMER_PROFILE_INFO_REJECTED'
export const CREATE_CUSTOMER_PROFILE_INFO_REQUESTED = globalIdent + 'CREATE_CUSTOMER_PROFILE_INFO_REQUESTED'
export const CREATE_CUSTOMER_PROFILE_INFO_SUCCEDED = globalIdent + 'CREATE_CUSTOMER_PROFILE_INFO_SUCCEDED'

export const ADD_CUSTOMER_PROFILE_PET = globalIdent + 'ADD_CUSTOMER_PROFILE_PET'
export const UPDATE_CUSTOMER_PROFILE_PET = globalIdent + 'UPDATE_CUSTOMER_PROFILE_PET'
export const DELETE_CUSTOMER_PROFILE_PET = globalIdent + 'DELETE_CUSTOMER_PROFILE_PET'

export const TOGGLE_CUSTOMER_STATUS_REJECTED = globalIdent + 'TOGGLE_CUSTOMER_STATUS_REJECTED'
export const TOGGLE_CUSTOMER_STATUS_REQUESTED = globalIdent + 'TOGGLE_CUSTOMER_STATUS_REQUESTED'
export const TOGGLE_CUSTOMER_STATUS_SUCCEDED = globalIdent + 'TOGGLE_CUSTOMER_STATUS_SUCCEDED'

export const FETCH_CUSTOMER_INVOICES_REJECTED = globalIdent + 'FETCH_CUSTOMER_INVOICES_REJECTED'
export const FETCH_CUSTOMER_INVOICES_REQUESTED = globalIdent + 'FETCH_CUSTOMER_INVOICES_REQUESTED'
export const FETCH_CUSTOMER_INVOICES_SUCCEDED = globalIdent + 'FETCH_CUSTOMER_INVOICES_SUCCEDED'

export const UPDATE_CUSTOMER_PROFILE_SUCCEEDED = globalIdent + 'UPDATE_CUSTOMER_PROFILE_SUCCEEDED'

/*
  Rates
*/
export const FETCH_SERVICE_RATES_REJECTED = globalIdent + 'FETCH_SERVICE_RATES_REJECTED'
export const FETCH_SERVICE_RATES_REQUESTED = globalIdent + 'FETCH_SERVICE_RATES_REQUESTED'
export const FETCH_SERVICE_RATES_SUCCEDED = globalIdent + 'FETCH_SERVICE_RATES_SUCCEDED'

export const UPDATE_SERVICE_RATES_REJECTED = globalIdent + 'UPDATE_SERVICE_RATES_REJECTED'
export const UPDATE_SERVICE_RATES_REQUESTED = globalIdent + 'UPDATE_SERVICE_RATES_REQUESTED'
export const UPDATE_SERVICE_RATES_SUCCEDED = globalIdent + 'UPDATE_SERVICE_RATES_SUCCEDED'

export const FETCH_ADDONS_RATES_REJECTED = globalIdent + 'FETCH_ADDONS_RATES_REJECTED'
export const FETCH_ADDONS_RATES_REQUESTED = globalIdent + 'FETCH_ADDONS_RATES_REQUESTED'
export const FETCH_ADDONS_RATES_SUCCEDED = globalIdent + 'FETCH_ADDONS_RATES_SUCCEDED'

export const UPDATE_ADDON_RATES_REJECTED = globalIdent + 'UPDATE_ADDON_RATES_REJECTED'
export const UPDATE_ADDON_RATES_REQUESTED = globalIdent + 'UPDATE_ADDON_RATES_REQUESTED'
export const UPDATE_ADDON_RATES_SUCCEDED = globalIdent + 'UPDATE_ADDON_RATES_SUCCEDED'

/*
  Invoices
*/
export const CREATE_CUSTOMER_INVOICES_REJECTED = globalIdent + 'CREATE_CUSTOMER_INVOICES_REJECTED'
export const CREATE_CUSTOMER_INVOICES_REQUESTED = globalIdent + 'CREATE_CUSTOMER_INVOICES_REQUESTED'
export const CREATE_CUSTOMER_INVOICES_SUCCEDED = globalIdent + 'CREATE_CUSTOMER_INVOICES_SUCCEDED'

export const UPDATE_CUSTOMER_INVOICES_REJECTED = globalIdent + 'UPDATE_CUSTOMER_INVOICES_REJECTED'
export const UPDATE_CUSTOMER_INVOICES_REQUESTED = globalIdent + 'UPDATE_CUSTOMER_INVOICES_REQUESTED'
export const UPDATE_CUSTOMER_INVOICES_SUCCEDED = globalIdent + 'UPDATE_CUSTOMER_INVOICES_SUCCEDED'
export const UPDATE_CUSTOMER_INVOICE_TERMS_SUCCEDED = globalIdent + 'UPDATE_CUSTOMER_INVOICE_TERMS_SUCCEDED'

export const DELETE_CUSTOMER_INVOICES_REJECTED = globalIdent + 'DELETE_CUSTOMER_INVOICES_REJECTED'
export const DELETE_CUSTOMER_INVOICES_REQUESTED = globalIdent + 'DELETE_CUSTOMER_INVOICES_REQUESTED'
export const DELETE_CUSTOMER_INVOICES_SUCCEDED = globalIdent + 'DELETE_CUSTOMER_INVOICES_SUCCEDED'

/*
  Unbilled Services
*/
export const FETCH_UNBILLED_SERVICES_REJECTED = globalIdent + 'FETCH_UNBILLED_SERVICES_REJECTED'
export const FETCH_UNBILLED_SERVICES_REQUESTED = globalIdent + 'FETCH_UNBILLED_SERVICES_REQUESTED'
export const FETCH_UNBILLED_SERVICES_SUCCEDED = globalIdent + 'FETCH_UNBILLED_SERVICES_SUCCEDED'
