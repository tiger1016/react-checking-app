// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Components
import ModalTemplate from 'GlobalComponents/ModalTemplate'

// Controllers
import { reportsController } from 'Controllers'

// Styles
import './index.css'

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
      <div className='row-container' >
        <div className='payrolldate-container'>
          {formatDateTime(data.requested_time)}
        </div>
        <div className='payrollitem-container'>
          {data.billing_group_description || data.addon_description}
        </div>
        <div className='payrollpet-container' />
        <div className='payrollamount-container'>
          ${data.amount}
        </div>
      </div>
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
        <div className='payroll-modal'>
          <div className='Payroll-head'><span className='title-text'>Payroll #{this.state.PayrollDetail.payroll_id}</span></div>
          <div className='Addressbox'>
            <div className='left'>
              <span className='header'>From</span><br /><br />
              <span className='name'>{this.state.PayrollDetail.licensee_name}</span><br />
              {/* <span className='name'>{this.state.PayrollDetail.first_name_billing} {this.state.PayrollDetail.last_name_billing}</span><br /> */}
              <span className='address'>{this.state.PayrollDetail.address_billing}</span><br />
              <span className='location'>{this.state.PayrollDetail.city_billing ? this.state.PayrollDetail.city_billing + ',' : ''}{this.state.PayrollDetail.state_billing} {this.state.PayrollDetail.zip_billing}</span>
            </div>
            <div className='right'>
              <span className='header'>To</span><br /><br />
              <span className='name'>{this.state.PayrollDetail.first_name} {this.state.PayrollDetail.last_name}</span><br />

              <span className='address'>{this.state.PayrollDetail.address} {this.state.PayrollDetail.address2}</span><br />
              <span className='location'>{this.state.PayrollDetail.city ? this.state.PayrollDetail.city + ', ' + this.state.PayrollDetail.state + ' ' : ''}</span>
              <span className='name' /><br />
            </div>
          </div>
          <div className='Datebox'>
            <p>Date:<span>{formatDate(this.state.PayrollDetail.date)}</span><br /></p>
            <p>Period:<span>{formatDate(this.state.PayrollDetail.period_start)} - {formatDate(this.state.PayrollDetail.period_end)}</span><br /></p>
            <p>Amount:<span>${parseFloat(this.state.TotalAmount).toFixed(2)}</span></p>
          </div>
          <div className='payrolldetail-container'>
            <div className='payrolldetail-column-headers'>
              <div className='header-style payrolldate-container'>Date</div>
              <div className='header-style payrollitem-container'>Item/Addons</div>
              <div className='header-style payrollpet-container'>&nbsp;</div>
              <div className='header-style payrollamount-container'>Amount</div>
            </div>
            <div className='row-scroll'>
              {this.state.PayrollDetail.items ? this.state.PayrollDetail.items.map((item, i) => <Rows key={i} data={item} />) : ''}
            </div>
            <div className='totalamount'><span className='label'>Total:</span><span className='amount'>${parseFloat(this.state.TotalAmount).toFixed(2)}</span></div>
          </div>

        </div>
      }
      title='Payroll Detail'
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
