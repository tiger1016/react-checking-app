// Libraries
import React from 'react'

// Components
import CustomForm from 'Web/globalContainers/input/CustomForm'
import InputGroup from 'GlobalComponents/input/InputGroup'

// Styles
import './index.css'

export default class Holidays extends React.Component {
  render () {
    return <div id='Holidays' className='section-content'>
      <CustomForm>
        <InputGroup reduxForm label='Recurring days off' fields={[
          { type: 'special-date-input', dayName: 'special-day-day-1', monthName: 'special-day-month-1', textName: 'special-day-name-1', removable: true, removeButtonOnClick: () => console.log('Ill be back') },
          { type: 'special-date-input', dayName: 'special-day-day-2', monthName: 'special-day-month-2', textName: 'special-day-name-2', removable: true, removeButtonOnClick: () => console.log('Ill be back') },
          { type: 'special-date-input', dayName: 'special-day-day-3', monthName: 'special-day-month-3', textName: 'special-day-name-3', removable: true, removeButtonOnClick: () => console.log('Ill be back') }
        ]} mainLabelWidth='140px' />
      </CustomForm>
    </div>
  }
}
