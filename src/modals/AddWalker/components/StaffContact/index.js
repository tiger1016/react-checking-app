// Libraries
import React from 'react'

// Components
import EmailInput from 'GlobalComponents/input/EmailInput'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import PhoneInput from 'GlobalComponents/input/PhoneInput'
import StateSelect from 'GlobalComponents/input/StateSelect'
import TextInput from 'GlobalComponents/input/TextInput'
import ZipInput from 'GlobalComponents/input/ZipInput'

export default class StaffContact extends React.Component {
  render () {
    let {
      handleInputChange,
      isFieldValid,
      Profile
    } = this.props
    return <div className='ProfileModal-Add-contact-container'>
      <div className='ProfileModal-ContentContainer'>
        <ModalTemplateField
          label='Name*'
          input={<div className='dualInput'>
            <TextInput name={'first_name'} error={isFieldValid('contact', 'first_name')} onChange={(e) => handleInputChange(e, 'input', 'first_name')} value={Profile.first_name} />
            <span className='pad10' />
            <TextInput name={'last_name'} error={isFieldValid('contact', 'last_name')} onChange={(e) => handleInputChange(e, 'input', 'last_name')} value={Profile.last_name} /></div>} />
        <ModalTemplateField
          label='Email*'
          input={<EmailInput name={'email'} error={isFieldValid('contact', 'email')} onChange={(e) => handleInputChange(e, 'input', 'email')} value={Profile.email} />} />
        <ModalTemplateField
          label='Mobile Phone*'
          input={<PhoneInput name={'phone_mobile'} error={isFieldValid('contact', 'phone_mobile')} onChange={(e) => handleInputChange(e, 'input', 'phone_mobile')} value={Profile.phone_mobile} />} />
        <ModalTemplateField
          label='Work Phone'
          input={<PhoneInput name={'phone_work'} onChange={(e) => handleInputChange(e, 'input', 'phone_work')} value={Profile.phone_work} />} />
        <ModalTemplateField
          label='Home Phone'
          input={<PhoneInput name={'phone_home'} onChange={(e) => handleInputChange(e, 'input', 'phone_home')} value={Profile.phone_home} />} />
        <ModalTemplateField
          label='Address*'
          input={<TextInput name={'address'} error={isFieldValid('contact', 'address')} onChange={(e) => handleInputChange(e, 'input', 'address')} value={Profile.address} />} />
        <ModalTemplateField
          label='Address2'
          input={<TextInput name={'address2'} onChange={(e) => handleInputChange(e, 'input', 'address2')} value={Profile.address2} />} />
        <ModalTemplateField
          label='City*'
          input={<TextInput name={'city'} error={isFieldValid('contact', 'city')} onChange={(e) => handleInputChange(e, 'input', 'city')} value={Profile.city} />} />
        <ModalTemplateField
          label='State and Zip*'
          input={<div className='dualInput'>
            <StateSelect error={isFieldValid('contact', 'state')} name='staff_state' id='staff_state' clearable={false} value={Profile.state} onChange={(e) => handleInputChange(e, 'select', 'state')} />
            <span className='pad10' />
            <ZipInput error={isFieldValid('contact', 'zip')} name='staff_zip' id='staff_zip' value={Profile.zip} onChange={(e) => handleInputChange(e, 'input', 'zip')} />
          </div>} />
      </div>
    </div>
  }
}
