// Libraries
import React, { Component } from 'react'
import ReactModal from 'react-modal'

// Helpers

export class Rows extends Component {
  render () {
    const data = this.props.data
    return (
      <div className='row-container' onClick={this.props.onClick}>
        <div className='payrollno-container'>
          {data.requested_time}
        </div>
        <div className='payrolldate-container'>
          {data.billing_group_description}
        </div>
        <div className='payrollrate-container' />
        <div className='payrollrate-container'>
          ${data.amount}
        </div>
      </div>
    )
  }
}

export default props => <ReactModal
  className='ReactModal__Content ReactModal__Content_Mobile--after-open'
  contentLabel='Payroll Detail'
  isOpen={props.isPayrollDetailModalOpen}
  onAfterOpen={() => console.log('PayrollDetail modal after close')}
  onRequestClose={() => props.togglePayrollDetailModal()}>
  <div className='modal-main-container'>
    <div className='modal-header-container'>
      <div className='modal-header'>
        <span className='modal-header-text'>Payroll Detail</span>
        <div>
          <button className='close-modal' onClick={() => props.togglePayrollDetailModal()}>X</button>
        </div>
      </div>
    </div>

    <div className='payroll-modal'>
      <div className='Payroll-head'><span className='title-text'>Payroll #{props.PayrollDetail.payroll_id}</span></div>
      <div className='Addressbox' />
      <div className='Datebox'>
        <p> Date:<span>{props.PayrollDetail.date}</span><br /></p>
        <p>Period:<span>{props.PayrollDetail.period_start}-{props.PayrollDetail.period_end}</span><br /></p>
        <p>Amount:<span>{props.TotalAmount}</span></p>
      </div>
      <div className='payrolldetail-container'>
        <div className='payroll-column-headers'>
          <div className='header-style payrollno-header'>Date</div>
          <div className='header-style payrolldate-header'>Item/Addons</div>
          <div className='header-style payrolldate-header'>Pet(s)</div>
          <div className='header-style payrollrate-header'>Amount</div>
        </div>
        <div className='row-scroll'>

          {props.PayrollDetail.items ? props.PayrollDetail.items.map(item =>
            <Rows data={item} />
          ) : ''}
        </div>
      </div>
      <div className='totalamount'><span >Total:</span><span className='amount'>${props.TotalAmount}</span></div>

    </div>
  </div>

</ReactModal>
