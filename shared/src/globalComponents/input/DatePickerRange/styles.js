// Libraries
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  DatePickerRange: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 250
  },
  left: {
    flex: 0.45
  },
  center: {
    flex: 0.1

  },
  to: {
    fontFamily: 'Roboto',
    textAlign: 'center',
    color: '#999',
    fontSize: 14
  },
  right: {
    flex: 0.45
  }
})

export default styles
