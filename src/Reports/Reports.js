// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route, withRouter } from 'react-router-dom'

// Controllers
import { appController, reportsController } from 'Controllers'

// Actions
import reportsAction from 'Actions/reports'

// Styles
import './index.css'

// Components
import Activity from './components/Activity'
import CustomerMailing from './components/CustomerMailing'
import Disbursement from './components/Disbursement'
import NavTab from 'GlobalComponents/navigation/NavTab'
import Payroll from './components/Payroll'
import QrCodes from './components/QrCodes'
import Receivables from './components/Receivables'
import Sales from './components/Sales'
import SectionHeader from 'GlobalComponents/SectionHeader'
import Transaction from './components/Transaction'
import WalkAudit from './components/WalkAudit'

class Reports extends Component {
  componentDidMount () {
    appController.actions.openSideBar()
    this.props.reportsAction.fetchCustomerInfo()
  }
  componentWillMount () {
    reportsController.fetchAllFilterData(this.props)
  }
  render () {
    let reportsRoot = '/reports'

    let routes = [
      {
        component: Transaction,
        index: true,
        path: `${reportsRoot}/transaction`,
        title: 'Transaction'
      },
      {
        component: Sales,
        path: `${reportsRoot}/sales`,
        title: 'Sales'
      },
      {
        component: Disbursement,

        path: `${reportsRoot}/disbursement`,
        title: 'Disbursement'
      },
      {
        component: Receivables,
        path: `${reportsRoot}/receivables`,
        title: 'Receivables'
      },
      {
        component: Activity,
        path: `${reportsRoot}/activity`,
        title: 'Activity'
      },
      {
        component: WalkAudit,
        path: `${reportsRoot}/walk-audit`,
        title: 'Walk Audit'
      },
      {
        component: Payroll,
        path: `${reportsRoot}/payroll`,
        title: 'Payroll'
      },
      {
        component: QrCodes,
        path: `${reportsRoot}/qr-codes`,
        title: 'Qr Codes'
      },
      {
        component: CustomerMailing,
        path: `${reportsRoot}/customer-mailing`,
        title: 'Customer Mailing'
      }

    ]

    return <div id='Reports'>
      <SectionHeader title='Reports' />
      <NavTab routes={routes} />
      <Route exact path={reportsRoot} component={Transaction} />
      {routes.map((route, i) => <Route key={i} path={route.path} component={route.component} />)}
    </div>
  }
}

let mapStateToProps = state => {
  return {
    addons: state.addons,
    app: state.app,
    customers: state.customers,
    maps: state.maps,
    pets: state.pets,
    photos: state.photos,
    scheduler: state.scheduler,
    services: state.services,
    session: state.session,
    state,
    walkers: state.walkers,
    walks: state.walks
  }
}

let mapDispatchToProps = dispatch => ({
  reportsAction: bindActionCreators(reportsAction, dispatch),
  dispatch
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reports))
