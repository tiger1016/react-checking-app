// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select'

// Styles
import '../styles/style.less'

const form = reduxForm({
  form: 'settingsCustomerBilling',
  initialValues: {
    selectedDates: '1',
    billingTiming: 'prepays',
    billingFrequency: 'weekly'
  }
})

const monthly = [
  { value: '1', label: '1st' },
  { value: '2', label: '2nd' },
  { value: '3', label: '3rd' },
  { value: '4', label: '4th' },
  { value: '5', label: '5th' },
  { value: '6', label: '6th' },
  { value: '7', label: '7th' },
  { value: '8', label: '8th' },
  { value: '9', label: '9th' },
  { value: '10', label: '10th' },
  { value: '11', label: '11th' },
  { value: '12', label: '12th' },
  { value: '13', label: '13th' },
  { value: '14', label: '14th' },
  { value: '15', label: '15th' },
  { value: '16', label: '16th' },
  { value: '17', label: '17th' },
  { value: '18', label: '18th' },
  { value: '19', label: '19th' },
  { value: '20', label: '20th' },
  { value: '21', label: '21st' },
  { value: '22', label: '22nd' },
  { value: '23', label: '23rd' },
  { value: '24', label: '24th' },
  { value: '25', label: '25th' },
  { value: '26', label: '26th' },
  { value: '27', label: '27th' },
  { value: '28', label: '28th' },
  { value: '29', label: '29th' },
  { value: '30', label: '30th' },
  { value: '31', label: '31st' }
]

