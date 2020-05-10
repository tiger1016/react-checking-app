// Libraries
import React, { Component } from 'react'
// import ReactModal from 'react-modal'

// Styles
import '../index.css'

// Components
import { Refund } from './refundAndCreditComponent/Refund'
import { Credit } from './refundAndCreditComponent/Credit'

import { CUSTOMER_PROFILE_INFO } from './constants'

const refundAndCreditObj = CUSTOMER_PROFILE_INFO.dataDefinition.refundsAndCredits

export class CustomerRefundsAndCreditsPage extends Component {
  constructor () {
    super()
    this.state = {
      modalIsOpen: false,
      issueType: '',
      issueCredit: {},
      refunds: [],
      credits: [],
      creditsUsed: []
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.closeModalAfterRefund = this.closeModalAfterRefund.bind(this)
    this.closeModalAfterCredit = this.closeModalAfterCredit.bind(this)
  }

  componentWillMount () {
    this.setState({
      refunds: this.props.refunds,
      credits: this.props.credits,
      creditsUsed: this.props.creditsUsed
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      refunds: nextProps.refunds,
      credits: nextProps.credits,
      creditsUsed: nextProps.creditsUsed
    })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  closeModalAfterRefund (custid, amount, pay_with, invoices) { // eslint-disable-line camelcase
    this.setState({ modalIsOpen: false })
  }

  closeModalAfterCredit (amount, custid) {
    this.setState({ modalIsOpen: false })
  }

  openModal (data) {
    if (data === 'refunds') {
      this.setState({ issueType: data })
      this.setState({ modalIsOpen: true })
    } else if (data === 'credits') {
      this.setState({ issueType: data })
      this.setState({ modalIsOpen: true })
    }
  }

  render () {
    const custId = this.props.custid

    var selectedRefunds = []
    var selectedCreditsUsed = []
    var selCredits = []

    var allCustomer = []

    var refData = this.state.refunds
    var creditsdata = this.state.credits
    var creditsUseddata = this.state.creditsUsed

    for (var i = 0; i < this.props.customersData.customers.length; i++) {
      var name = this.props.customersData.customers[i].first_name + ' ' + this.props.customersData.customers[i].last_name
      allCustomer.push({
        value: this.props.customersData.customers[i].customer_id,
        label: name
      })
    }

    Object.keys(refData).forEach(function (key) {
      if (Number(refData[key].customer_id) === Number(custId)) {
        selectedRefunds.push(refData[key])
      }
    })

    Object.keys(creditsdata).forEach(function (key) {
      if (Number(creditsdata[key].customer_id) === Number(custId)) {
        selCredits.push(creditsdata[key])
      }
    })

    Object.keys(creditsUseddata).forEach(function (key) {
      if (Number(creditsUseddata[key].customer_id) === Number(custId)) {
        selectedCreditsUsed.push(creditsUseddata[key])
      }
    })

    return (
      <div>
        <div>
          <div className='title-div'>
            <span className='refunds-credits-title'>Refunds</span>
          </div>
          <div>
            <Refund selectedRefunds={selectedRefunds} />
          </div>
        </div>
        <div>
          <div className='title-div'>
            <span className='refunds-credits-title'>Credits</span>
          </div>
          <div>
            <Credit data={refundAndCreditObj} selectedCredits={selCredits} selectedCreditsUsed={selectedCreditsUsed} />
          </div>
        </div>
      </div>
    )
  }
}
