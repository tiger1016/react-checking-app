// Libraries
import React from 'react'
import { Field } from 'redux-form'

// Constants
import { WEEKLY, WEEKLYS, BILLINGWEEKLY } from './constants'

// Components
import CustomSelect from '../CustomSelect'

// Styles
import './index.css'

const Select = props => <CustomSelect {...props} reduxForm />

const reduxFormWeekDaySelect = props => <Field
  component={Select}
  help={props.help}
  placeholder={props.placeholder || '-select weekday-'}
  name={props.name}
  options={props.billing ? BILLINGWEEKLY : props.s ? WEEKLYS : WEEKLY}
  disabled={props.disabled}
/>

const regularWeekdaySelect = props => <div >Missing regular weekday select</div>

export default props => <div className='WeekSelect'>{props.reduxForm ? reduxFormWeekDaySelect(props) : regularWeekdaySelect(props)}</div>