class CustomerBilling extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null,
      hover: false,
      customSelections: [0]
    }
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
    this._addCustomDate = this._addCustomDate.bind(this)
    this._removeCustomDate = this._removeCustomDate.bind(this)
    this._dropdownSelect = this._dropdownSelect.bind(this)
    this._handleSelectedDates = this._handleSelectedDates.bind(this)
  }

  _handleSelectedDates (value, action) {
    action(value.value)
  }

  _handleFormSubmit (formProps) {
    const { billingFrequency, billingTiming } = formProps
    let billingDate = ''
    if (billingFrequency === 'monthly') { billingDate = formProps.selectedDates }
    const paymentForm = {
      default_billing_timing: billingTiming,
      default_billing_frequency: billingFrequency,
      default_billing_date: billingDate
    }
    console.log('paymentForm', paymentForm)
    // this.props.submitFormAction(formProps);
  }

  _addCustomDate () {
    const customSelections = this.state.customSelections.slice()
    const add = customSelections.length
    customSelections.push(add)
    this.setState({
      customSelections: customSelections
    })
  }

  _removeCustomDate (i) {
    const customSelections = this.state.customSelections.slice()
    customSelections.splice(i, 1)
    this.setState({
      customSelections: customSelections
    })
  }

  _dropdownSelect (onChange) {
    console.log('hello')
  }

  render () {
    const { handleSubmit, billingForm } = this.props
    let options = []
    const selected = this.state.selected
    if (selected === 'monthly') {
      options = monthly
    }
    console.log('this props', this.props)

    let selectedDates = ''
    let billingTiming = ''
    let billingFrequency = ''

    billingForm && (selectedDates = billingForm.values.selectedDates)
    billingForm && (billingTiming = billingForm.values.billingTiming)
    billingForm && (billingFrequency = billingForm.values.billingFrequency)

    console.log('customer billing', billingTiming, billingFrequency)
    return (
      <div className='sub-nav-inner-container'>
        Customer Billing
        <div className='settings-form'>
          <form onSubmit={handleSubmit(this._handleFormSubmit)}>
            <div className='form-container'>
              <div className='input-container'>
                <div className='input-description'>
                  <span>Billing Timing</span>
                </div>
                <div className='input-selection'>
                  <label>
                    <Field name='billingTiming' component='input' type='radio' value='arrears' />
                    {' '}
                    <span>Bill after service</span>
                  </label>
                  <label>
                    <Field name='billingTiming' component='input' type='radio' value='prepays' checked={billingTiming === 'prepays' && true} />
                    {' '}
                    <span>Customer pre-pays</span>
                  </label>
                </div>
              </div>
              <div className='input-container' style={{ paddingTop: '2%' }}>
                <div className='input-description'>
                  <span>Billing Frequency</span>
                </div>
                <div className='input-selection' style={{ position: 'relative' }}>
                  <label onClick={() => this.setState({ selected: 'weekly' })}>
                    <Field name='billingFrequency' component='input' type='radio' value='weekly' checked={billingFrequency === 'weekly' && true} />
                    {' '}
                    <span>Weekly</span>
                  </label>
                  <label onClick={() => this.setState({ selected: 'bi-weekly' })}>
                    <Field name='billingFrequency' component='input' type='radio' value='bi-weekly' />
                    {' '}
                    <span>Bi-weekly</span>
                  </label>
                  <label onClick={() => this.setState({ selected: 'monthly' })}>
                    <Field name='billingFrequency' component='input' type='radio' value='monthly' />
                    {' '}
                    <span>Monthly</span>
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label onClick={() => this.setState({ selected: false })}>
                      <Field name='billingFrequency' component='input' type='radio' value='manual' />
                      {' '}
                      <span>Manual</span>
                    </label>
                    <span
                      style={{ height: 30, width: 30, paddingLeft: '10%' }}
                      onMouseEnter={() => this.setState({ hover: true })}
                      onMouseLeave={() => this.setState({ hover: false })}>
                      ?
                    </span>
                  </div>
                  {this.state.hover
                    ? <div style={{ position: 'absolute', bottom: 30, left: 90, width: 140, height: 70, fontSize: 10, border: '1px solid black', lineHeight: '13px' }}>
                      This option switches off automatic billing.  You will still be able to manually create invoices on the customer's page

                    </div>
                    : null}
                </div>
              </div>
              {selected === 'monthly'
                ? <div className='input-container' style={{ paddingTop: '2%' }}>
                  <div className='input-description'>
                    <span>Billing Date</span>
                  </div>
                  <div className='input-selection'>
                    <Field
                      name='selectedDates'
                      component={(props) => {
                        console.log('selected dates props', props)
                        return (
                          <div>
                            <Select
                              name='form-field-name'
                              value={selectedDates}
                              className='dropdown-width'
                              options={options}
                              onChange={(e) => this._handleSelectedDates(e, props.input.onChange)}
                              placeholder={options[0].label}
                              clearable={false}
                            />
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                /* (selected === "custom") ?
                   <div className="input-container" style={{paddingTop: "2%"}}>
                    <div className="input-description">
                      <span>Pick billing date/s</span>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                      {this.state.customSelections.map((c, i) => (
                        <li key={index}>
                          <button
                            type="button"
                            title="Remove Hobby"
                            onClick={() => fields.remove(index)}
                          />
                          <Field
                            name={selected}
                            label={`Custom dates #${i + 1}`}
                            component={(props) => {
                              return (
                                 <div>
                                  <Select
                                    name="form-field-name"
                                    value="one"
                                    className="dropdown-width"
                                    options={options}
                                    onChange={props.input.onChange}
                                    placeholder={options[0].label}
                                  />
                                </div>
                              )
                            }}
                          />
                          <div onClick={() => this._removeCustomDate(i)} style={{cursor: "pointer", paddingLeft: "5%"}}>trash</div>
                        </li>
                      ))}
                      {this.state.customSelections.map((c, i) => {
                        return(
                          <div className="input-selection" style={{display: "flex", flexDirection: "row", paddingBottom: "6%"}}>
                            <Field
                              name={selected}
                              component={(props) => {
                                return (
                                   <div>
                                    <Select
                                      name="form-field-name"
                                      value="one"
                                      className="dropdown-width"
                                      options={options}
                                      onChange={props.input.onChange}
                                      placeholder={options[0].label}
                                    />
                                  </div>
                                )
                              }}
                            />
                            {i !== 0 ?
                              <div onClick={() => this._removeCustomDate(i)} style={{cursor: "pointer", paddingLeft: "5%"}}>trash</div>
                            : null}
                          </div>
                        )
                      })}
                      <div>
                        <span style={{cursor: "pointer"}} onClick={this._addCustomDate}>+ add another custom date</span>
                      </div>
                    </div>
                  </div> */
                : null}
              <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '7%', paddingTop: '3%' }}>
                <button className='save-button' onClick={this._handleFormSubmit} style={{ width: 100 }}>SAVE</button>
                <div onClick={() => console.log('cancel')} style={{ marginLeft: '6.5%', cursor: 'pointer' }}>cancel</div>
              </div>
            </div>
          </form>

        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    console.log('state', state)
    return {
      billingForm: state.form.settingsCustomerBilling
    }
  }
)(form(CustomerBilling)))
