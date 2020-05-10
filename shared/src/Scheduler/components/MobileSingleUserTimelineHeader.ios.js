// Libraries
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { Gravatar } from 'nachos-ui'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

export default props => <View className='MobileSingleUserTimelineHeader' style={styles.container}>
  <View><Text style={styles.person}>{props.walker.name}</Text></View>
</View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: format_number(10, 'px'),
    marginTop: format_number(10, 'px')
  },
  person: {
    flex: 1,
    paddingBottom: format_number(5, 'px'),
    paddingLeft: format_number(10, 'px'),
    fontSize: format_number(12, 'px'),
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  }
})
