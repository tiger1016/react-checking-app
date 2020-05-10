// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select'

// Styles
import '../styles/style.less'

const form = reduxForm({
  form: 'settingsStaffPayroll'
})

const weekly = [
  { value: 'mondays', label: 'Mondays' },
  { value: 'tuesdays', label: 'Tuesdays' },
  { value: 'wednesdays', label: 'Wednesdays' },
  { value: 'thursdays', label: 'Thursdays' },
  { value: 'fridays', label: 'Fridays' },
  { value: 'saturdays', label: 'Saturdays' },
  { value: 'sundays', label: 'Sundays' }
]

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

const custom = [
  { value: '1', label: 'Every 1st' },
  { value: '2', label: 'Every 2nd' },
  { value: '3', label: 'Every 3rd' },
  { value: '4', label: 'Every 4th' },
  { value: '5', label: 'Every 5th' },
  { value: '6', label: 'Every 6th' },
  { value: '7', label: 'Every 7th' },
  { value: '8', label: 'Every 8th' },
  { value: '9', label: 'Every 9th' },
  { value: '10', label: 'Every 10th' },
  { value: '11', label: 'Every 11th' },
  { value: '12', label: 'Every 12th' },
  { value: '13', label: 'Every 13th' },
  { value: '14', label: 'Every 14th' },
  { value: '15', label: 'Every 15th' },
  { value: '16', label: 'Every 16th' },
  { value: '17', label: 'Every 17th' },
  { value: '18', label: 'Every 18th' },
  { value: '19', label: 'Every 19th' },
  { value: '20', label: 'Every 20th' },
  { value: '21', label: 'Every 21st' },
  { value: '22', label: 'Every 22nd' },
  { value: '23', label: 'Every 23rd' },
  { value: '24', label: 'Every 24th' },
  { value: '25', label: 'Every 25th' },
  { value: '26', label: 'Every 26th' },
  { value: '27', label: 'Every 27th' },
  { value: '28', label: 'Every 28th' },
  { value: '29', label: 'Every 29th' },
  { value: '30', label: 'Every 30th' },
  { value: '31', label: 'Every 31st' }
]

class StaffPayroll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: null,
      byTheHour: false,
      customSelections: [0]
    }
    this._handleFormSubmit = this._handleFormSubmit.bind(this)
    this._addCustomDate = this._addCustomDate.bind(this)
    this._removeCustomDate = this._removeCustomDate.bind(this)
  }

  _handleFormSubmit (formProps) {
    console.log('form props', formProps, this.props)
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

  render () {
    const { handleSubmit } = this.props
    let options
    const selected = this.state.selected
    if (selected === 'weekly' || selected === 'bi-weekly') {
      options = weekly
    } else if (selected === 'monthly') {
      options = monthly
    } else if (selected === 'custom') {
      options = custom
    }

    // var selectedDates = ''
    // if (this.props.billingForm) {
    //   if (this.props.billingForm.values) {
    //     if (this.props.billingForm.values.selectedDates) {
    //       selectedDates = this.props.billingForm.values.selectedDates.value
    //     } else if (!this.props.billingForm.values.selectedDates && options.length > 0) {
    //       selectedDates = options[0].value
    //     }
    //   }
    // }

    console.log('staff payroll', this.props.staffPayrollForm, this.props)
    return (
      <div className='staff-payroll-container'>
        Staff Payroll
        <div className='settings-form'>
          <form onSubmit={handleSubmit(this._handleFormSubmit)}>
            <div className='form-container'>
              <div className='input-container'>
                <div className='input-description'>
                  <span>Payroll Options</span>
                </div>
                <div className='input-selection'>
                  <label onClick={() => this.setState({ byTheHour: false })}>
                    <Field name='payrollOptions' component='input' type='radio' value='pay by the service' />
                    {' '}
                    <span>Pay by the service</span>
                  </label>
                  <label onClick={() => this.setState({ byTheHour: true })}>
                    <Field name='payrollOptions' component='input' type='radio' value='pay by the hour' />
                    {' '}
                    <span>Pay by the hour</span>
                  </label>
                </div>
              </div>
              {this.state.byTheHour
                ? <div className='input-container'>
                  <div className='input-description' />
                  <div className='input-selection' style={{ paddingLeft: 25 }}>
                    <label>
                      <Field name='payByTheHour' component='input' type='radio' value='first scan to last scan' />
                      {' '}
                      <span>From the first scan to the last scan out</span>
                    </label>
                    <label>
                      <Field name='payByTheHour' component='input' type='radio' value='appointment scans only' />
                      {' '}
                      <span>Appointment scans only</span>
                    </label>
                  </div>
                </div>
                : null}
              <div className='input-container' style={{ paddingTop: '2%' }}>
                <div className='input-description'>
                  <span>Billing Frequency</span>
                </div>
                <div className='input-selection' style={{ position: 'relative' }}>
                  <label onClick={() => this.setState({ selected: 'weekly' })}>
                    <Field name='billingFrequency' component='input' type='radio' value='weekly' />
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
                      <span
                        style={{ height: 30, width: 30, paddingLeft: '10%' }}
                        onMouseEnter={() => this.setState({ hover: true })}
                        onMouseLeave={() => this.setState({ hover: false })}>
                        ?
                      </span>
                    </label>
                  </div>
                  {this.state.hover
                    ? <div style={{ position: 'absolute', bottom: 30, left: 90, width: 140, height: 70, fontSize: 10, border: '1px solid black', lineHeight: '13px' }}>
                      This option switches off automatic billing.  You will still be able to manually create invoices on the customer's page

                    </div>
                    : null}
                </div>
              </div>
              {(selected === 'bi-weekly' || selected === 'weekly' || selected === 'monthly')
                ? <div className='input-container' style={{ paddingTop: '2%' }}>
                  <div className='input-description'>
                    <span>{(selected === 'weekly' || selected === 'bi-weekly') ? 'Choose Day of the week' : 'Billing Date'}</span>
                  </div>
                  <div className='input-selection'>
                    <Field
                      name={selected}
                      component={(props) => {
                        return (
                          <div>
                            <Select
                              name='form-field-name'
                              value='one'
                              className='dropdown-width'
                              options={options}
                              onChange={props.input.onChange}
                              placeholder={options[0].label}
                            />
                          </div>
                        )
                      }}
                    />
                  </div>
                </div>
                : null

              /* (selected === "custom") ?
                 <div className="input-container" style={{paddingTop: "2%"}}>
                  <div className="input-description">
                    <span>Pick billing date/s</span>
                  </div>
                  <div style={{display: "flex", flexDirection: "column"}}>
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
                </div>
              : null */}
              <div className='input-container'>
                <div className='input-description'>
                  Automatic Email
                </div>
                <div className='input-selection' >
                  <label>
                    <Field name='automaticEmail' component='input' type='checkbox' value='yes' />
                    {' '}
                    <span>Automatically generate email payment reports</span>
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '7%', paddingTop: '3%' }}>
                <button action='submit' style={{ width: 100 }}>Save changes</button>
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
    return {
      staffPayrollForm: state.form.settingsStaffPayroll
    }
  }
)(form(StaffPayroll)))
