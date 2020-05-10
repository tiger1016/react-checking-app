// Libraries
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  fullScreenTextOnly: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loaderContainer: {
    margin: 15
  },
  text: {
    color: '#02568a',
    fontSize: 18
  }
})
