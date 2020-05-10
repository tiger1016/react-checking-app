// Libraries
import _ from 'lodash'
import Moment from 'moment'

// Models
import BaseModel from '../baseModel'

export default class InvoicesModel extends BaseModel {
  createInvoice = (state, { newInvoice }) => this.updateInvoices(state, { invoices: [newInvoice], overwrite: false })

  deleteCustomerInvoices = (state, { customerId }) => {
    const invoices = state.invoices.filter(i => i.user_id.toString() !== customerId.toString())
    return this.updateInvoices(state, { invoices, overwrite: true })
  }

  deleteInvoices = (state, { ids = [] }) => {
    ids = ids.map(i => i.toString())
    const invoices = state.invoices.filter(i => ids.indexOf(i.id.toString()) < 0)
    return this.updateInvoices(state, { invoices, overwrite: true })
  }

  updateInvoice = (state, { invoiceDetails, oldInvoiceId }) => {
    const invoice = invoiceDetails.process
    invoice.items = invoiceDetails.items
    invoice.paids = invoiceDetails.paids
    const invoices = state.invoices.map(i => `${i.id}` === `${oldInvoiceId}` ? {
      ...i,
      ...invoice
    } : i)
    return this.updateInvoices(state, { invoices, overwrite: true })
  }

  updateInvoiceDetails = (state, { invoiceDetail = {} }) => {
    const invoices = state.invoices.slice()
    if (invoiceDetail.process && invoiceDetail.invoice && invoiceDetail.invoice.items) {
      const index = invoices.findIndex(item => item.id.toString() === invoiceDetail.process.id.toString())
      if (index !== -1) {
        invoices[index] = { ...invoices[index], ...invoiceDetail.process }
        invoices[index].items = [...invoiceDetail.invoice.items]
        invoices[index].paids = [...invoiceDetail.invoice.paids]
        invoices[index].billing_timing = invoiceDetail.customer.billing_timing
      } else {
        const newInvoice = invoiceDetail.process
        newInvoice.items = [...invoiceDetail.invoice.items]
        newInvoice.paids = [...invoiceDetail.invoice.paids]
        newInvoice.billing_timing = invoiceDetail.customer.billing_timing
        invoices.unshift(newInvoice)
      }
    }
    return this.updateInvoices(state, { invoices })
  }

  updateInvoices = (state, { invoices, start_date, end_date, overwrite = true }) => { // eslint-disable-line camelcase
    if (_.isArray(invoices)) {
      return {
        ...state,
        end_date,
        error: null,
        invoices: overwrite ? [...invoices]
          : _.orderBy(_.values(_.unionWith(invoices, state.invoices, (l, r) => l.invoice_id === r.invoice_id)), o => new Moment(o.ts), ['desc']),
        loading: false,
        loadingMessage: null,
        loadingLogo: false,
        start_date
      }
    }
    return state
  }
}

export const invoicesModel = new InvoicesModel()
