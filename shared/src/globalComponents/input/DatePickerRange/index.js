// Libraries
import React from 'react'
import DatePickerInput from '../DatePicker'
import { View, Text } from 'react-native'

// Styles
import Styles from './styles'

export default props => <View style={Styles.DatePickerRange}>
  <View style={Styles.left}>
    <DatePickerInput value={props.startDate} onChange={props.handleStartDateChange} />
  </View>
  <View style={Styles.center}><Text style={Styles.to}>To</Text></View>
  <View style={Styles.right}>
    <DatePickerInput value={props.endDate} onChange={props.handleEndDateChange} />
  </View>
</View>
