// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController, profileController } from 'Controllers'

// Constants
import { STAFF_PAYROLL } from 'Constants/settings/FormNames'

// Components
import CustomForm from 'Web/globalContainers/input/CustomForm'
import InputGroup from 'GlobalComponents/input/InputGroup'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionHeader from 'GlobalComponents/SectionHeader'

class StaffPayroll extends React.Component {
  componentWillMount () {
    profileController.actions.fetchStaffPayroll()
  }

  isStateChanged = () => {
    const {
      formData,
      initialValues
    } = this.props
    return !_.isEqual(formData.values, initialValues)
  }
  /**
   * Cancel button action
   * @return {Void}
   */
  cancel = () => {
    const { reset, history } = this.props
    appController.confirmDiscardChanges(() => { reset(); history.push('/dashboard') })
  }

  /**
   * Left hand label width
   * @type {String}
   */
  inputGroupLabelWidth = '15%'

  /**
   * Disables Save Button
   * @return {Bool} True for disabled, false for enabled
   */
  disabled () {
    let {
      formData
    } = this.props

    return !formData || !formData.values || !formData.values.payroll_frequency || (formData.values.payroll_frequency === 'montly' && !formData.values.payroll_date)
  }

  /**
   * Submits values for save
   * @param  {Object} values Data to be saved
   * @return {Void}
   */
  submit (values) {
    profileController.actions.updateStaffPayroll({
      automaticPayrollEmail: values.automatic_payroll_email,
      payrollDate: values.payroll_date,
      payrollFrequency: values.payroll_frequency,
      payrollOption: values.payroll_option
    })
  }

  render () {
    const {
      formData,
      handleSubmit,
      settingsIsLoading
    } = this.props

    // To be implemented in the future (api not ready yet), so leave it here commented for now as the frontend works
    let payrollOptions = [
      {
        label: 'Pay by the service',
        name: 'payroll_option',
        type: 'radio',
        value: 'pay-by-the-service'
      },
      {
        label: 'Pay by the hour',
        name: 'payroll_option',
        parentOf: 'payByTheHour',
        type: 'radio',
        value: 'pay-by-the-hour'
      }
    ]
    if (formData && formData.values && formData.values.payroll_option === 'pay-by-the-hour') {
      payrollOptions = [
        ...payrollOptions,
        {
          child: true,
          label: 'From the first scan to the last scan out',
          name: 'pay_by_the_hour',
          type: 'radio',
          value: 'first-scan-to-last-scan'
        },
        {
          child: true,
          label: 'Appointment scans only',
          name: 'pay_by_the_hour',
          type: 'radio',
          value: 'appointment-scans-only'
        }
      ]
    }
    return <div id='StaffPayroll' className='settings-section'>
      <SectionHeader title='Default Staff Payroll' help='Can be changed for each staff member.' noPadding />
      <div className='section-content'>
        <CustomForm>
          { /* To be implemented in the future (api not ready yet), so leave it here commented for now as the frontend works */}
          <InputGroup
            fields={payrollOptions}
            label='Payroll Options'
            loading={settingsIsLoading && (formData.values ? !formData.values.payroll_option : true)}
            mainLabelWidth={this.inputGroupLabelWidth}
            reduxForm
          />
          <InputGroup
            fields={[
              {
                label: 'Weekly',
                name: 'payroll_frequency',
                type: 'radio',
                value: 'weekly'
              },
              {
                label: 'Bi-weekly',
                name: 'payroll_frequency',
                type: 'radio',
                value: 'biweekly'
              },
              {
                label: 'Monthly',
                name: 'payroll_frequency',
                type: 'radio',
                value: 'monthly'
              }
              // {
              //   label: 'Manual',
              //   name: 'payroll_frequency',
              //   type: 'radio',
              //   value: 'manual'
              // }
            ]}
            label='Billing Frequency'
            loading={settingsIsLoading && (formData.values ? !formData.values.payroll_frequency : true)}
            mainLabelWidth={this.inputGroupLabelWidth}
            reduxForm
          />
          {
            formData &&
              formData.values &&
              formData.values.payroll_frequency === 'monthly' ? <InputGroup
                fields={[
                  {
                    label: '-select day-',
                    name: 'payroll_date',
                    type: 'days-of-month-select',
                    withS: true
                  }
                  // Backend not ready for this code below but keep here
                  /* {
                    label: '+ add another custom date',
                    name: 'add-another-custom-date',
                    type: 'link',
                    value: 'add-another-custom-date',
                    onClick: () => console.log('+ add another custom date')
                  } */
                ]}
                label='Choose day of the month'
                loading={settingsIsLoading && (formData.values ? !formData.values.payroll_date : true)}
                mainLabelWidth={this.inputGroupLabelWidth}
                reduxForm
              />
              : null}
          {/* Not implemented for now <InputGroup
            fields={[
              {
                label: 'Automatically generate and e-mail payment reports',
                name: 'automatic_payroll_email',
                type: 'checkbox'
              }
            ]}
            label='Automatic E-mail'
            loading={settingsIsLoading && (formData.values ? !formData.values.automatic_payroll_email : true)}
            mainLabelWidth={this.inputGroupLabelWidth}
            reduxForm
          /> */}
          <SaveCancel
            loading={this.props.settingsIsLoading}
            cancelOnClick={this.cancel}
            disabled={this.disabled()}
            saveOnClick={handleSubmit(values => this.submit(values))}
          />
        </CustomForm>
      </div>
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const StaffPayrollForm = reduxForm({
  enableReinitialize: true,
  form: STAFF_PAYROLL
})(StaffPayroll)

const mapStateToProps = state => {
  return {
    formData: state.form[STAFF_PAYROLL],
    initialValues: state.profile.profile,
    settingsIsLoading: state.profile.loading
  }
}

const StaffPayrollFormConnected = connect(mapStateToProps)(StaffPayrollForm)

export default withRouter(StaffPayrollFormConnected)
