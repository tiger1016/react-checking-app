// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Controllers
import { appController, sessionController } from 'Controllers'

// Actions
import fetchBusinessSnapshot from 'Actions/dashboard/fetchBusinessSnapshot'
import fetchBusyHours from 'Actions/dashboard/fetchBusyHours'
import fetchCustomerBase from 'Actions/dashboard/fetchCustomerBase'
import fetchDailySnapshot from 'Actions/dashboard/fetchDailySnapshot'
import fetchQrCodes from 'Actions/profile/fetchQrCodes'
import fetchRevenue from 'Actions/dashboard/fetchRevenue'
import fetchTopZips from 'Actions/dashboard/fetchTopZips'

// Components
import BusinessSnapshot from './components/BusinessSnapshot'
import BusyHours from './components/BusyHours'
import CustomerBase from './components/CustomerBase'
import DailySnapshot from './components/DailySnapshot'
import Data from './containers/Data'
import ErrorDisplay from 'GlobalComponents/ErrorDisplay'
import Loader from 'GlobalComponents/Loader'
import Revenue from './components/Revenue'
import TopZips from './components/TopZips'

// Styles
import './index.css'

class Dashboard extends React.Component {
  state = { windowWidth: 0, windowHeight: 0 }

  componentDidMount () {
    const { fetchQrCodes, userType } = this.props

    if (userType === 'licensee' || userType === 'full_scheduling_admin') {
      this.fetchAll()
      fetchQrCodes()
    } else {
      this.fetchAll(true)
    }

    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    appController.actions.openSideBar()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  fetchAll = (partial = false) => {
    this.props.fetchDailySnapshot()
    this.props.fetchBusyHours()
    if (!partial) {
      this.props.fetchRevenue()
    }
    this.props.fetchCustomerBase()
    this.props.fetchBusinessSnapshot()
    this.props.fetchTopZips()
  }

  updateWindowDimensions = () => {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight })
  }
  render () {
    const {
      dailySnapshotIsLoading,
      busyHoursIsLoading,
      revenueIsLoading,
      customerBaseIsLoading,
      businessSnapshotIsLoading,
      topZipsIsLoading,
      userType
    } = this.props

    const dashboardItems = [
      {
        component: <DailySnapshot />,
        name: 'Daily Snapshot',
        ident: 'DailySnapshot',
        loading: dailySnapshotIsLoading
      },
      {
        component: <BusyHours windowWidth={this.state.windowWidth} />,
        name: 'Busy Hours Today',
        ident: 'BusyHours',
        loading: busyHoursIsLoading
      },
      {
        component: <CustomerBase />,
        name: 'Customer Base',
        ident: 'CustomerBase',
        loading: customerBaseIsLoading
      },
      {
        component: <BusinessSnapshot />,
        name: 'Business Snapshot',
        ident: 'BusinessSnapshot',
        loading: businessSnapshotIsLoading
      }
    ]

    if (userType === 'licensee' || userType === 'full_scheduling_admin') {
      dashboardItems.splice(2, 0, {
        component: <Revenue windowWidth={this.state.windowWidth} />,
        name: 'Revenue',
        ident: 'Revenue',
        help: 'Measures processed payments per day',
        loading: revenueIsLoading
      })
      dashboardItems.push({
        component: <TopZips {...this.props} />,
        name: 'Top Zip Codes',
        ident: 'TopZips',
        loading: topZipsIsLoading
      })
    }

    return <div id='Dashboard'>
      {dashboardItems.map((item, index) => <Data key={index} dataName={item.name} dataIdent={item.ident} help={item.help ? item.help : null}>
        {item.loading === false ? item.component : (item.loading ? <Loader /> : <ErrorDisplay />)}
      </Data>)}
    </div>
  }
}

const mapStateToProps = state => {
  const businessSnapshotIsLoading = state.dashboard.businessSnapshot.loading
  const busyHoursIsLoading = state.dashboard.busyHours.loading
  const customerBaseIsLoading = state.dashboard.customerBase.loading
  const dailySnapshotIsLoading = state.dashboard.dailySnapshot.loading
  const revenueIsLoading = state.dashboard.revenue.loading
  const topZipsIsLoading = state.dashboard.topZips.loading
  const userType = sessionController.selectUserType(state)
  return {
    qrcodes: state.profile.profile,
    businessSnapshotIsLoading,
    busyHoursIsLoading,
    customerBaseIsLoading,
    dailySnapshotIsLoading,
    revenueIsLoading,
    topZipsIsLoading,
    userType
  }
}

const mapDispatchToProps = {
  fetchBusinessSnapshot,
  fetchBusyHours,
  fetchCustomerBase,
  fetchDailySnapshot,
  fetchQrCodes,
  fetchRevenue,
  fetchTopZips
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
