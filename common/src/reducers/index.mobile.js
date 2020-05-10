// Libraries
import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// Reducers
import addons from './addons-reducer'
import alerts from './alerts-reducer'
import app from './app-reducer'
import credits from './credits-reducer'
import customers from './customers-reducer'
import dashboard from './dashboard'
import invoices from './invoices-reducer'
import maps from './maps-reducer'
import network from './network-reducer'
import payments from './payments-reducer'
import pets from './pets-reducer'
import photos from './photos-reducer'
import profile from './profile-reducer'
import refunds from './refunds-reducer'
import scheduler from './scheduler-reducer'
import services from './services-reducer'
import session from './session-reducer'
import settings from './settings-reducer'
import toastr from './toastr-reducer'
import walkers from './walkers-reducer'
import walks from './walks-reducer'
import reports from './reports'
import routerReducer from './route-reducer'
import payrolls from './payroll-reducer'

export default combineReducers({
  addons,
  alerts,
  app,
  credits,
  customers,
  dashboard,
  form: formReducer,
  invoices,
  maps,
  network,
  payments,
  pets,
  photos,
  profile,
  refunds,
  routerReducer,
  scheduler,
  services,
  session,
  settings,
  walkers,
  walks,
  toastr,
  reports,
  payrolls
})
