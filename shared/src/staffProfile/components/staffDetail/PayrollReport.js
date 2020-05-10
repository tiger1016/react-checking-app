// Libraries
import React, { Component } from 'react'
import calendarLoading from '../../../../assets/loading-132px.gif'
// Styles
import '../../style.less'
import PayrollDetailModal from './PayrollDetailModal'
export class Rows extends Component {
  render () {
    const data = this.props.data

    var amount = 0
    if (data.items) {
      data
        .items
        .map(function (val) {
          amount = amount + parseInt(val.amount)
        })
    }
    return (
      <div className='row-container' onClick={this.props.onClick}>
        <div className='payrollno-container'>
          {data.payroll_id}
        </div>
        <div className='payrolldate-container'>
          {data.date}
        </div>
        <div className='payrollrate-container'>
          ${amount}
        </div>
      </div>
    )
  }
}

export class PayrollReport extends Component {
  constructor (props) {
    super(props)
    this.togglePayrollDetail = this
      .togglePayrollDetail
      .bind(this)
    this.openPayrollDetail = this
      .openPayrollDetail
      .bind(this)
    this.state = {
      isPayrollDetailModalOpen: false,
      PayrollDetail: {},
      TotalAmount: 0
    }
  }

  togglePayrollDetail (event) {
    if (this.state.isPayrollDetailModalOpen) {
      this.setState({ isPayrollDetailModalOpen: false })
    } else {
      this.setState({ isPayrollDetailModalOpen: true })
    }
  }

  openPayrollDetail (data) {
    var amount = 0
    data
      .items
      .map(function (val) {
        amount = amount + parseInt(val.amount)
      })
    this.setState({ PayrollDetail: data })
    this.setState({ TotalAmount: amount })

    this.setState({ isPayrollDetailModalOpen: true })
  }

  render () {
    const walkerPayroll = this.props.walkerPayroll
    return (
      <div className='payrolltable-container'>
        <div className='payroll-column-headers'>
          <div className='header-style payrollno-header'>Payroll Number</div>
          <div className='header-style payrolldate-header'>Date</div>
          <div className='header-style payrollrate-header'>Amount</div>
        </div>
        <div className='row-scroll'>
          {!walkerPayroll ? <div className='loader'><img src={calendarLoading} /></div> : ''}
          {walkerPayroll
            ? walkerPayroll.map(payrool => <Rows data={payrool} onClick={() => this.openPayrollDetail(payrool)} />)
            : ''}
        </div>

        <PayrollDetailModal
          isPayrollDetailModalOpen={this.state.isPayrollDetailModalOpen}
          togglePayrollDetailModal={this.togglePayrollDetail}
          PayrollDetail={this.state.PayrollDetail}
          TotalAmount={this.state.TotalAmount} />
      </div>

    )
  }
}
