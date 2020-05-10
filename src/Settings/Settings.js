// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import Loadable from 'react-loadable'
// Config
import loadableConfig from 'Config/loadable.config'

// Controllers
import { appController, sessionController } from 'Controllers'

// Styles
import './index.css'
// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'
const LoadingComponent = props => {
  return <FullScreenTextOnly text='Loading' spinner />
}
const _loadableConfig = {
  ...loadableConfig,
  loading: LoadingComponent
}
const Addons = Loadable({
  ..._loadableConfig,
  loader: () => import('./Addons')
})
// import BusinessHours from './BusinessHours'
const CustomerBilling = Loadable({
  ..._loadableConfig,
  loader: () => import('./CustomerBilling')
})
// import GPSMap from './GPSMap'
// import LateAlerts from './LateAlerts'
const SectionBody = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/SectionBody')
})
const SchedulerSettings = Loadable({
  ..._loadableConfig,
  loader: () => import('./SchedulerSettings')
})
const NavTab = Loadable({
  ..._loadableConfig,
  loader: () => import('GlobalComponents/navigation/NavTab')
})
const Services = Loadable({
  ..._loadableConfig,
  loader: () => import('./Services')
})
// const StaffPayroll = Loadable({
//   ..._loadableConfig,
//   loader: () => import('./StaffPayroll')})

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.settingsRoot = '/settings'
    this.routes = props.selectUserType === 'licensee' || props.selectUserType === 'full_scheduling_admin' ? [
      {
        component: CustomerBilling,
        index: true,
        path: `${this.settingsRoot}/customer-billing`,
        title: 'Default Customer Billing'
      },
      // {
      //   component: StaffPayroll,
      //   path: `${this.settingsRoot}/staff-payroll`,
      //   title: 'Default Staff Payroll'
      // },
      {
        hide: props.isPartialAdmin,
        component: Services,
        path: `${this.settingsRoot}/services`,
        title: 'Services'
      },
      {
        hide: props.isPartialAdmin,
        component: Addons,
        path: `${this.settingsRoot}/addons`,
        title: 'Add-ons'
      },
      // {
      //   component: BusinessHours,
      //   path: `${this.settingsRoot}/business-hours`,
      //   title: 'Business Hours'
      // },
      {
        component: SchedulerSettings,
        path: `${this.settingsRoot}/scheduler`,
        title: 'Scheduler'
      }
      // {
      //   component: GPSMap,
      //   path: `${this.settingsRoot}/gps-map`,
      //   title: 'GPS Map'
      // },
      // {
      //   component: LateAlerts,
      //   path: `${this.settingsRoot}/late-alerts`,
      //   title: 'Late Alerts'
      // }
    ] : [
      {
        hide: props.isPartialAdmin,
        component: Services,
        path: `${this.settingsRoot}/services`,
        index: true,
        title: 'Services'
      },
      {
        hide: props.isPartialAdmin,
        component: Addons,
        path: `${this.settingsRoot}/addons`,
        title: 'Add-ons'
      },
      {
        component: SchedulerSettings,
        path: `${this.settingsRoot}/scheduler`,
        title: 'Scheduler'
      }
    ]

    this.routerRoutes = this.routes.filter(r => !r.hide).map((route, i) => <Route key={i} path={route.path} component={route.component} />)
  }
  componentDidMount () {
    appController.actions.openSideBar()
  }
  render () {
    const { selectUserType } = this.props
    return <div id='Settings'>
      <div className='settings-inner'>
        <NavTab id='Settings-NavTab' routes={this.routes.filter(r => !r.hide)} />
        <SectionBody>
          {(selectUserType === 'licensee' || selectUserType === 'full_scheduling_admin')
            ? <Route exact path={this.settingsRoot} component={CustomerBilling} />
            : <Route exact path={this.settingsRoot} component={Services} />}
          {this.routerRoutes}
        </SectionBody>
      </div>
    </div>
  }
}

const mapStateToProps = (state) => {
  const selectUserType = sessionController.selectUserType(state)
  return {
    selectUserType,
    isPartialAdmin: sessionController.isPartialAdmin(state)
  }
}

export default withRouter(connect(mapStateToProps, null)(Settings))
