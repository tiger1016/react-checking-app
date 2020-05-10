// Libraries
import React, { Component } from 'react'

// Components
import EmailInput from 'GlobalComponents/input/EmailInput'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import PhoneInput from 'GlobalComponents/input/PhoneInput'
import StateSelect from 'GlobalComponents/input/StateSelect'
import TextInput from 'GlobalComponents/input/TextInput'
import ZipInput from 'GlobalComponents/input/ZipInput'

export default class AddContactInfo extends Component {
  render () {
    return <div className='sub-align'>
      <div className='container'>
        <div className='add-customer-title'>Primary Contact</div>
        <ModalTemplateField
          label='Name*'
          input={<div className='dualInput'>
            <TextInput placeholder='First...' name='customer_first_name_contact' id='customer_first_name_contact' error={this.props.isFieldValid('contactInfo', 'first_name')} value={this.props.contactInfo.first_name} onChange={(e) => this.props.setParentState('input', e, 'first_name')} />
            <span className='pad10' />
            <TextInput placeholder='Last...' name='customer_last_name_contact' id='customer_last_name_contact' error={this.props.isFieldValid('contactInfo', 'last_name')} value={this.props.contactInfo.last_name} onChange={(e) => this.props.setParentState('input', e, 'last_name')} /></div>}
        />
        <ModalTemplateField
          label='Email*'
          input={<EmailInput placeholder='email@email.com...' name='customer_email_contact' id='customer_email_contact' error={this.props.isFieldValid('contactInfo', 'email')} value={this.props.contactInfo.email} onChange={(e) => this.props.setParentState('input', e, 'email')} />}
        />

        <ModalTemplateField
          label='Mobile Phone*'
          input={<PhoneInput placeholder='1234567890...' name='customer_mobile_phone_contact' id='customer_mobile_phone_contact' error={this.props.isFieldValid('contactInfo', 'phone_mobile')} value={this.props.contactInfo.phone_mobile} onChange={(e) => this.props.setParentState('input', e, 'phone_mobile')} />}
        />
        <ModalTemplateField
          label='Work Phone'
          input={<PhoneInput name='customer_work_phone_contact' id='customer_work_phone_contact' value={this.props.contactInfo.phone_work} onChange={(e) => this.props.setParentState('input', e, 'phone_work')} />}
        />

        <ModalTemplateField
          label='Home Phone'
          input={<PhoneInput name='customer_home_phone_contact' id='customer_home_phone_contact' value={this.props.contactInfo.phone_home} onChange={(e) => this.props.setParentState('input', e, 'phone_home')} />}
        />
        <ModalTemplateField
          label='Street Address*'
          input={<TextInput placeholder='123 main st...' name='customer_steet_addresss_contact' id='customer_steet_addresss_contact' error={this.props.isFieldValid('contactInfo', 'address')} value={this.props.contactInfo.address} onChange={(e) => this.props.setParentState('input', e, 'address')} />}
        />
        <ModalTemplateField
          label='Street Address2'
          input={<TextInput name='customer_steet_address_2_contact' id='customer_steet_address_2_contact' value={this.props.contactInfo.address2} onChange={(e) => this.props.setParentState('input', e, 'address2')} />}
        />
        <ModalTemplateField
          label='City*'
          input={<TextInput name='customer_city_contact' id='customer_city_contact' error={this.props.isFieldValid('contactInfo', 'city')} value={this.props.contactInfo.city} onChange={(e) => this.props.setParentState('input', e, 'city')} />}
        />
        <ModalTemplateField
          label='State and Zip*'
          input={<div className='dualInput'>
            <StateSelect name='customer_state_contact' id='customer_state_contact' error={this.props.isFieldValid('contactInfo', 'state')} clearable={false} value={this.props.contactInfo.state} placeholder='State' onChange={(e) => this.props.setParentState('select', e, 'state')} />
            <span className='pad10' />
            <ZipInput name='customer_zip_contact' id='customer_zip_contact' error={this.props.isFieldValid('contactInfo', 'zip')} value={this.props.contactInfo.zip} style={{ width: '23%' }} onChange={(e) => this.props.setParentState('input', e, 'zip')} />
          </div>} />
      </div>
      <div className='container two'>
        <div className='add-customer-title'>Secondary Contact</div>
        <ModalTemplateField
          label='Name'
          input={<div className='dualInput'>
            <TextInput placeholder='First...' name='customer_secondary_first_name' id='customer_secondary_first_name' value={this.props.contactInfo.first_name_secondary} onChange={(e) => this.props.setParentState('input', e, 'first_name_secondary')} />
            <span className='pad10' />
            <TextInput placeholder='Last...' name='customer_secondary_last_name' id='customer_secondary_last_name' style={{ width: '23%' }} value={this.props.contactInfo.last_name_secondary} onChange={(e) => this.props.setParentState('input', e, 'last_name_secondary')} />
          </div>} />
        <ModalTemplateField
          label='Email'
          input={<EmailInput placeholder='email@email.com...' name='customer_secondary_email' id='customer_secondary_email' value={this.props.contactInfo.email_secondary} onChange={(e) => this.props.setParentState('input', e, 'email_secondary')} />}
        />
        <ModalTemplateField
          label='Mobile Phone'
          input={<PhoneInput placeholder='1234567890...' name='customer_secondary_mobile_phone' id='customer_secondary_mobile_phone' value={this.props.contactInfo.phone_mobile_secondary} onChange={(e) => this.props.setParentState('input', e, 'phone_mobile_secondary')} />}
        />
        <ModalTemplateField
          label='Work Phone'
          input={<PhoneInput name='customer_secondary_work_name' id='customer_secondary_work_name' value={this.props.contactInfo.phone_work_secondary} onChange={(e) => this.props.setParentState('input', e, 'phone_work_secondary')} />}
        />
        <ModalTemplateField
          label='Home Phone'
          input={<PhoneInput name='customer_secondary_home_phone' id='customer_secondary_home_phone' value={this.props.contactInfo.phone_home_secondary} onChange={(e) => this.props.setParentState('input', e, 'phone_home_secondary')} />}
        />
      </div>
      <div className='container two'>
        <div className='add-customer-title'>Emergency Contact</div>
        <ModalTemplateField
          label='Name'
          input={<div className='dualInput'>
            <TextInput placeholder='First...' name='customer_secondary_first_name' id='customer_secondary_first_name' value={this.props.contactInfo.first_name_emergency} onChange={(e) => this.props.setParentState('input', e, 'first_name_emergency')} />
            <span className='pad10' />
            <TextInput placeholder='Last...' name='customer_secondary_last_name' id='customer_secondary_last_name' value={this.props.contactInfo.last_name_emergency} onChange={(e) => this.props.setParentState('input', e, 'last_name_emergency')} />
          </div>} />
        <ModalTemplateField
          label='Mobile Phone'
          input={<PhoneInput placeholder='1234567890...' name='customer_emergency_mobile_phone' id='customer_emergency_mobile_phone' value={this.props.contactInfo.phone_emergency} onChange={(e) => this.props.setParentState('input', e, 'phone_emergency')} />}
        />
        <ModalTemplateField
          label='Email'
          input={<EmailInput placeholder='email@email.com...' name='customer_emergency_email' id='customer_emergency_email' value={this.props.contactInfo.email_emergency} onChange={(e) => this.props.setParentState('input', e, 'email_emergency')} />}
        />
      </div>
    </div>
  }
}
