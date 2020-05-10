import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  Payroll: {
    flex: 1
  },
  Payroll__action_header: {
    textAlign: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    width: '12%'
  },
  payrollsTable: {
    paddingTop: 15,
    height: Dimensions.get('screen').height - 211
  }
})

export default styles
