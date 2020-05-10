// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Styles
import './index.css'

// Components
import { Tab } from 'GlobalComponents/TabComponent/Tab'
import { CustomerRefundsAndCreditsPage } from './components/CustomerRefundsAndCreditsPage'
import { InvoiceDetailsPage } from './components/InvoiceDetailsPage'

import { sessionController } from 'Controllers'

// Actions
import customerProfileActions from 'Actions/customerProfile'
import customersActions from 'Actions/customers'
import ratesActions from 'Actions/rates'
import fetchCredits from 'Actions/credits/fetchCredits'
import refundsActions from 'Actions/refunds'
import fetchCustomerInvoices from 'Actions/invoices/fetchCustomerInvoices'
import paymentsActions from 'Actions/payments'

class CustomerPaymentCenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      payments: {},
      billing: {},
      deletemodalIsOpen: false,
      custid: this.props.selectedUser.user_id
    }
    this.openDeleteModal = this.openDeleteModal.bind(this)
  }
  componentDidMount () {
    this.props.fetchCustomerInvoices(this.state.custid)
    this.props.refundsActions.fetchRefunds()
    this.props.fetchCredits()
    this.props.customersActions.fetchCustomers()
  }

  openDeleteModal () {
    this.setState({ deletemodalIsOpen: true })
  }

  componentWillReceiveProps (nextProps, nextState) {
    this.state = {
      payments: nextProps.payments.payments,
      billing: nextProps.payments.billings
    }
  }

  render () {
    const refunds = this.props.refunds.refunds
    const credits = this.props.credits.credits.credits
    const creditsUsed = this.props.credits.credits['credits-used']
    const invoices = this.props.invoices.invoices

    const tabs = [
      { title: 'Invoices', content: (invoices && <InvoiceDetailsPage loading={this.props.invoices.loading} invoices={invoices} custid={this.state.custid} customersData={this.props.customersData} />) },
      { title: 'Refunds & Credits', content: (refunds && this.props.customersData && <CustomerRefundsAndCreditsPage invoices={invoices} customersData={this.props.customersData} refunds={refunds} credits={credits} creditsUsed={creditsUsed} custid={this.props.match.params.id} isCustomer />) }
    ].map(tab => {
      return Object.assign({}, tab)
    })

    return (
      <div id='CustomerProfile'>
        <div className='cus-header-top'>
          <span className='title-text'>Payment Center</span>
        </div>
        <Tab tabs={tabs} />
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  let selectedUser = sessionController.selectUser(state)
  return {
    refunds: state.refunds,
    credits: state.credits,
    invoices: state.invoices,
    payments: state.payments,
    billing: state.payments.billings,
    customersData: state.customers,
    selectedUser
  }
}

export default connect(
  mapStateToProps,
  dispatch => ({
    customerProfileActions: bindActionCreators(customerProfileActions, dispatch),
    ratesActions: bindActionCreators(ratesActions, dispatch),
    refundsActions: bindActionCreators(refundsActions, dispatch),
    fetchCredits: bindActionCreators(fetchCredits, dispatch),
    fetchCustomerInvoices: bindActionCreators(fetchCustomerInvoices, dispatch),
    paymentsActions: bindActionCreators(paymentsActions, dispatch),
    customersActions: bindActionCreators(customersActions, dispatch),
    dispatch
  })
)(CustomerPaymentCenter)
