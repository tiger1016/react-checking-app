// Libraries
import React, { Component } from 'react'

// Components
import Checkbox from 'GlobalComponents/input/Checkbox'
import DaysOfMonthSelect from 'GlobalComponents/input/DaysOfMonthSelect'
import ModalTemplateField from 'GlobalComponents/ModalTemplate/components/ModalTemplateField'
import RadioInputGroup from 'GlobalComponents/input/RadioInputGroup'

// Styles
import './index.css'

export default class StaffPayroll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      customSelections: [0],
      byTheHour: false,
      selected: null
    }
  }

  render () {
    let {
      children,
      handleInputChange,
      handlePayRollTypeChange,
      Profile,
      payrollType
    } = this.props
    return (
      <div className='ProfileModal-Add-contact-container StaffPayroll'>
        <div className='ProfileModal-ContentContainer'>
          <ModalTemplateField
            flexStart
            label='Payroll Frequency'
            input={
              <RadioInputGroup radios={[
                {
                  checked: Profile.payroll_frequency === 'weekly',
                  label: 'Weekly',
                  name: 'payroll_frequency',
                  onChange: handleInputChange,
                  value: 'weekly'
                },
                {
                  checked: Profile.payroll_frequency === 'bi-weekly',
                  label: 'Bi-Weekly',
                  name: 'payroll_frequency',
                  onChange: handleInputChange,
                  value: 'bi-weekly'
                },
                {
                  checked: Profile.payroll_frequency === 'monthly',
                  label: 'Monthly',
                  name: 'payroll_frequency',
                  onChange: handleInputChange,
                  value: 'monthly'
                }
              ]} vertical />
            }
          />
          <ModalTemplateField
            label=''
            noMargin={Profile.payroll_frequency !== 'monthly'}
            input={Profile.payroll_frequency === 'monthly' && <span className='helper-text'>
              This option switches off automatic billing.<br />
              You will still be able to manually create invoices on the customer's page.
            </span>} />
          {Profile.payroll_frequency === 'monthly' &&
            <ModalTemplateField
              label='Choose Day of the month'
              input={<DaysOfMonthSelect value={Profile.payroll_date} onChange={(e) => handleInputChange(e, 'select', 'payroll_date')} />} />}
          <ModalTemplateField
            flexStart
            label='Payroll Type'
            input={
              <RadioInputGroup radios={[
                {
                  checked: payrollType === 'dollar',
                  label: '$ Dollar',
                  name: 'default_payroll_type',
                  onChange: handlePayRollTypeChange,
                  value: 'dollar'
                },
                {
                  checked: payrollType === 'percent',
                  label: '% Percent',
                  name: 'default_payroll_type',
                  onChange: handlePayRollTypeChange,
                  value: 'percent'
                }
              ]} vertical />
            }
          />
          <ModalTemplateField
            label='Automatic Email'
            input={
              <Checkbox
                label='Automatically generate email payment reports'
                name='payroll_email'
                onChange={(e) => handleInputChange(e, 'checkbox')}
                checked={Profile.payroll_email}
              />
            }
          />
          {children}
        </div>
      </div>
    )
  }
}
