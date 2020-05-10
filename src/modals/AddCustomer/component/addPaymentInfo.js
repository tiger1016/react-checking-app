// Libraries
import React, { Component } from 'react'

// Components
import BillingFrequencySelect from 'GlobalComponents/input/BillingFrequencySelect'
import BillingTimingSelect from 'GlobalComponents/input/BillingTimingSelect'
import CCVInput from 'GlobalComponents/input/CCVInput'
import CreditCardInput from 'GlobalComponents/input/CreditCardInput'
import DaysOfMonthSelect from 'GlobalComponents/input/DaysOfMonthSelect'
import InvoiceTermsSelect from 'GlobalComponents/input/InvoiceTermsSelect'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import NumberSelect from 'GlobalComponents/input/NumberSelect'
import PaymentTypeSelect from 'GlobalComponents/input/PaymentTypeSelect'
import StateSelect from 'GlobalComponents/input/StateSelect'
import TextInput from 'GlobalComponents/input/TextInput'
import YearSelect from 'GlobalComponents/input/YearSelect'
import ZipInput from 'GlobalComponents/input/ZipInput'

export default class AddPaymentInfo extends Component {
  render () {
    return <div className='sub-align' >
      <div className='container'>
        <div className='add-customer-title' >Billing Information</div>
        <ModalTemplateField
          label='Payment Type'
          input={<PaymentTypeSelect name='customer_paymant_type' id='customer_paymant_type' clearable={false} value={this.props.paymentInfo.payment_type} onChange={(e) => this.props.setParentState('select', e, 'payment_type')} />}
        />
        <ModalTemplateField
          label='Billing Timing'
          input={<BillingTimingSelect name='customer_billing_timing' id='customer_billing_timing' clearable={false} value={this.props.paymentInfo.billing_timing} onChange={(e) => this.props.setParentState('select', e, 'billing_timing')} />}
        />
        <ModalTemplateField
          label='Billing Cycle'
          input={<BillingFrequencySelect name='customer_billing_frequency' id='customer_billing_frequency' clearable={false} value={this.props.paymentInfo.billing_frequency} onChange={(e) => this.props.setParentState('select', e, 'billing_frequency')} />}
        />
        {this.props.paymentInfo.billing_frequency === 'monthly' &&
        <ModalTemplateField
          label='Billing Day'
          input={<DaysOfMonthSelect name='customer_select_date_of_month' id='customer_select_date_of_month' clearable={false} value={this.props.paymentInfo.billing_date} onChange={(e) => this.props.setParentState('select', e, 'billing_date')} />}
        /> }
        <ModalTemplateField
          label='Invoice Terms'
          input={<InvoiceTermsSelect name='customer_invoice_terms' id='customer_invoice_terms' clearable={false} value={this.props.paymentInfo.invoice_terms} onChange={(e) => this.props.setParentState('select', e, 'invoice_terms')} />}
        />

      </div>
      {this.props.paymentInfo.payment_type === 'cc' &&
      <div className='container two'>
        <div className='add-customer-title' >Credit Card Information</div>
        <ModalTemplateField
          label='Name on Card'
          input={<div className='dualInput'>
            <TextInput name='customer_credit_card_first_name' id='customer_credit_card_first_name' value={this.props.paymentInfo.first_name_billing} onChange={(e) => this.props.setParentState('input', e, 'first_name_billing')} />
            <span className='pad10' />
            <TextInput name='customer_credit_card_last_name' id='customer_credit_card_last_name' value={this.props.paymentInfo.last_name_billing} onChange={(e) => this.props.setParentState('input', e, 'last_name_billing')} />
          </div>}
        />
        <ModalTemplateField
          label='Card Number'
          input={<CreditCardInput name='customer_credit_card_number' id='customer_credit_card_number' type2 value={this.props.paymentInfo.card_number} onChange={(e) => this.props.setParentState('input', e, 'card_number')} />}
        />
        <ModalTemplateField
          label='Expiration'
          input={<div className='dualInput'>
            <NumberSelect name='customer_credit_expiration_month' id='customer_credit_expiration_month' min={1} max={31} value={this.props.paymentInfo.exp_month} placeholder='month' onChange={(e) => this.props.setParentState('select', e, 'exp_month')} />
            <span className='pad10' />
            <YearSelect name='customer_credit_expiration_year' id='customer_credit_expiration_year' value={this.props.paymentInfo.exp_year} placeholder='year' onChange={(e) => this.props.setParentState('select', e, 'exp_year')} />
          </div>}
        />
        <ModalTemplateField
          label='CCV'
          input={<CCVInput name='customer_CCV' id='customer_CCV' value={this.props.paymentInfo.cvv} onChange={(e) => this.props.setParentState('input', e, 'cvv')} />}
        />
        <ModalTemplateField
          label='Billing Address'
          input={<TextInput name='customer_bill_addr' id='customer_bill_addr' value={this.props.paymentInfo.address_billing} onChange={(e) => this.props.setParentState('input', e, 'address_billing')} />}
        />
        <ModalTemplateField
          label='Billing Address 2'
          input={<TextInput name='customer_bill_addr_2' id='customer_bill_addr_2' value={this.props.paymentInfo.address2_billing} onChange={(e) => this.props.setParentState('input', e, 'address2_billing')} />}
        />
        <ModalTemplateField
          label='Billing City'
          input={<TextInput name='customer_billing_city' id='customer_billing_city' value={this.props.paymentInfo.city_billing} onChange={(e) => this.props.setParentState('input', e, 'city_billing')} />}
        />
        <ModalTemplateField
          label='State and Zip'
          input={<div className='dualInput'>
            <StateSelect name='customer_card_state' cid='customer_card_state' clearable={false} value={this.props.paymentInfo.state_billing} placeholder='State' onChange={(e) => this.props.setParentState('select', e, 'state_billing')} />
            <span className='pad10' />
            <ZipInput name='customer_card_zip' id='customer_card_zip' value={this.props.paymentInfo.zip_billing} onChange={(e) => this.props.setParentState('input', e, 'zip_billing')} /></div>}
        />
      </div>
      }
      {this.props.children}
    </div>
  }
}
