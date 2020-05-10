// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Text, View, ScrollView } from 'react-native'
// Components
import ModalTemplate from '../../globalComponents/ModalTemplate'

// Controllers
import { reportsController } from '../../../controllers'

// Styles
import Styles from './styles'

// Helpers
const formatDate = function (date) { // yyyy-mm-dd,mm/dd/yyyy,2016-12-26
  if (date) {
    var temp = date.split('-')
    return temp[1] + '/' + temp[2] + '/' + temp[0]
  } else {
    return null
  }
}
const formatDateTime = function (date) { // yyyy-mm-dd hh:mm:ss,mm/dd/yyyy,2016-12-26
  if (date) {
    var temp0 = date.split(' ')
    var temp1 = temp0[1].split(':')
    var temp = temp0[0].split('-')
    var temp2 = temp1[0] > 12 ? 'PM' : 'AM'
    return temp[1] + '/' + temp[2] + '/' + temp[0] + ' ' + temp1[0] + ':' + temp1[1] + ' ' + temp2
  } else {
    return null
  }
}
class Rows extends React.Component {
  render () {
    const data = this.props.data
    return (
      <View style={Styles['row_container_' + this.props.type]} >
        <Text style={Styles.payrolldate_container}>{formatDateTime(data.requested_time)}</Text>
        <Text style={Styles.payrollitem_container}>{data.billing_group_description}</Text>
        <Text style={Styles.payrollamount_container}>${data.amount}</Text>
      </View>
    )
  }
}

class PayrollDetailModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      PayrollDetail: this.props.app.modal.data.PayrollDetail,
      TotalAmount: this.props.app.modal.data.TotalAmount
    }
  }

  render () {
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    this.state.PayrollDetail.items.push(this.state.PayrollDetail.items[0])
    return (<ModalTemplate
      actions={[
        {
          disabled: this.props.disabled,
          loading: this.props.reportLoading,
          onClick: () => reportsController.actions.sendPayrollReport(this.state.PayrollDetail.payroll_id),
          text: 'Send Payroll'
        }
      ]}
      body={() =>
        <View style={Styles.payroll_modal}>
          <View style={Styles.Payroll_head}><Text style={Styles.title_text}>Payroll #{this.state.PayrollDetail.payroll_id}</Text></View>
          <View style={Styles.Addressbox}>
            <View style={Styles.Addressbox__left}>
              <Text style={Styles.Addressbox__header}>From</Text>
              <Text style={Styles.Addressbox__name}>{this.state.PayrollDetail.licensee_name}</Text>
              <Text style={Styles.Addressbox__address}>{this.state.PayrollDetail.address_billing}</Text>
              <Text style={Styles.Addressbox__location}>{this.state.PayrollDetail.city_billing ? this.state.PayrollDetail.city_billing + ',' : ''}{this.state.PayrollDetail.state_billing} {this.state.PayrollDetail.zip_billing}</Text>
            </View>
            <View style={Styles.Addressbox__right}>
              <Text style={Styles.Addressbox__header}>To</Text>
              <Text style={Styles.Addressbox__name}>{this.state.PayrollDetail.first_name} {this.state.PayrollDetail.last_name}</Text>
              <Text style={Styles.Addressbox__address}>{this.state.PayrollDetail.address} {this.state.PayrollDetail.address2}</Text>
              <Text style={Styles.Addressbox__location}>{this.state.PayrollDetail.city ? this.state.PayrollDetail.city + ', ' + this.state.PayrollDetail.state + ' ' : ''}</Text>
            </View>
          </View>
          <View style={Styles.Datebox}>
            <View style={Styles.Datebox_span}><Text>Date: </Text><Text>{formatDate(this.state.PayrollDetail.date)}</Text></View>
            <View style={Styles.Datebox_span}><Text>Period: </Text><Text>{formatDate(this.state.PayrollDetail.period_start)}_{formatDate(this.state.PayrollDetail.period_end)}</Text></View>
            <View style={Styles.Datebox_span}><Text>Amount: </Text><Text>${parseFloat(this.state.TotalAmount).toFixed(2)}</Text></View>
          </View>
          <View style={Styles.payrolldetail_container}>
            <View style={Styles.payrolldetail_column_headers}>
              <Text style={Styles.payrolldate_container}>DATE</Text>
              <Text style={Styles.payrollitem_container}>ITEM/ADDON</Text>
              <Text style={Styles.payrollamount_container}>AMOUNT</Text>
            </View>
            <ScrollView style={Styles.row_scroll} contentContainerStyle={{ flex: 1 }}>
              {this.state.PayrollDetail.items ? this.state.PayrollDetail.items.map((item, i) => <Rows key={i} type={i % 2 === 0 ? 'even' : 'odd'} data={item} />) : ''}
            </ScrollView>
            <View style={Styles.totalamount}><Text style={Styles.totalamount__amount}>Total: ${parseFloat(this.state.TotalAmount).toFixed(2)}</Text></View>
          </View>

        </View>
      }
      title='PAYROLL DETAIL'
    />)
  }
}

const mapStateToProps = state => {
  return {
    app: state.app,
    reportLoading: state.payrolls.reortLoading
  }
}

export default connect(mapStateToProps)(PayrollDetailModal)
