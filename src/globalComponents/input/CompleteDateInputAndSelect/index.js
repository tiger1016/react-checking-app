// Libraries
import React from 'react'

// Components
import DaysOfMonthSelect from '../DaysOfMonthSelect'
import MonthsSelect from '../MonthsSelect'
import TextInput from '../TextInput'

// Styles
import './index.css'

export default props => <div className='CompleteDateInputAndSelect'>
  <TextInput name={props.textName} reduxForm={props.reduxForm} />
  <DaysOfMonthSelect name={props.dayName} reduxForm={props.reduxForm} />
  <MonthsSelect name={props.monthName} reduxForm={props.reduxForm} />
</div>
