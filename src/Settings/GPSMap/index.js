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
  form: 'Settings/GPSMap'
})

class GPSMap extends Component {
  render () {
    return <div id='GPSMap' className='settings-section'>
      <SectionHeader title='GPS Map' noPadding />
      <div className='section-content'>
        <CustomForm>
          <InputGroup reduxForm label='Tracking mode' fields={[
            { name: 'trackingMode', type: 'radio', label: 'Every 3 minutes (5 services 1 hour or more)', value: 'every-3-minutes' },
            { name: 'trackingMode', type: 'radio', label: 'Constant line', value: 'constant-line' },
            { name: 'trackingMode', type: 'radio', label: 'Constant line with distance', value: 'constant-line-with-distance' },
            { name: 'trackingMode', type: 'radio', label: 'None', value: 'none' }
          ]} columnFormat />
          <InputGroup reduxForm label='Timing' fields={[
            { name: 'timing', type: 'radio', label: 'Real-time tracking', value: 'real-time-tracking' },
            { name: 'timing', type: 'radio', label: 'Populate after complete', value: 'populate-after-complete' }
          ]} columnFormat />
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
)(form(GPSMap))
