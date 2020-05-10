// Constants
import {
  CREATE_INVOICES_REJECTED,
  CREATE_INVOICES_REQUESTED,
  CREATE_INVOICES_SUCCEDED,
  DELETE_INVOICES_OF_CUSTOMER_SUCCEDED,
  DELETE_INVOICES_REQUESTED,
  DELETE_INVOICES_REJECTED,
  DELETE_INVOICES_SUCCEDED,
  FETCH_INVOICES_REJECTED,
  FETCH_INVOICES_REQUESTED,
  FETCH_INVOICES_SUCCEDED,
  FETCH_INVOICE_DETAIL_REJECTED,
  FETCH_INVOICE_DETAIL_REQUESTED,
  FETCH_INVOICE_DETAIL_SUCCEDED,
  UPDATE_INVOICE_REJECTED,
  UPDATE_INVOICE_REQUESTED,
  UPDATE_INVOICE_SUCCEDED
} from '../constants/invoices/Actions'

import { DELETE_CUSTOMER_SUCCEEDED } from '../constants/customers/Actions'

// Initial state
import initialstate from '../initialstate/invoices-init'

// Models
import { invoicesModel } from '../models/invoicesModel'

export default (state = initialstate, action) => {
  const { payload, type } = action
  switch (type) {
    /*
    Requested
    */
    case CREATE_INVOICES_REQUESTED:
    case DELETE_INVOICES_REQUESTED:
    case FETCH_INVOICE_DETAIL_REQUESTED:
    case FETCH_INVOICES_REQUESTED:
    case UPDATE_INVOICE_REQUESTED:
      return invoicesModel.loadingWithMessage(state, { message: payload })

    /*
    Rejected
    */
    case CREATE_INVOICES_REJECTED:
    case DELETE_INVOICES_REJECTED:
    case FETCH_INVOICE_DETAIL_REJECTED:
    case FETCH_INVOICES_REJECTED:
    case UPDATE_INVOICE_REJECTED:
      return invoicesModel.error(state, { error: payload })

    /*
    Succeded
    */
    case CREATE_INVOICES_SUCCEDED:
      return invoicesModel.createInvoice(state, { newInvoice: payload })

    case DELETE_INVOICES_OF_CUSTOMER_SUCCEDED:
      return invoicesModel.deleteCustomerInvoices(state, { customerId: payload })

    case DELETE_INVOICES_SUCCEDED:
      return invoicesModel.deleteInvoices(state, { ids: payload })

    case DELETE_CUSTOMER_SUCCEEDED:
      return invoicesModel.deleteCustomerInvoices(state, { customerId: payload.user_id })

    case FETCH_INVOICE_DETAIL_SUCCEDED:
      return invoicesModel.updateInvoiceDetails(state, { invoiceDetail: payload })

    case FETCH_INVOICES_SUCCEDED:
      return invoicesModel.updateInvoices(state, { invoices: payload, start_date: action.start_date, end_date: action.end_date, count: action.count, overwrite: action.overwrite })

    case UPDATE_INVOICE_SUCCEDED:
      return invoicesModel.updateInvoice(state, { invoiceDetails: payload, oldInvoiceId: action.oldInvoiceId })

    default:
      return state
  }
}
