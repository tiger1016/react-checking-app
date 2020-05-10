// Libraries
import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  Profile: {
    alignItems: 'center',
    flexDirection: 'column'
  },
  NavSelect: {
    width: Dimensions.get('window').width,
    minHeight: 60,
    padding: 10,
    backgroundColor: '#ddd'
  },
  profile_inner: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
    // overflow: 'auto',
    flexDirection: 'column'
  }

})

export default styles
