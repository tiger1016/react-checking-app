// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController, profileController } from 'Controllers'

// Constants
import { CUSTOMER_BILLING } from 'Constants/settings/FormNames'

// Components
import CustomForm from 'Web/globalContainers/input/CustomForm'
import InputGroup from 'GlobalComponents/input/InputGroup'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionHeader from 'GlobalComponents/SectionHeader'

class CustomerBilling extends Component {
  componentWillMount () {
    profileController.actions.fetchBillingInformation()
  }

  /**
   * Cancel button action
   * @return {Void}
   */
  cancel = () => {
    let { reset } = this.props
    if (this.isStateChanged()) {
      appController.confirmDiscardChanges(() => { reset() })
    } else {
      reset()
    }
  }

  /**
   * Disables Save Button
   * @return {Bool} True for disabled, false for enabled
   */
  disabled () {
    let {
      formData
    } = this.props
    return !formData || !formData.values || !formData.values.default_billing_timing || !formData.values.default_billing_frequency || !this.isStateChanged()
  }

  /**
   * Left hand label width
   * @type {String}
   */
  inputGroupLabelWidth = '15%'

  /**
   * Submits values for save
   * @param  {Object} values Data to be saved
   * @return {Void}
   */
  submit (values) {
    profileController.actions.updateBillingInformation({
      billingDate: values.default_billing_date,
      billingFrequency: values.default_billing_frequency,
      billingTiming: values.default_billing_timing
    })
  }

  isStateChanged = () => {
    const {
      formData,
      initialValues
    } = this.props
    return !_.isEqual(formData.values, initialValues)
  }

  render () {
    const {
      formData,
      handleSubmit,
      settingsIsLoading
    } = this.props

    return <div id='CustomerBilling' className='settings-section'>
      <SectionHeader title='Default Customer Billing' noPadding />
      <div className='section-content'>
        <CustomForm>
          <InputGroup
            fields={[
              {
                name: 'default_billing_timing',
                type: 'radio',
                label: 'Bill after service',
                value: 'arrears'
              },
              {
                name: 'default_billing_timing',
                type: 'radio',
                label: 'Customer pre-pays',
                value: 'prepay'
              }
            ]}
            label='Billing Timing'
            loading={settingsIsLoading && (formData.values ? !formData.values.default_billing_timing : true)}
            mainLabelWidth={this.inputGroupLabelWidth}
            reduxForm
          />
          <InputGroup
            fields={[
              {
                name: 'default_billing_frequency',
                type: 'radio',
                label: 'Weekly',
                value: 'weekly',
                help: {
                  text: 'weekly invoices include Monday through Sunday activity and run on Monday morning.', place: 'right'
                }
              },
              {
                name: 'default_billing_frequency',
                type: 'radio',
                label: 'Bi-weekly',
                value: 'biweekly',
                help: {
                  text: 'bi-weekly invoices include Monday through Sunday activity and run every other Monday morning.', place: 'right'
                }
              },
              {
                name: 'default_billing_frequency',
                type: 'radio',
                label: 'Monthly',
                value: 'monthly',
                help: {
                  text: 'Invoices run the day after the selected date to account for all activity.', place: 'right'
                }
              },
              {
                name: 'default_billing_frequency',
                type: 'radio',
                label: 'Manual',
                value: 'manual',
                help: {
                  text: 'This option switches off automatic billing. You will still be able to manually create invoices on the customer\'s page.', place: 'right'
                }
              }
            ]}
            label='Billing Frequency'
            loading={settingsIsLoading && (formData.values ? !formData.values.default_billing_frequency : true)}
            mainLabelWidth={this.inputGroupLabelWidth}
            reduxForm
          />
          {
            formData && formData.values &&
              formData.values.default_billing_frequency === 'monthly'
              ? <InputGroup
                fields={[{
                  label: '-select day-',
                  name: 'default_billing_date',
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
                label='Choose date'
                loading={settingsIsLoading && (formData.value ? !formData.value.default_billing_date : true)}
                mainLabelWidth={this.inputGroupLabelWidth}
                reduxForm /> : null}

          {
            /* {
                        formData && formData.values &&
                        (formData.values.default_billing_frequency === 'biweekly' || formData.values.default_billing_frequency === 'weekly')
                          ? <InputGroup
                            fields={[{label: '-select day-',
                              name: 'default_billing_date',
                              type: 'billing-weekday-select'
                            }]}
                            label='Choose day of the week'
                            loading={settingsIsLoading && (formData.value ? !formData.value.default_billing_date : true)}
                            mainLabelWidth={this.inputGroupLabelWidth}
                            reduxForm /> : null} */
          }

          <SaveCancel
            loading={this.props.settingsIsLoading}
            cancelOnClick={this.cancel}
            cancelDisabled={!this.isStateChanged()}
            disabled={this.disabled()}
            saveOnClick={handleSubmit(values => this.submit(values))}
            type='submit'
          />
        </CustomForm>
      </div>
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const CustomerBillingForm = reduxForm({
  enableReinitialize: true,
  form: CUSTOMER_BILLING
})(CustomerBilling)

const mapStateToProps = state => {
  return {
    formData: state.form[CUSTOMER_BILLING] || {},
    initialValues: state.profile.profile,
    settingsIsLoading: state.profile.loading
  }
}

const CustomerBillingFormConnected = connect(mapStateToProps)(CustomerBillingForm)

export default withRouter(CustomerBillingFormConnected)
