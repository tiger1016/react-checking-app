// Libraries
import React from 'react'

// Components
import ByHour from './sections/ByHour'
import CustomForm from 'Web/globalContainers/input/CustomForm'
import InputGroup from 'GlobalComponents/input/InputGroup'
import TimeWindows from './sections/TimeWindows'

// Styles
import './index.css'

export default class WorkingHours extends React.Component {
  render () {
    let section = 'two'
    let inputGroupLabelWidth = '80px'
    return <div id='WorkingHours' className='section-content'>
      <CustomForm>
        <InputGroup reduxForm label='Time Slots' fields={[
          { name: 'time-slot', type: 'radio', label: 'By The Hour', value: 'by-the-hour' },
          { name: 'time-slot', type: 'radio', label: 'Time Windows', value: 'time-windows' }
        ]} mainLabelWidth={inputGroupLabelWidth} />
        {section === 'one' ? <ByHour /> : <TimeWindows />}
      </CustomForm>
    </div>
  }
}
