// Libraries
import React from 'react'

// Styles
import './index.css'

export default class Footer extends React.Component {
  render () {
    return <div id='Footer'>
      <span className='copyright-2011-201'>&copy; Copyright 2011-2017 Petcheck Technology</span>
      <span className='dashboard-schedule'>
          Dashboard &nbsp; | &nbsp; Scheduler &nbsp; | &nbsp; Alerts &nbsp;
          | &nbsp; Customers &nbsp; | &nbsp; Staff &nbsp; | &nbsp; Business Center
      </span>
    </div>
  }
}
