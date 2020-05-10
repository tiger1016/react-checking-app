// Libraries
import { StyleSheet, Dimensions } from 'react-native'
import { isIos } from '../../../helpers'
const styles = StyleSheet.create({
  closeButtonContainer: { marginTop: isIos ? 50 : 0, paddingTop: 25, paddingRight: 25, height: 50, backgroundColor: 'rgba(1, 101, 252, 0.9)', justifyContent: 'flex-end', alignItems: 'flex-end' },
  mainBody: { flexDirection: 'column', height: Dimensions.get('window').height, paddingTop: 160, width: Dimensions.get('window').width, alignItems: 'center', backgroundColor: 'rgba(1, 101, 252, 0.9)' },
  mainIconContainer: { height: 50, width: 50, backgroundColor: '#fff', borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  mainIcon: { fontSize: 24, color: '#4286f4' },
  alertText: { fontSize: 20, color: '#fff', padding: 40 },
  actionContainer: { height: 50, flexDirection: 'row', width: Dimensions.get('window').width }
})

export default styles
