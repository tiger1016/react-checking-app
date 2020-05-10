// Libraries
import React from 'react'
import { Route } from 'react-router-dom'

// Components
import Alerts from 'Web/Alerts'
// import WalkerPayroll from 'Web/walkerPayroll'
// import Payroll from 'Web/Payroll'
import Profile from 'Web/Profile'
import Scheduler from 'Web/Scheduler'
import Customer from 'Web/Customer'
import Customers from 'Web/Customers'
import Dashboard from 'Web/Dashboard'
import Messages from 'Web/Messages'
import Walker from 'Web/Walker'
import Walkers from 'Web/Walkers'
import Settings from 'Web/Settings'

export default class WalkerRoutes extends React.Component {
  render () {
    return <div id='Routes'>
      <Route exact path='/' component={Dashboard} />
      <Route path='/alerts(.*)' component={Alerts} />
      {/* <Route path='/payroll' component={WalkerPayroll} /> */} {/* WalkerPayroll did not work */}
      {/* <Route path='/payroll' component={Payroll} /> */}
      <Route path='/profile' component={Profile} />
      <Route path='/scheduler' component={Scheduler} />

      <Route path='/customer/:id' component={Customer} />
      <Route path='/customers' component={Customers} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/messages' component={Messages} />
      <Route path='/scheduler/walker/:id' component={Scheduler} />
      <Route path='/your-account/qr-codes' render={() => <div>ORDER MORE QR CODES</div>} />
      <Route path='/walker/:id' component={Walker} />
      <Route path='/walkers' component={Walkers} />
      <Route path='/settings' component={Settings} />
    </div>
  }
}
