// Libraries
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  datePicker: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dadada',
    borderRadius: 3,
    justifyContent: 'space-around',
    minWidth: 100
  },
  input: {
    flex: 0.9,
    minWidth: 0,
    color: '#808080',
    fontSize: 12
  },
  icon: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 9
  }
})

export default styles
