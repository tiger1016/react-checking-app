// Libraries
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
  payroll_modal: {
    color: 'gray',
    overflow: 'hidden',
    margin: -16
  },
  Payroll_head: {
    paddingTop: 5,
    paddingLeft: 5
  },
  title_text: {
    height: 60,
    width: 194,
    color: '#4D4D4D',
    fontSize: 30,
    fontWeight: '300',
    lineHeight: 60,
    margin: 0
  },
  Datebox: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    fontSize: 14,
    borderRadius: 5,
    flexDirection: 'column',
    display: 'flex'
  },
  Datebox_span: {
    marginBottom: 5,
    flexDirection: 'row',
    display: 'flex'
  },
  Addressbox: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  Addressbox__left: {
    flex: 1,
    display: 'flex',
    paddingRight: 5
  },
  Addressbox__right: {
    flex: 1,
    display: 'flex',
    paddingLeft: 5
  },
  Addressbox__header: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  Addressbox__namebilling: {
    fontSize: 14
  },
  Addressbox__name: {
    fontWeight: 'bold',
    fontSize: 14
  },
  Addressbox__address: {
    fontSize: 14
  },
  Addressbox__location: {
    fontSize: 14
  },
  payrolldetail_container: {
  },
  payrolldetail_column_headers: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 46
  },
  payrolldate_container: {
    fontSize: 13,
    padding: 5,
    lineHeight: 15,
    flex: 0.25
  },
  payrollitem_container: {
    fontSize: 13,
    padding: 5,
    lineHeight: 15,
    flex: 0.58
  },
  payrollamount_container: {
    fontSize: 13,
    padding: 5,
    lineHeight: 15,
    flex: 0.17
  },
  row_container_even: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6'
  },
  row_container_odd: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  row_scroll: {
    height: (Dimensions.get('window').height - (Dimensions.get('window').height * 10 / 100)) - 426
  },
  totalamount: {
    padding: 10,
    textAlign: 'right',
    display: 'flex'
  },
  totalamount__amount: {
    textAlign: 'right'
  },
  totalamount__label: {
    marginLeft: -10,
    paddingRight: 10,
    textAlign: 'right'
  }
})
