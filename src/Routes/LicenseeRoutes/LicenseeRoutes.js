// Libraries
import React from 'react'
import { Route, withRouter } from 'react-router-dom'

// Components
import Alerts from 'Web/Alerts'
import Customer from 'Web/Customer'
import Customers from 'Web/Customers'
import Dashboard from 'Web/Dashboard'
import Invoices from 'Web/Invoices'
import Messages from 'Web/Messages'
import Payroll from 'Web/Payroll'
import Profile from 'Web/Profile'
import Reports from 'Web/Reports'
import Scheduler from 'Web/Scheduler'
import Settings from 'Web/Settings'
import Walker from 'Web/Walker'
import Walkers from 'Web/Walkers'

class LicenseeRoutes extends React.Component {
  OrderMoreQrCodes = () => <div>ORDER MORE QR CODES</div>

  render () {
    return <div id='Routes'>
      <Route exact path='/' component={Dashboard} />
      <Route path='/alerts(.*)' component={Alerts} />
      <Route path='/customer/:id' component={Customer} />
      <Route path='/customers' component={Customers} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/invoices' component={Invoices} />
      <Route path='/payroll' component={Payroll} />
      <Route path='/profile' component={Profile} />
      <Route path='/messages' component={Messages} />
      <Route path='/reports' component={Reports} />
      <Route path='/scheduler' component={Scheduler} />
      <Route path='/scheduler/walker/:id' component={Scheduler} />
      <Route path='/your-account/qr-codes' render={this.OrderMoreQrCodes} />
      <Route path='/settings' component={Settings} />
      <Route path='/walker/:id' component={Walker} />
      <Route path='/walkers' component={Walkers} />
    </div>
  }
}

export default withRouter(LicenseeRoutes)
