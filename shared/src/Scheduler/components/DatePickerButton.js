// Libraries
import React from 'react'
import { TouchableHighlight, View } from 'react-native'
// import { Spinner } from 'nachos-ui'
import Icon from '../../globalComponents/CustomIcon'
import DatePickerInput from '../../globalComponents/input/DatePicker'
import moment from 'moment'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

export default props => <View style={styles.datePickerStatusesContainer}>
  <TouchableHighlight onPress={() => props.previousDate()}>
    <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
      <Icon name='ios-arrow-back' size={14} color='#999' />
    </View>
  </TouchableHighlight>
  <DatePickerInput value={moment(props.walks.start_time)} onChange={props.onChange} />
  {/* <TouchableHighlight onPress={() => props.openDatePicker()}>
    <View style={styles.datePicker}>
      <Text style={styles.datePickerDate}>{moment(props.walks.start_time).format('MM/DD/YY')}</Text>
      <Icon name='md-calendar' size={14} color='#999' />
    </View>
  </TouchableHighlight> */}
  <TouchableHighlight onPress={() => props.nextDate()}>
    <View style={[styles.arrowContainer, styles.arrowRightContainer]}>
      <Icon name='ios-arrow-forward' size={14} color='#999' />
    </View>
  </TouchableHighlight>
</View>

const styles = {
  arrowContainer: {
    paddingTop: format_number(14, 'px'),
    paddingBottom: format_number(14, 'px')
  },
  arrowLeftContainer: {
    paddingLeft: format_number(10, 'px'),
    paddingRight: format_number(10, 'px')
  },
  arrowRightContainer: {
    paddingLeft: format_number(10, 'px'),
    paddingRight: format_number(10, 'px')
  },
  datePicker: {
    height: format_number(40, 'px'),
    width: format_number(114, 'px'),
    borderWidth: format_number(1, 'px'),
    borderStyle: 'solid',
    borderColor: '#DADADA',
    borderRadius: format_number(4, 'px'),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingTop: format_number(13, 'px'),
    paddingBottom: format_number(13, 'px'),
    paddingLeft: format_number(17, 'px'),
    paddingRight: format_number(17, 'px')
  },
  datePickerDate: {
    flex: 1,
    color: '#999999',
    fontSize: format_number(12, 'px'),
    fontFamily: 'Roboto'
  },
  datePickerStatusesContainer: {
    paddingTop: format_number(10, 'px'),
    paddingBottom: format_number(10, 'px'),
    flexDirection: 'row'
  }
}
