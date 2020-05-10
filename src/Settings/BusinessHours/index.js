// Libraries
import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { reduxForm } from 'redux-form'

// Components
import Holidays from './sections/Holidays'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionHeader from 'GlobalComponents/SectionHeader'
import NavTab from 'Web/navigation/NavTab'
import WorkingHours from './sections/WorkingHours'

// Styles
import './index.css'

class BusinessHours extends React.Component {
  render () {
    let {
      match
    } = this.props

    let businessHoursRoot = match.path

    let routes = [
      {
        component: WorkingHours,
        index: true,
        path: `${businessHoursRoot}/working-hours`,
        title: 'Working Hours'
      },
      {
        component: Holidays,
        path: `${businessHoursRoot}/holidays`,
        title: 'Holidays'
      }
    ]

    return <div id='BusinessHours' className='settings-section'>
      <SectionHeader title='Business Hours' skinny />
      <div className='full-width-section'>
        <NavTab routes={routes} paddingBottom />
      </div>
      <Route exact path={businessHoursRoot} component={WorkingHours} />
      {routes.map((route, i) => <Route key={i} path={route.path} component={route.component} />)}
      <SaveCancel saveOnClick={() => console.log('save')} cancelOnClick={() => console.log('cancel')} />
    </div>
  }
}

const form = reduxForm({
  form: 'Settings/BusinessHours'
})

export default withRouter(connect()(form(BusinessHours)))
