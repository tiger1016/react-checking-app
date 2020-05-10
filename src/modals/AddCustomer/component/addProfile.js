// Libraries
import React, { Component } from 'react'

// Components
import DatePickerInput from 'GlobalComponents/input/DatePicker'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import QrcodesSelect from 'GlobalComponents/input/QrcodesSelect'
import ServicesSelect from 'GlobalComponents/input/ServicesSelect'
import TextBox from 'GlobalComponents/input/TextBox'
import TextInput from 'GlobalComponents/input/TextInput'
import WalkersSelect from 'GlobalComponents/input/WalkersSelect'

export default class AddProfile extends Component {
  render () {
    return <div className='sub-align' >
      <div className='container'>
        <div className='add-customer-title'>Password</div>
        <input type='text' style={{ display: 'block', border: 'none', height: 0, overflow: 'hidden', opacity: 0, width: 0 }} />
        <ModalTemplateField
          label='New Password*'
          input={<TextInput
            name='customer_password'
            id='customer_password'
            password
            error={this.props.isFieldValid('profileInfo', 'password')}
            type='password'
            value={this.props.profileInfo.password}
            onChange={(e) => this.props.setParentState('input', e, 'password')} />} />
        <ModalTemplateField
          label='Confirm Password*'
          input={<TextInput
            name='customer_confirm_password'
            id='customer_confirm_password'
            password
            error={this.props.isFieldValid('profileInfo', 'password2')}
            type='password'
            value={this.props.profileInfo.password2}
            onChange={(e) => this.props.setParentState('input', e, 'password2')} />} />
      </div>
      <div className='container two' >
        <div className='add-customer-title'>Profile Information</div>
        <ModalTemplateField
          label='Signup Date'
          input={<DatePickerInput name='customer_profile_data' id='customer_profile_data' width='200px' value={this.props.profileInfo.signUpDate} onChange={(e) => this.props.setParentState('date', e, 'signUpDate')} />} />

        <ModalTemplateField
          label='QR CODE'
          input={<QrcodesSelect name='customer_profile_qr' id='customer_profile_qr' value={this.props.profileInfo.qr_code} onChange={(e) => this.props.setParentState('select', e, 'qr_code')} />} />
        <ModalTemplateField
          label='QR Code Location'
          input={<TextInput name='qr_code_location' id='qr_code_location' type='text' value={this.props.profileInfo.qr_code_location} onChange={(e) => this.props.setParentState('input', e, 'qr_code_location')} />} />
        <ModalTemplateField
          label='Default Service Type'
          input={<ServicesSelect name='default_service_type' id='default_service_type' value={this.props.profileInfo.defaultService} onChange={(e) => this.props.setParentState('select', e, 'defaultService')} />} />
        <ModalTemplateField
          label='Default Staff'
          input={<WalkersSelect onlyActive name='default_walker' id='default_walker' value={this.props.profileInfo.walker} onChange={(e) => this.props.setParentState('select', e, 'walker')} />} />
        <ModalTemplateField
          label='House Alarm Code'
          input={<TextInput name='customer_profile_alarm_code' id='customer_profile_alarm_code' type='text' value={this.props.profileInfo.house_alarm_code} onChange={(e) => this.props.setParentState('input', e, 'house_alarm_code')} />} />
        <ModalTemplateField
          label='Referred By'
          input={<TextInput name='customer_profile_referred_by' id='customer_profile_referred_by' type='text' value={this.props.profileInfo.referred_from} onChange={(e) => this.props.setParentState('input', e, 'referred_from')} />} />
        <ModalTemplateField
          label='Customer Notes'
          input={<TextBox name='customer_profile_notes' id='customer_profile_notes' value={this.props.profileInfo.notes} onChange={(e) => this.props.setParentState('input', e, 'notes')} />} />
        <ModalTemplateField
          label='Key Notes'
          input={<TextBox name='customer_profile_key_notes' id='customer_profile_key_notes' value={this.props.profileInfo.key_info} onChange={(e) => this.props.setParentState('input', e, 'key_info')} />} />
      </div>
    </div>
  }
}
