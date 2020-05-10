// Libraries
import React from 'react'
import DatePickerDialog from './components/DatePickerDialog'
import Icon from '../../CustomIcon'
import { View } from 'react-native'
import TextInput from '../TextInput'

// Styles
import Styles from './styles'

export default class DatePicer extends React.Component {
  openPicker = () => {
    this.refs.dobDialog.open({
      date: new Date(),
      maxDate: new Date() // To restirct future date
    })
  }

  render () {
    const {
      name,
      onChange,
      value,
      width,
      iconLeft,
      iconRight,
      format

    } = this.props
    let _rightIconClass = ''
    if (iconRight && iconRight !== '' && iconRight.toString() !== 'true') {
      _rightIconClass = iconRight
    } else {
      _rightIconClass = 'md-calendar'
    }
    let _leftIconClass = ''
    if (iconLeft && iconLeft !== '' && iconLeft.toString() !== 'true') {
      _leftIconClass = iconLeft
    } else {
      _leftIconClass = 'md-calendar'
    }

    return <View name={name} style={[Styles.datePicker, width]}>
      {iconLeft && <View style={Styles.icon}><Icon name={_leftIconClass} size={22} color={'#DDDDDD'} /></View>}
      <DatePickerDialog ref='dobDialog' onDatePicked={onChange} />
      <TextInput style={Styles.input} noBorder value={value.format(format || 'MM/DD/YYYY')} onFocus={this.openPicker} />
      {/* <DatePicker dateFormat='MM/DD/YYYY' className={className + ' datePicker'} selected={value ? utility.dateFormat(value) : null} onSelect={onChange} onChange={onChange} /> */}
      {(iconRight || (!iconLeft && !iconRight)) && <View style={Styles.icon}><Icon name={_rightIconClass} size={22} color={'#DDDDDD'} /></View>}
    </View>
  }
}
