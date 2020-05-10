// Libraries
import React from 'react'

// Components
import CustomDatePickerWithIcon from '../CustomDatePickerWithIcon'
// import CustomSelectWithIcon from '../CustomSelectWithIcon'
import CustomTimePickerWithIcon from '../CustomTimePickerWithIcon'
import CustomSelect from 'GlobalComponents/input/CustomSelect'
import TextBox from 'GlobalComponents/input/TextBox'

// Styles
import './index.css'

const resolveType = (props) => {
  let { detail } = props
  let {
    loading,
    alert,
    amPmAlert,
    amPmPlaceholder,
    amPmValue,
    amPmOnChange,
    clearable,
    dateFormat,
    disabled,
    hourAlert,
    hourOnChange,
    hourPlaceholder,
    hourValue,
    iconClassname,
    inputWidth,
    mark,
    minuteAlert,
    minutePlaceholder,
    minuteOnChange,
    minuteValue,
    multi,
    placeholder,
    onChange,
    options,
    type,
    value,
    closeOnSelect,
    highContrast,
    noEdit
  } = detail
  if (noEdit && value) {
    return <span className='noEdit'>{value.value}</span>
  }
  if (loading) {
    return <div className='loadingList'>Loading...</div>
  }
  switch (type) {
    case 'textarea':
      return <TextBox icon
        ContainerClassName='walkNotes'
        onChange={onChange}
        value={value} />
    case 'date':
      return <CustomDatePickerWithIcon
        alert={alert}
        dateFormat={dateFormat}
        disabled={disabled}
        iconClassname={iconClassname}
        mark={mark}
        onChange={onChange}
        selected={value}
        value={value}
        width={inputWidth}
      />
    case 'time':
      return <CustomTimePickerWithIcon
        amPmAlert={amPmAlert}
        amPmOnChange={amPmOnChange}
        amPmPlaceholder={amPmPlaceholder}
        amPmValue={amPmValue}
        clearable={clearable}
        disabled={disabled}
        hourAlert={hourAlert}
        hourOnChange={hourOnChange}
        hourPlaceholder={hourPlaceholder}
        hourValue={hourValue}
        iconClassname={iconClassname}
        minuteAlert={minuteAlert}
        minuteOnChange={minuteOnChange}
        minutePlaceholder={minutePlaceholder}
        minuteValue={minuteValue}
      />
    default:
      return <CustomSelect
        highContrast={highContrast}
        alert={alert}
        clearable={clearable}
        disabled={disabled}
        iconClassname={iconClassname}
        mark={mark}
        multi={multi}
        closeOnSelect={closeOnSelect}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        value={value}
        width={inputWidth}
      />
  }
}
export default props => <div className='ServiceDetail'>
  <div className='label'>{props.detail.title}</div>
  <div className='input'>{resolveType(props)}</div>
</div>
