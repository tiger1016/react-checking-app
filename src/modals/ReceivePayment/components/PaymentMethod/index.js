// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

// Components
import CCVInput from 'GlobalComponents/input/CCVInput'
import CreditCardInput from 'GlobalComponents/input/CreditCardInput'
import DatePickerInput from 'GlobalComponents/input/DatePicker'
import DaysOfMonthSelect from 'GlobalComponents/input/DaysOfMonthSelect'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import StateSelect from 'GlobalComponents/input/StateSelect'
import TextInput from 'GlobalComponents/input/TextInput'
import YearSelect from 'GlobalComponents/input/YearSelect'
import ZipInput from 'GlobalComponents/input/ZipInput'

export default class PaymentMethod extends React.PureComponent {
  static propTypes = {
    amount: PropTypes.string.isRequired,
    changePaymentDate: PropTypes.func.isRequired,
    changePaymentType: PropTypes.func.isRequired,
    customerPayment: PropTypes.object.isRequired,
    cvv: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    isCCValid: PropTypes.func.isRequired,
    paymentDate: PropTypes.object,
    paymentType: PropTypes.string.isRequired
  }

  static defaultProps = {
    cvv: '',
    paymentDate: moment()
  }

  render () {
    const {
      amount,
      changePaymentDate,
      changePaymentType,
      changeCheckNumber,
      customerPayment,
      cvv,
      handleInputChange,
      isCCValid,
      paymentDate,
      checkNumber,
      paymentType
    } = this.props

    return <div className='tab-container padding-bottom' style={{ height: '460px', overflow: 'auto' }}>
      <div className='input-container'>

        {!!parseFloat(customerPayment.balance) && <ModalTemplateField
          label='Select a payment:'
          input={<div>
            <input
              type='radio'
              name='paymentType'
              value='customer_balance'
              disabled={parseFloat(customerPayment.balance) < parseFloat(amount)}
              checked={paymentType === 'customer_balance'}
              onChange={changePaymentType}
            />
            <span className='check-label'>Credit balance (${customerPayment.balance})</span>
          </div>}
        />}

        {customerPayment.billing && customerPayment.billing.card_digits && <ModalTemplateField
          label=''
          input={<div>
            <input
              type='radio'
              name='paymentType'
              value='existing'
              checked={paymentType === 'existing'}
              onChange={changePaymentType}
            />
            <span className='check-label'>Credit card on file ending in ************{customerPayment.billing.card_digits.substr(customerPayment.billing.card_digits.length - 4)}</span>
          </div>}
        />}

        <ModalTemplateField
          label=''
          input={<div>
            <input
              type='radio'
              name='paymentType'
              value='cash'
              checked={paymentType === 'cash'}
              onChange={changePaymentType}
            />
            <span className='check-label'>Cash</span>
          </div>}
        />

        {paymentType === 'cash' && <div className='checkPayment-container'>
          <ModalTemplateField
            label='Enter a Payment Date:'
            input={<DatePickerInput
              type='radio'
              name='paymentDate'
              value={paymentDate || moment()}
              onChange={changePaymentDate}
            />}
          />
        </div>}

        <ModalTemplateField
          label=''
          input={<div>
            <input
              type='radio'
              name='paymentType'
              value='check'
              checked={paymentType === 'check'}
              onChange={changePaymentType}
            />
            <span className='check-label'>Check</span>
          </div>}
        />

        {paymentType === 'check' && <div className='checkPayment-container'>
          <ModalTemplateField
            label='Enter a Payment Date:'
            input={<DatePickerInput
              name='paymentDate'
              value={paymentDate || moment()}
              onChange={changePaymentDate}
            />}
          />
          <ModalTemplateField
            label='Enter Check Number:'
            input={<TextInput
              number
              value={checkNumber}
              onChange={changeCheckNumber}
            />}
          />
        </div>}

        <ModalTemplateField
          label=''
          input={<div>
            <input
              type='radio'
              name='paymentType'
              value='new'
              checked={paymentType === 'new'}
              onChange={changePaymentType}
            />
            <span className='check-label'>Enter a new credit card</span>
          </div>}
        />

        {paymentType === 'new' && <div className='ccPayment-container'>
          <ModalTemplateField
            label='Name on Card*'
            input={<div className='dualInput'>
              <TextInput
                error={isCCValid('first_name_billing')}
                value={this.props.first_name_billing}
                onChange={(e) => handleInputChange('first_name_billing', e)}
              />
              <span className='pad10' />
              <TextInput
                error={isCCValid('last_name_billing')}
                value={this.props.last_name_billing}
                onChange={(e) => handleInputChange('last_name_billing', e)}
              />
            </div>}
          />

          <ModalTemplateField
            label='Card*'
            input={<CreditCardInput
              type2
              error={isCCValid('card_number')}
              name='address_billing'
              value={this.props.card_number}
              onChange={(e) => handleInputChange('card_number', e)}
            />}
          />

          <ModalTemplateField
            label='Expires*'
            input={<div className='dualInput'>
              <DaysOfMonthSelect
                error={isCCValid('card_expiration_month')}
                clearable={false}
                onChange={(e) => handleInputChange('card_expiration_month', e, 'select')}
                value={this.props.card_expiration_month}
              />
              <span className='pad10' />
              <YearSelect
                error={isCCValid('card_expiration_year')}
                clearable={false}
                onChange={(e) => handleInputChange('card_expiration_year', e, 'select')}
                value={this.props.card_expiration_year}
              />
            </div>}
          />

          <ModalTemplateField
            label='CVV*'
            input={<CCVInput
              error={isCCValid('address_billing')}
              value={cvv}
              onChange={(e) => handleInputChange('cvv', e)}
            />}
          />

          <ModalTemplateField
            label='Billing Address*'
            input={<TextInput
              error={isCCValid('address_billing')}
              value={this.props.address_billing}
              onChange={(e) => handleInputChange('address_billing', e)}
            />}
          />

          <ModalTemplateField
            label='Billing Address2*'
            input={<TextInput
              error={isCCValid('address2_billing')}
              value={this.props.address2_billing}
              onChange={(e) => handleInputChange('address2_billing', e)}
            />}
          />

          <ModalTemplateField
            label='City*'
            input={<TextInput
              error={isCCValid('city_billing')}
              value={this.props.city_billing}
              onChange={(e) => handleInputChange('city_billing', e)}
            />}
          />

          <ModalTemplateField
            label='State and Zip*'
            input={<div className='dualInput'>
              <StateSelect
                error={isCCValid('state_billing')}
                id='state_billing'
                clearable={false}
                value={this.props.state_billing}
                onChange={(e) => handleInputChange('state_billing', e, 'select')}
              />
              <span className='pad10' />
              <ZipInput
                error={isCCValid('zip_billing')}
                id='customer_card_zip'
                value={this.props.zip_billing}
                onChange={(e) => handleInputChange('zip_billing', e)}
              />
            </div>}
          />
        </div>}

        {(!paymentType) && parseFloat(customerPayment.balance) < parseFloat(amount) && <div className='failed'>
          <i className='ion-android-warning' />
          <span>Payment amount exceeds credit balance. Please select
          another form of payment or go back and enter different
          payment amount.</span>
        </div>}
      </div>
    </div>
  }
}
