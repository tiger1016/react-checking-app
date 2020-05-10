// Libraries
import React from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
// import { Button } from 'nachos-ui'
import moment from 'moment'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

const bgColorHandler = walk => {
  if (walk.status === 'in_process') {
    return '#B6E4EB'
  } else if (walk.status === 'pending') {
    return '#FFEA85'
  } else if (moment(walk.start).isAfter(walk.requested_time)) {
    return '#FFC7C7'
  }
  return '#e9ebee'
}

export default props => <TouchableOpacity className='MobileSingleUserTimeLineCard'
  onPress={() => props.openModal(props.walk)}
>
  <View style={[styles.container, { backgroundColor: bgColorHandler(props.walk) }]}>
    <Text style={styles.date}>{moment(new Date(props.walk.requested_time)).format('h:mm A')}</Text>
    <Text style={styles.personName}>{props.walk.customer_name}</Text>
    <Text style={styles.description}>{props.walk.dropdown_description}</Text>
  </View>
</TouchableOpacity>

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    // backgroundColor: 'rgb(204,236,240)',
    backgroundColor: '#cdcdcd',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: format_number(1, 'px'),
    borderRadius: format_number(6, 'px')
  },
  date: {
    fontSize: format_number(12, 'px'),
    fontWeight: 'bold',
    padding: format_number(10, 'px'),
    fontFamily: 'Roboto',
    width: format_number(74, 'px'),
    minWidth: format_number(74, 'px'),
    maxWidth: format_number(74, 'px')
  },
  personName: {
    fontSize: format_number(12, 'px'),
    fontWeight: 'bold',
    padding: format_number(10, 'px'),
    fontFamily: 'Roboto',
    width: format_number(130, 'px'),
    minWidth: format_number(130, 'px'),
    maxWidth: format_number(130, 'px')
  },
  description: {
    fontSize: format_number(12, 'px'),
    fontWeight: '300',
    padding: format_number(10, 'px'),
    flex: 1,
    fontFamily: 'Roboto'
  }
})
