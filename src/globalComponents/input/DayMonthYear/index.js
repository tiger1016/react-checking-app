// Libraries
import React from 'react'

// Components
import DaysOfMonthSelect from '../DaysOfMonthSelect'
import MonthsSelect from '../MonthsSelect'
import YearInput from '../YearInput'

// Styles
import './index.css'

export default props => <div className='DayMonthYear'>
  <MonthsSelect error={props.error} disabled={props.disabled} clearable={props.clearable} name={props.monthName} numberLabel={props.monthsNumberLabel} numberValue={props.monthsNumberValue} onChange={props.monthOnChange} placeholder={props.monthsNumberLabel ? 'mm' : 'month'} value={props.monthValue} />
  {props.noDay ? null : <DaysOfMonthSelect error={props.error} clearable={props.clearable} name={props.dayName} onChange={props.dayOnChange} placeholder='day' value={props.dayValue} />}
  <YearInput error={props.error} disabled={props.disabled} name={props.yearName} onChange={props.yearOnChange} placeholder='----' value={props.yearValue} />
</div>
