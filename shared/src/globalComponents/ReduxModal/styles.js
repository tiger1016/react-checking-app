
// Libraries
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  modalMainContainer: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(148, 148, 148, 0.55)',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})
