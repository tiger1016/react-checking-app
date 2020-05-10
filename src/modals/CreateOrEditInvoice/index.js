// Libraries
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

// Components
import Head from './components/Head'
import InvoicesTable from './components/InvoicesTable'
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import Totals from './components/Totals'
// import UnbilledServicesSelect from 'GlobalComponents/input/UnbilledServicesSelect'

// Controllers
import { appController } from 'Controllers'

// Actions
import createInvoice from 'Actions/invoices/createInvoice'
import fetchBasicProfile from 'Actions/profile/fetchBasicProfile'
import fetchInvoiceDetail from 'Actions/invoices/fetchInvoiceDetail'
import fetchUnbilledServices from 'Actions/customers/fetchUnbilledServices'
import updateInvoice from 'Actions/invoices/updateInvoice'

// Functions
import handleChangeComments from './functions/handleChangeComments'
import handleChangeDueDate from './functions/handleChangeDueDate'
import handleChangeTerms from './functions/handleChangeTerms'
import save from './functions/save'
import updateTotals from './functions/updateTotals'

// Styles
import './index.css'

class CreateOrEditInvoice extends React.Component {
  static propTypes = {
    customerId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    invoiceId: PropTypes.number,
    salesTaxPercentage: PropTypes.number.isRequired
  }

  static defaultProps = {
    customerId: null,
    invoiceId: null
  }

  state = {
    comments: '',
    cron_generated: '',
    customer_name: '',
    customerId: this.props.customerId,
    billingTiming: this.props.customer.billing_timing || 'arrear',
    discount: '',
    discount_type: 'dollar',
    discountAmount: '',
    dollar: '',
    first_name: '',
    invoice: {},
    invoiceList: [],
    invoice_terms: 'upon_receipt',
    isTouched: false,
    last_name: '',
    log: '',
    owed: '',
    paid: '',
    refunded: '',
    requested_time: '',
    sales_tax_percentage: 0,
    salesTax: 0,
    dueDate: moment(),
    startDate: moment(),
    endDate: moment(),
    status: '',
    subTotal: '',
    total: 0.00
  }

  // bind handler functions
  handleChangeComments = handleChangeComments(this)
  handleChangeDueDate = handleChangeDueDate(this)
  handleChangeTerms = handleChangeTerms(this)
  updateTotals = updateTotals(this)
  save = save(this)

