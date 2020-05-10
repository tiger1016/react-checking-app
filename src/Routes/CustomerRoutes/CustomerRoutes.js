// Libraries
import React from 'react'
import { Route } from 'react-router-dom'

// Components
import Alerts from 'Web/Alerts'
import Scheduler from 'Web/Scheduler'
import CustomerPaymentCenter from 'Web/customerPaymentCenter'
import CustomerPhotoGalary from 'Web/customerPhotoGalary'
import Settings from 'Web/Settings'
import Profile from 'Web/Profile'

export default class CustomerRoutes extends React.Component {
  render () {
    return <div id='Routes'>
      <Route exact path='/' component={Scheduler} />
      <Route path='/alerts' component={Alerts} />
      <Route path='/scheduler' component={Scheduler} />
      <Route path='/paymentCenter' component={CustomerPaymentCenter} />
      <Route path='/photoGalary' component={CustomerPhotoGalary} />
      <Route path='/settings' component={Settings} />
      <Route path='/profile' component={Profile} />
    </div>
  }
}
