// Libraries
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

// Components
import ModalTemplate from 'GlobalComponents/ModalTemplate'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import PaymentAmount from './components/PaymentAmount'
import PaymentMethod from './components/PaymentMethod'
import TabHeader from './components/TabHeader'

// Actions
import fetchCustomerInvoices from 'Actions/invoices/fetchCustomerInvoices'
import fetchLicenseeInvoices from 'Actions/invoices/fetchLicenseeInvoices'
import fetchPaymentInformationOfCustomer from 'Actions/customers/fetchPaymentInformationOfCustomer'
import receivePayment from 'Actions/payments/receivePayment'

// Styles
import './index.css'

// Controller
import { appController } from 'Controllers'

class ReceivePayment extends React.Component {
  state = {
    address_billing: '',
    address2_billing: '',
    amount: '0.00',
    card_number: '',
    card_expiration_month: '',
    card_expiration_year: '',
    city_billing: '',
    customerDisabled: false,
    customerPayment: {},
    first_name_billing: '',
    isCCTouched: false,
    isTouched: false,
    last_name_billing: '',
    paymentDate: moment(),
    checkNumber: '',
    paymentType: 'customer_balance',
    selectedInvoices: [],
    state_billing: '',
    tab: 0,
    totalamount: '',
    zip_billing: ''
  }

  static propTypes = {
    customer: PropTypes.object
  }

  static defaultProps = {
    customer: {}
  }

  ccValidation = {
    'first_name_billing': ['required'],
    'last_name_billing': ['required'],
    'card_number': ['required', 'cc'],
    'card_expiration_month': ['required'],
    'card_expiration_year': ['required'],
    'address_billing': ['required'],
    'address2_billing': ['required'],
    'city_billing': ['required'],
    'state_billing': ['required'],
    'zip_billing': ['required', 'zip']
  }

  componentDidMount () {
    const {
      customer,
      invoiceId,
      invoices,
      fetchCustomerInvoices,
      fetchPaymentInformationOfCustomer
    } = this.props

    const { paymentInformation, user_id: customerId } = customer

    if (customerId) {
      fetchPaymentInformationOfCustomer(customerId)
      if (!invoices && !invoices.length) fetchCustomerInvoices(customerId)
    }

    if (paymentInformation && !parseFloat(paymentInformation.balance)) {
      if (paymentInformation.billing && paymentInformation.billing.card_digits) {
        this.setState({ paymentType: 'existing' })
      } else {
        this.setState({ paymentType: 'cash' })
      }
    }
    if (invoiceId) this.toggleCheckbox(null, invoiceId)
  }

  componentWillReceiveProps (nextProps) {
    const nextCustomerId = nextProps.customer && nextProps.customer.user_id
    const { customer, fetchCustomerInvoices, fetchPaymentInformationOfCustomer } = this.props
    const customerId = customer && customer.user_id
    if (!nextProps.customer.paymentInformation && !nextProps.customersLoading) {
      fetchPaymentInformationOfCustomer(customerId)
    }
    if (((!customerId && nextCustomerId) ||
      ((customerId || '').toString() !== (nextCustomerId || '').toString())
    ) && (!nextProps.invoices && !nextProps.invoices.length)) {
      fetchCustomerInvoices(nextCustomerId)
    }
  }

