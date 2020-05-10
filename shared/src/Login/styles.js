// Libraries
import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 5
  },
  errorMessage: {
    color: '#c7011a',
    marginLeft: 5
  },
  innerContainer: {
    alignItems: 'stretch',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 40
  },
  forgetLink: {
    color: '#000',
    textAlign: 'center'
  },
  input2: {
    marginBottom: 60
  },
  item: {
    marginBottom: 20
  },
  loginButton: {
    marginBottom: 60
  },
  loginContainerNative: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  subText: {
    color: '#000',
    textAlign: 'center'
  },
  title: {
    color: '#000',
    fontSize: 24,
    marginBottom: 60,
    textAlign: 'center'
  }
})

export default styles