  componentWillMount () {
    const {
      customerId,
      customer,
      fetchBasicProfile,
      fetchInvoiceDetail,
      invoice,
      invoiceId,
      fetchUnbilledServices
    } = this.props

    if (invoiceId) {
      if (!invoice.items) {
        fetchInvoiceDetail(invoice.id)
      }

      this.setState({
        comments: invoice.comments || '',
        cron_generated: invoice.cron_generated,
        customer_name: invoice.first_name + ' ' + invoice.last_name,
        discount: invoice.discount,
        discountAmount: invoice.discount_amount || invoice.discount,
        discount_type: invoice.discount_type,
        first_name: invoice.first_name,
        invoice_terms: invoice.invoice_terms,
        last_name: invoice.last_name,
        log: invoice.log,
        paid: invoice.paid,
        refunded: invoice.refunded,
        requested_time: '',
        sales_tax_percentage: invoice.sales_tax_percentage,
        salesTax: invoice.sales_tax || (invoice.total * invoice.sales_tax_percentage / 100),
        dueDate: invoice.dueDate ? moment(invoice.dueDate) : moment(invoice.date),
        startDate: invoice.startDate ? moment(invoice.startDate) : moment(invoice.date),
        endDate: invoice.endDate ? moment(invoice.endDate) : moment(invoice.date),
        status: invoice.status,
        subTotal: invoice.total,
        total: invoice.owed
      })
    }

    if (!this.isprofileInfo()) fetchBasicProfile()

    if (customerId) {
      this.setState({ disableCustomerSelect: true })

      if (customer.billing_timing === 'prepay') {
        const { startDate, endDate } = this.state
        if (endDate && startDate && customerId) {
          fetchUnbilledServices(customerId, null, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
        }
      } else {
        fetchUnbilledServices(customerId)
      }
    }
  }

  handleChangeCustomerName = (customer) => {
    this.setState({
      customerId: customer.value,
      customer_name: customer.name,
      billingTiming: customer.billingTiming
    }, () => {
      if (customer.billingTiming === 'prepay') {
        this.setState({
          startDate: moment(),
          endDate: moment()
        })
      }
      this.checkUnbillServicesValues()
    })
  }

  handleChangeStartDate = startDate => {
    this.setState({ startDate: startDate }, () => {
      this.checkUnbillServicesValues()
    })
  }

  handleChangeEndDate = endDate => {
    this.setState({ endDate: endDate }, () => {
      this.checkUnbillServicesValues()
    })
  }

  checkUnbillServicesValues = () => {
    const { startDate, endDate, customerId, billingTiming } = this.state
    const { fetchUnbilledServices } = this.props

    if (billingTiming !== 'prepay') {
      fetchUnbilledServices(customerId)
    } else if (endDate && startDate && customerId) {
      fetchUnbilledServices(customerId, null, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
    }
  }

  closeModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: false,
      modalIdentifier: null
    })
  }

  isprofileInfo = () => this.props.invoice

  render () {
    const { disabled, invoiceId, salesTaxPercentage } = this.props
    const {
      comments,
      customerId,
      disableCustomerSelect,
      discountAmount,
      isTouched,
      salesTax,
      subTotal,
      dueDate,
      startDate,
      endDate,
      total
    } = this.state

    return <ModalTemplate
      actions={[
        {
          disabled,
          onClick: this.closeModal,
          text: 'Cancel',
          textOnly: true
        },
        {
          // local dcalred functions are showing up as undefined, investigate
          disabled: this.props.disabled && !this.state.customerId && !this.state.startDate && (this.state.customer.billingTiming === 'prepay' && !this.state.endDate),
          onClick: this.save,
          text: invoiceId ? 'UPDATE INVOICE' : 'CREATE INVOICE'
        }
      ]}
      body={<div id='CreateOrEditInvoice'>
        <div className='issue-billing-box'>
          <Head
            customerId={customerId}
            comments={comments}
            disableCustomerSelect={disableCustomerSelect}
            onChangeComments={this.handleChangeComments}
            onChangeCustomerName={this.handleChangeCustomerName}
            onChangeDueDate={this.handleChangeDueDate}
            onChangeStartDate={this.handleChangeStartDate}
            onChangeEndDate={this.handleChangeEndDate}
            onChangeTerms={this.handleChangeTerms}
            invoiceTerm={this.state.invoice_term}
            invoiceTerms={this.state.invoice_terms}
            isTouched={isTouched}
            dueDate={dueDate}
            startDate={startDate}
            endDate={endDate}
            billingTiming={this.state.billingTiming}
          />
          <InvoicesTable
            customerId={customerId}
            updateTotals={this.updateTotals}
          />
          <Totals
            discountAmount={discountAmount}
            salesTax={salesTax}
            salesTaxPercentage={salesTaxPercentage}
            subTotal={subTotal}
            total={total}
          />
        </div>
      </div>}
      title={invoiceId ? 'Edit Invoice' : 'New Invoice'}
    />
  }
}

const mapStateToProps = (state) => {
  // Selected customer
  const customerId = (state.app.modal.data.customerId && parseInt(state.app.modal.data.customerId)) || null
  const customer = (customerId && state.customers.customers.find(c => `${c.user_id}` === `${customerId}`)) || {}
  const customerUnbilledServices = customer && customer.unbilledServices ? customer.unbilledServices : []
  // create or edit
  const invoiceId = state.app.modal.data.invoiceId
  const invoice = state.invoices.invoices.find(i => `${i.invoice_id}` === `${invoiceId}`) || {}

  // Other
  const salesTaxPercentage = (state.profile.profile.sales_tax_percentage || (state.profile.profile.shipping_information && state.profile.profile.shipping_information.sales_tax_percentage)) || 0

  return {
    customerId,
    customer,
    customerUnbilledServices,
    invoiceId,
    invoice,
    salesTaxPercentage
  }
}

const mapDispatchToProps = dispatch => ({
  createInvoice: bindActionCreators(createInvoice, dispatch),
  fetchBasicProfile: bindActionCreators(fetchBasicProfile, dispatch),
  fetchInvoiceDetail: bindActionCreators(fetchInvoiceDetail, dispatch),
  fetchUnbilledServices: bindActionCreators(fetchUnbilledServices, dispatch),
  updateInvoice: bindActionCreators(updateInvoice, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrEditInvoice)
