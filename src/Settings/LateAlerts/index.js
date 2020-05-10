// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

// Components
import CustomForm from 'Web/globalContainers/input/CustomForm'
import InputGroup from 'GlobalComponents/input/InputGroup'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Styles
import './index.css'

const form = reduxForm({
  form: 'Settings/StaffPayroll'
})

class LateAlerts extends Component {
  render () {
    return <div id='LateAlerts' className='settings-section'>
      <SectionHeader title='Late Alerts' noPadding />
      <div className='section-content'>
        <CustomForm>
          <InputGroup reduxForm label='Late Alerts are currently' fields={[
            { name: 'late-alert-status', type: 'on-off' }
          ]} />
          <InputGroup reduxForm fields={[
            { hourName: 'reminder-every-hour', minuteName: 'reminder-every-minute', type: 'hour-minute', preLabel: 'Every', postLabel: 'after Appointment Time has been reached.', preLabelWidth: '40px' },
            { hourName: 'reminder-for-hour', minuteName: 'reminder-for-minute', type: 'hour-minute', preLabel: 'For', postLabel: 'after Scheduled Appointment Time.', preLabelWidth: '40px' }
          ]} />
        </CustomForm>
      </div>
      <SaveCancel saveOnClick={() => console.log('save')} cancelOnClick={() => console.log('cancel')} />
    </div>
  }
}

export default connect(
  state => {
    return {
    }
  }
)(form(LateAlerts))
