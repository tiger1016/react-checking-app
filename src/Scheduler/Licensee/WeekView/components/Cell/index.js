// Libraries
import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import { connect } from 'react-redux'

// Components
import Appointment from '../Appointment'

// Styles
import './index.css'

class Cell extends React.Component {
  appointments () {
    let {
      columnId,
      rowId,
      services,
      walks
    } = this.props
    if (walks) {
      return walks.map(walk => {
        let service = _.find(services.services, o => Number(o.id) === Number(walk.billing_price_group_id))
        var length = 0
        if (service) {
          length = moment.duration(service.length).asMinutes()
        }
        return <Appointment
          columnId={columnId}
          key={`appintment-${walk.walk_id}`}
          rowId={rowId}
          walk={{ ...walk, length }}
          walkCount={walks.length}
          walkId={walk.walk_id}
        />
      })
    }
    return <Appointment empty />
  }
  render () {
    let {
      cellId
    } = this.props
    return <div id={`cell-${cellId}`} className='grid-cell'>
      {this.appointments()}
    </div>
  }
}

const mapStateToProps = state => {
  return {
    services: state.services
  }
}

export default connect(mapStateToProps)(Cell)