  actionButton = () => {
    const { customer = {}, customersLoading } = this.props
    const { amount, selectedInvoices, tab } = this.state

    if (tab === 0) {
      return {
        loading: customersLoading,
        disabled: customersLoading || (selectedInvoices.length < 1 || this.remainingAmount() > 0) || !customer.paymentInformation,
        onClick: () => this.setState({ isTouched: true }, () => {
          if (customer) this.setState({ tab: 1, amount })
        }),
        text: 'Next'
      }
    }

    if (tab === 1) {
      return {
        disabled: this.props.disabled || !this.state.paymentType,
        onClick: () => { if (this.isCCModalValid()) this.setState({ tab: 2 }) },
        text: 'Next'
      }
    }

    if (tab === 2) {
      return {
        disabled: this.props.disabled,
        loading: this.props.paymentLoading,
        onClick: this.makePayment,
        text: 'Submit Payment'
      }
    }
  }
  changeAmount = ({ target: { value: amount } }) => this.setState({ amount })
  changeCheckNumber = ({ target: { value: checkNumber } }) => this.setState({ checkNumber })
  changeCustomer = ({ label, value: customerId }) => {
    this.setState({ selectedInvoices: [] })
    appController.actions.toggleModal({
      canClose: true,
      data: { customerId, invoiceId: null },
      isOpen: true,
      modalIdentifier: appController.constants.RECIVE_PAYMENT_MODAL_IDENTIFIER
    })
  }
  changePaymentDate = (paymentDate) => this.setState({ paymentDate })
  changePaymentType = ({ target: { value: paymentType } }) => this.setState({ paymentType })
  changeTab = tab => this.setState({ tab })
  closeModal = () => {
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: false,
      modalIdentifier: null
    })
  }
  handleInputChange = (name, event, type) => {
    if (type === 'select') this.setState({ [name]: event.value })
    else this.setState({ [name]: event.target.value })
  }
  isChecked = invoiceId => this.state.selectedInvoices.indexOf(invoiceId) !== -1
  toggleCheckbox = (e, invoiceId) => {
    const selectedInvoices = this.state.selectedInvoices.slice()
    if (this.isChecked(invoiceId)) {
      const index = selectedInvoices.findIndex(i => i.toString() === invoiceId.toString())
      selectedInvoices.splice(index, 1)
    } else {
      selectedInvoices.push(invoiceId)
    }
    this.setState({ selectedInvoices })
  }
  remainingAmount = () => {
    const { invoices } = this.props
    const { amount, selectedInvoices } = this.state
    let sI = selectedInvoices.map(i => i.toString())
    let remaining = invoices
      .filter(i => sI.indexOf(i.id.toString()) > -1)
      .reduce((remaining, { outstanding }) => parseFloat(remaining) - parseFloat(outstanding), amount)
    return remaining < 0 ? 0 : parseFloat(remaining)
  }

  isCCValid = (field) => {
    if (this.state.isCCTouched && this.state.paymentType === 'new') {
      let isValid = true
      if (this.ccValidation[field]) {
        this.ccValidation[field].map(item => {
          switch (item) {
            case 'required':
              if (this.state[field]) {
                isValid = true
              } else { isValid = false }
              break
          }
        })
      } else {
        return ''
      }
      if (isValid) {
        return ''
      } else {
        return 'errBorder'
      }
    }
    return ''
  }
  isCCModalValid = () => {
    let isValid = true
    this.setState({ isCCTouched: true })
    for (let field in this.state) {
      if (this.isCCValid(field) === 'errBorder') {
        isValid = false
      }
    }
    return isValid
  }

  makePayment = () => {
    const { customer: { user_id: customerId }, receivePayment } = this.props
    if (this.state.amount > 0) {
      const itemList = {
        address_billing: this.state.address_billing,
        address2_billing: this.state.address2_billing,
        amount: this.state.amount,
        card_number: this.state.card_number,
        card_expiration_month: this.state.card_expiration_month,
        card_expiration_year: this.state.card_expiration_year,
        card_type: this.state.card_type,
        city_billing: this.state.city_billing,
        customer_id: customerId,
        cvv: this.state.cvv,
        first_name_billing: this.state.first_name,
        invoices: this.state.selectedInvoices.join(','),
        last_name_billing: this.state.last_name,
        pay_with: this.state.paymentType,
        state_billing: this.state.state_billing,
        zip_billing: this.state.zip_billing
      }
      if (itemList.pay_with === 'cash') {
        itemList.date_cash = this.state.paymentDate
      }
      if (itemList.pay_with === 'check') {
        itemList.date_check = this.state.paymentDate
        itemList.check_number = Number(this.state.checkNumber)
      }
      receivePayment(itemList, this.recievePaymentCallback)
    } else {
      toast.error('Invalid Amount !', { position: toast.POSITION.LEFT })
    }
  }

  recievePaymentCallback = () => {
    const {
      customer: { user_id: customerId },
      fetchCustomerInvoices
      // fetchLicenseeInvoices,
      // invoicesStartDate,
      // invoicesEndDate
    } = this.props

    // if (invoicesStartDate && invoicesEndDate) fetchLicenseeInvoices(invoicesStartDate, invoicesEndDate)
    // fetchLicenseeInvoices()
    if (customerId) fetchCustomerInvoices(customerId)

    this.closeModal()
  }

  render () {
    const { customer, customersLoading, invoices, app } = this.props
    const {
      amount,
      cvv,
      isTouched,
      paymentDate,
      paymentType,
      checkNumber,
      selectedInvoices,
      tab
    } = this.state
    const { paymentInformation } = customer
    const customerDisabled = app.modal.data.source === 'customer'

    return <ModalTemplate
      title='Receive Payment'
      actions={[this.actionButton()]}
      body={() => <div className='ReceivePayment'>
        <div className='issue-credit-container'>
          <TabHeader onClickTab={this.changeTab} tab={tab} />

          {Number(tab) === 0 && <PaymentAmount
            amount={amount}
            changeAmount={this.changeAmount}
            customer={customer.user_id}
            customerSelectDisabled={customerDisabled}
            customerSelectError={!!(!customer && isTouched)}
            customerSelectOnChange={this.changeCustomer}
            customerSelectValue={customer.user_id}
            invoices={invoices}
            isChecked={this.isChecked}
            loading={customersLoading}
            toggleCheckbox={this.toggleCheckbox}
          />}

          {Number(tab) === 1 && <PaymentMethod
            address_billing={this.state.address_billing}
            address2_billing={this.state.address2_billing}
            amount={amount}
            card_expiration_month={this.state.card_expiration_month}
            card_expiration_year={this.state.card_expiration_year}
            card_number={this.state.card_number}
            city_billing={this.state.city_billing}
            changePaymentDate={this.changePaymentDate}
            changeCheckNumber={this.changeCheckNumber}
            changePaymentType={this.changePaymentType}
            customerPayment={paymentInformation}
            checkNumber={checkNumber}
            cvv={cvv}
            first_name_billing={this.state.first_name_billing}
            handleInputChange={this.handleInputChange}
            isCCValid={this.isCCValid}
            last_name_billing={this.state.last_name_billing}
            paymentDate={paymentDate}
            paymentType={paymentType}
            state_billing={this.state.state_billing}
            zip_billing={this.state.zip_billing}
          />}

          {Number(tab) === 2 && <div className='tab-container'>
            <div className='input-container'>
              <ModalTemplateField label='Customer:' input={<span className='check-label'>{`${customer.first_name} ${customer.last_name}`}</span>} />
              <ModalTemplateField label='Amount:' input={<span className='check-label'>${parseFloat(amount).toFixed(2)}</span>} />
              <ModalTemplateField label='Applied To:' input={<span className='check-label'>{selectedInvoices.join(', ')}</span>} />
              <ModalTemplateField label='Payment Method:' input={<div>
                {paymentType !== 'existing' && <span className='check-label'>
                  {paymentType}
                </span>}
                {paymentType === 'existing' && <span className='check-label'>
                  {paymentInformation.billing.card_type} ************* {paymentInformation.billing.card_digits.substr(paymentInformation.billing.card_digits.length - 4)}
                </span>}
                {paymentType === 'new' && <span className='check-label'>
                  {this.state.card_number}
                </span>}
              </div>} />
            </div>
          </div>}
        </div>
      </div>}
    />
  }
}
const mapStateToProps = (state, props) => {
  const { customerId, custid } = state.app.modal.data || {}
  const invoiceId = state.app.modal.data.invoice_id

  const customer = (customerId || custid) ? state.customers.customers
    .find(c => c.user_id.toString() === (customerId || custid).toString()) : {}
  const invoices = (customerId || custid) ? state.invoices.invoices
    .filter(i => i.user_id.toString() === (customerId || custid).toString())
    .filter(({ status }) => status === 'unpaid' || status === 'partial')
    .map(i => ({ ...i, outstanding: parseFloat(parseFloat(i.owed) - parseFloat(i.paid)) })) : []

  return {
    app: state.app,
    customers: state.customers && state.customers.customers ? state.customers.customers : [],
    invoicesData: state.invoices,
    customer,
    customersLoading: state.customers.loading,
    invoiceId,
    invoices,
    invoicesStartDate: state.invoices.startDate,
    invoicesEndDate: state.invoices.endDate,
    paymentLoading: state.payments.loading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCustomerInvoices: bindActionCreators(fetchCustomerInvoices, dispatch),
  fetchLicenseeInvoices: bindActionCreators(fetchLicenseeInvoices, dispatch),
  fetchPaymentInformationOfCustomer: bindActionCreators(fetchPaymentInformationOfCustomer, dispatch),
  receivePayment: bindActionCreators(receivePayment, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceivePayment)
