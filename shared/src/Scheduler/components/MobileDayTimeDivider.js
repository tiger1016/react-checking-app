// Libraries
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

export default (props) => <View className='MobileDayTimeDivider' style={styles.container}>
  <Text style={styles.lineL} />
  <Text style={styles.text}>{props.text}</Text>
  <Text style={styles.lineR} />
</View>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: format_number(20, 'px')
  },
  lineL: {
    backgroundColor: '#F5F5F5',
    height: format_number(2, 'px'),
    flex: 1
  },
  text: {
    color: '#999999',
    fontWeight: '400',
    paddingLeft: format_number(8, 'px'),
    paddingRight: format_number(8, 'px'),
    fontSize: format_number(12, 'px'),
    paddingBottom: 0,
    fontFamily: 'Roboto',
    lineHeight: format_number(12, 'px')
  },
  lineR: {
    backgroundColor: '#F5F5F5',
    height: format_number(2, 'px'),
    flex: 1
  }
})
