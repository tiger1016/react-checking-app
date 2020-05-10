// Library
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  navigation: {
    height: Dimensions.get('window').height,
    maxHeight: Dimensions.get('window').height,
    overflow: 'hidden',
    backgroundColor: 'white'
  }
})
