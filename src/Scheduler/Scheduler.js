// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// Components
import Licensee from './Licensee'
import CustomerAndStaff from './CustomerAndStaff'

// Controllers
import { appController, sessionController } from 'Controllers'

// Scheduler Styles
import 'react-select/dist/react-select.css'
import 'rc-slider/assets/index.css'
import './datePicker.css'
import './index.css'

// user_type of 2 is a licensee, 4 is a walker, and 5 is a pet owner/customer

class Scheduler extends React.PureComponent {
  componentWillMount () {
    appController.actions.closeSideBar()
  }
  render () {
    const { userType } = this.props
    return (
      <div className='sheduler-container-firefox'>
        <div id='Scheduler'>
          {userType === 'licensee' || userType === 'scheduling_admin' || userType === 'full_scheduling_admin' ? <Licensee /> : <CustomerAndStaff />}
        </div>
      </div>
    )
  }
}

Scheduler.propTypes = {
  userType: PropTypes.string.isRequired
}

const mapStateToProps = state => {
  const userType = sessionController.selectUserType(state)
  return { userType }
}

export default connect(mapStateToProps)(Scheduler)
