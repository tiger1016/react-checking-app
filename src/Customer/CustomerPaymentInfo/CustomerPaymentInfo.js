// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { appController } from 'Controllers/appController'
import { customersController } from 'Controllers/customersController'

// Components
import Button from 'GlobalComponents/Button'
import DataDisplay from 'GlobalComponents/DataDisplay'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Functions
import creditCardCheck from 'Functions/services/creditCardCheckService'
import notify from 'Functions/app/notify'

// Styles
import './index.css'

const CC_INPUT_NAMES = ['card_digits', 'cvv', 'card_expiration_month', 'card_expiration_year']

class CustomerPaymentInfo extends React.PureComponent {
  state = {
    errors: [],
    isEditing: false,
    billingInformation: this.props.billingInformation,
    cardLoading: false,
    billingInformationUnchanged: this.props.billingInformation,
    changedCCInfo: false
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!_.isEqual(nextProps.billingInformation, prevState.billingInformationUnchanged)) {
      return {
        billingInformation: nextProps.billingInformation,
        billingInformationUnchanged: nextProps.billingInformation
      }
    }
    return null
  }

  isStateChanged = () => {
    const { billingInformation, billingInformationUnchanged } = this.state
    return !_.isEqual({ ...billingInformation, cvv: null }, { ...billingInformationUnchanged, cvv: null })
  }

  toggleEdit = () => {
    const { isEditing, billingInformationUnchanged } = this.state
    if (isEditing) {
      if (this.isStateChanged()) {
        appController.confirmDiscardChanges(() => {
          this.setState({
            billingInformation: { ...billingInformationUnchanged },
            changedCCInfo: false,
            isEditing: false
          })
        })
      } else {
        this.setState({ isEditing: false, changedCCInfo: false })
      }
    } else {
      this.setState({ isEditing: true })
    }
  }

  handleInputChange = item => {
    const { billingInformation } = this.state
    const bI = {
      ...billingInformation,
      [item.target.name]: item.target.value
    }

    if (item.target.name === 'card_digits') {
      bI.card_type = (utility.isWhichCreditCard(bI.card_digits) ? (utility.capitalizeFirstLetter(utility.isWhichCreditCard(bI.card_digits).title) || '') : '')
    }
    this.setState({ billingInformation: bI, changedCCInfo: CC_INPUT_NAMES.includes(item.target.name) })
  }

  handleInputValidate = ({ name, error }) => {
    const { errors } = this.state
    if (error && !errors.filter(e => e.name === name).length) {
      this.setState({ errors: [...errors, { name, error }] })
    } else if (!error) {
      this.setState({ errors: errors.filter(e => e.name !== name) })
    }
  }

  createHandleSelectChange = name => selected => {
    const billingInformation = { ...this.state.billingInformation }
    billingInformation[name] = selected.value
    this.setState({ billingInformation, changedCCInfo: CC_INPUT_NAMES.includes(name) })
  }

  submit = () => {
    const { customerId } = this.props
    const { billingInformation, changedCCInfo } = this.state
    this.setState({ cardLoading: true })
    if (billingInformation.payment_type === 'cc' && changedCCInfo) {
      const _creditCard = {
        expirationDate: billingInformation.card_expiration_month + '/' + billingInformation.card_expiration_year,
        number: billingInformation.card_digits,
        cvv: billingInformation.cvv,
        billingAddress: {
          postalCode: billingInformation.zip_billing
        }
      }

      if (_creditCard.cvv && _creditCard.cvv.includes('*')) delete _creditCard.cvv
      const expDate = moment(_creditCard.expirationDate, 'MM/YYYY')
      const now = moment()

      if (expDate.isAfter(now, 'month') || expDate.isSame(now, 'month')) {
        creditCardCheck(_creditCard, (err, response) => {
          this.setState({ cardLoading: false })
          if (err) { } else if (response) {
            const paymentData = { ...billingInformation }
            paymentData.nonce = response.creditCards[0].nonce
            customersController.actions.updateCustomerPaymentInformation(customerId, paymentData, (err, data) => {
              if (!err) {
                this.setState({ isEditing: false })
              }
            })
          }
        })
      } else {
        this.setState({ cardLoading: false })
        notify('error', 'Invalid Expiration Date!')
      }
    } else {
      this.setState({ cardLoading: false })
      customersController.actions
        .updateCustomerPaymentInformation(customerId, {
          ...billingInformation, nonce: true, noCCUpdates: true
        }, (err, data) => {
          if (!err) {
            this.setState({ isEditing: false })
          }
        })
    }
  }

  render () {
    const { balance, customerPaymentInfoIsLoading } = this.props
    const { cardLoading, errors, isEditing } = this.state
    let { billingInformation } = this.state
    billingInformation = billingInformation || {}

    return <div id='CustomerPaymentInfo'>
      <SectionHeader title={`Payment Info`} noPadding rightComponent={<Button onClick={this.toggleEdit} textOnly iconOnly='ion-edit' />} />
      <div className='balance'><span className='label'>Balance</span> {balance}</div>
      <div className='grid'>
        <DataDisplay edit={isEditing} items={[
          {
            displayAs: customersController.getBillingTitle(billingInformation.payment_type),
            label: 'Payment Type',
            loading: customerPaymentInfoIsLoading && !billingInformation.payment_type,
            name: 'payment_type',
            onChange: this.createHandleSelectChange('payment_type'),
            type: 'payment-type',
            value: billingInformation.payment_type,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'First Name on Card',
            loading: customerPaymentInfoIsLoading && !billingInformation.first_name_billing,
            name: 'first_name_billing',
            onChange: this.handleInputChange,
            value: billingInformation.first_name_billing,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Last Name on Card',
            loading: customerPaymentInfoIsLoading && !billingInformation.last_name_billing,
            name: 'last_name_billing',
            onChange: this.handleInputChange,
            value: billingInformation.last_name_billing,
            valueMinWidth: '180px'
          },
          {
            hide: true || billingInformation.payment_type !== 'cc',
            label: 'Card Type',
            loading: customerPaymentInfoIsLoading && !billingInformation.card_type,
            name: 'card_type',
            noEdit: true,
            onChange: this.handleInputChange,
            value: billingInformation.card_type,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Card Number',
            loading: customerPaymentInfoIsLoading && !billingInformation.card_digits,
            name: 'card_digits',
            cardType: billingInformation.card_type,
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'cc',
            required: billingInformation.payment_type === 'cc',
            value: billingInformation.card_digits,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'CVV',
            loading: customerPaymentInfoIsLoading && !billingInformation.cvv,
            name: 'cvv',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'ccv',
            required: billingInformation.payment_type === 'cc',
            value: billingInformation.cvv,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Card Expiration Month',
            loading: customerPaymentInfoIsLoading && !billingInformation.card_expiration_month,
            max: 12,
            min: 1,
            name: 'card_expiration_month',
            onChange: this.createHandleSelectChange('card_expiration_month'),
            type: 'number-select',
            required: billingInformation.payment_type === 'cc',
            value: billingInformation.card_expiration_month,
            valueMinWidth: '180px',
            zeroPadded: 1
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Card Expiration Year',
            loading: customerPaymentInfoIsLoading && !billingInformation.card_expiration_year,
            name: 'card_expiration_year',
            onChange: this.createHandleSelectChange('card_expiration_year'),
            onValidate: this.handleInputValidate,
            type: 'year-select',
            required: billingInformation.payment_type === 'cc',
            value: billingInformation.card_expiration_year,
            valueMinWidth: '180px'
          }
        ]} />
        <DataDisplay edit={isEditing} items={[
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Billing Address',
            loading: customerPaymentInfoIsLoading && !billingInformation.address_billing,
            name: 'address_billing',
            onChange: this.handleInputChange,
            value: billingInformation.address_billing,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Billing Address 2',
            loading: customerPaymentInfoIsLoading && !billingInformation.address2_billing,
            name: 'address2_billing',
            onChange: this.handleInputChange,
            value: billingInformation.address2_billing,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Billing City',
            loading: customerPaymentInfoIsLoading && !billingInformation.city_billing,
            name: 'city_billing',
            onChange: this.handleInputChange,
            value: billingInformation.city_billing,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Billing State',
            loading: customerPaymentInfoIsLoading && !billingInformation.state_billing,
            name: 'state_billing',
            onChange: this.createHandleSelectChange('state_billing'),
            onValidate: this.handleInputValidate,
            type: 'state',
            value: billingInformation.state_billing,
            valueMinWidth: '180px'
          },
          {
            hide: billingInformation.payment_type !== 'cc',
            label: 'Billing Zip',
            loading: customerPaymentInfoIsLoading && !billingInformation.zip_billing,
            name: 'zip_billing',
            onChange: this.handleInputChange,
            onValidate: this.handleInputValidate,
            type: 'zip',
            value: billingInformation.zip_billing,
            valueMinWidth: '180px'
          },
          {
            displayAs: customersController.getBillingTitle(billingInformation.billing_timing),
            label: 'Billing Timing',
            loading: customerPaymentInfoIsLoading && !billingInformation.billing_timing,
            name: 'billing_timing',
            onChange: this.createHandleSelectChange('billing_timing'),
            type: 'billing-timing',
            value: billingInformation.billing_timing,
            valueMinWidth: '180px'
          },
          {
            label: 'Billing Cycle',
            loading: customerPaymentInfoIsLoading && !billingInformation.billing_frequency,
            name: 'billing_frequency',
            onChange: this.createHandleSelectChange('billing_frequency'),
            type: 'billing-frequency',
            value: billingInformation.billing_frequency,
            valueMinWidth: '180px'
          },
          {
            label: 'Billing Day',
            loading: customerPaymentInfoIsLoading && !billingInformation.billing_date,
            name: 'billing_date',
            onChange: this.createHandleSelectChange('billing_date'),
            type: 'day-of-month',
            hide: billingInformation.billing_frequency !== 'monthly',
            value: billingInformation.billing_date,
            valueMinWidth: '180px'
          }
        ]} />
      </div>
      {isEditing ? <SaveCancel
        loading={cardLoading}
        disabled={(errors.length || customerPaymentInfoIsLoading) && billingInformation.payment_type === 'cc'}
        cancelOnClick={this.toggleEdit}
        saveOnClick={this.submit}
      /> : null}
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

CustomerPaymentInfo.propTypes = {
  balance: PropTypes.string,
  customerId: PropTypes.string.isRequired,
  paymentInformation: PropTypes.object
}

const mapStateToProps = (state, props) => {
  const { customerId } = props
  const customer = state.customers.customers.find(c => `${c.user_id}` === `${customerId}`)
  const isOwe = customer.total_unpaid - parseFloat(customer.balance)
  const balance = isOwe > 0 ? `(${utility.formatCurrency(isOwe)})` : utility.formatCurrency(isOwe)

  const paymentInformation = customer.paymentInformation
  const billing = paymentInformation ? paymentInformation.billing : {}
  const billingInformation = customersController.billingStructGenerator({ ...paymentInformation, ...billing })

  if (!billingInformation.payment_type) {
    billingInformation.payment_type = 'cc'
  }
  return {
    balance,
    customerPaymentInfoIsLoading: state.customers.loading,
    billingInformation
  }
}

export default withRouter(connect(mapStateToProps)(CustomerPaymentInfo))
