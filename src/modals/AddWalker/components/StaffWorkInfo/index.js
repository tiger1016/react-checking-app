// Libraries
import React from 'react'

// Components
import DatePickerInput from 'GlobalComponents/input/DatePicker'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import PhoneInput from 'GlobalComponents/input/PhoneInput'
import TextBox from 'GlobalComponents/input/TextBox'
import TextInput from 'GlobalComponents/input/TextInput'
import WalkerAccessLevelSelect from 'GlobalComponents/input/WalkerAccessLevelSelect'

export default class StaffWorkInfo extends React.Component {
  render () {
    let {
      handleInputChange,
      isFieldValid,
      Profile
    } = this.props
    return <div className='ProfileModal-Add-contact-container'>
      <div className='ProfileModal-ContentContainer'>
        <div className='header'>Password</div>
        <ModalTemplateField
          label='New Password*'
          input={<TextInput autoComplete='new-password' name={'password'} password error={isFieldValid('profile', 'password')} onChange={(e) => handleInputChange(e, 'input', 'password')} value={Profile.password} />} />
        <ModalTemplateField
          label='Verify Password*'
          input={<TextInput autoComplete='new-password' name={'password2'} password error={isFieldValid('profile', 'password2')} onChange={(e) => handleInputChange(e, 'input', 'password2')} value={Profile.password2} />} />
        <ModalTemplateField
          label='Security Question*'
          input={<TextInput name={'security_question'} error={isFieldValid('profile', 'security_question')} onChange={(e) => handleInputChange(e, 'input', 'security_question')} value={Profile.security_question} />} />
        <ModalTemplateField
          label='Answer*'
          input={<TextInput name={'security_answer'} error={isFieldValid('profile', 'security_answer')} onChange={(e) => handleInputChange(e, 'input', 'security_answer')} value={Profile.security_answer} />} />
        <div className='divider' />
        <div className='header'>Profile Information</div>
        <ModalTemplateField
          label='Hire Date*'
          input={<DatePickerInput name={'hire_date'} className={Profile.hire_date ? '' : 'errBorder'} value={Profile.hire_date} onChange={(e) => handleInputChange(e, 'date', 'hire_date')} />} />
        <ModalTemplateField
          label='Walker Access Level*'
          input={<WalkerAccessLevelSelect error={isFieldValid('profile', 'walker_admin')} id='walker_admin' clearable={false} value={Profile.walker_admin} onChange={(e) => handleInputChange(e, 'select', 'walker_admin')} />} />
        <ModalTemplateField
          label='Transportation Type'
          input={<TextInput name={'transportation_type'} onChange={(e) => handleInputChange(e, 'input', 'transportation_type')} value={Profile.transportation_type} />} />
        <ModalTemplateField
          label='License Plate'
          input={<TextInput name={'license_plate'} onChange={(e) => handleInputChange(e, 'input', 'license_plate')} value={Profile.license_plate} />} />
        <ModalTemplateField
          label='Emergency Contact Name'
          input={<TextInput name={'name_emergency'} onChange={(e) => handleInputChange(e, 'input', 'name_emergency')} value={Profile.name_emergency} />} />
        <ModalTemplateField
          label='Emergency Contact Phone'
          input={<PhoneInput onChange={(e) => handleInputChange(e, 'input', 'phone_emergency')} value={Profile.phone_emergency} />} />
        <ModalTemplateField
          label='Notes'
          input={<TextBox onChange={(e) => handleInputChange(e, 'input', 'notes')} value={Profile.notes} />} />
        <ModalTemplateField
          label='Bio'
          input={<TextBox onChange={(e) => handleInputChange(e, 'input', 'bio')} value={Profile.bio} />} />
      </div>
    </div>
  }
}
