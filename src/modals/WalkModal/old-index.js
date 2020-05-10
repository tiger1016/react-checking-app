// Libraries
import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'

// Controllers
import {
  appController,
  walksController
} from 'Controllers'

// Components
import EditOrAddWalk from './components/EditOrAddWalk'
import History from './components/History'
import MapAndPhotos from './components/MapAndPhotos'

// Styles
import './index.css'

class WalkModal extends React.Component {
  constructor () {
    super()
    this.detailsTabTitle = 'details'
    this.mapAndPhotosTabTitle = 'map&photos'
    this.historyTabTitle = 'history'
    this.state = {
      activeTab: this.detailsTabTitle
    }
  }
  componentWillMount () {
    let {
      app
    } = this.props

    if (walksController.getStatus(app.modal.data.walk) === 'in_process' ||
      walksController.getStatus(app.modal.data.walk) === 'completed') {
      this.setState({ activeTab: this.mapAndPhotosTabTitle })
    }
  }
  closeModal = () => appController.closeModal()
  isEditModal = () => this.props.app.modal.identifier === appController.constants.EDIT_WALK_MODAL_IDENTIFIER
  renderContent = () => {
    let {
      app,
      customers
    } = this.props
    let {
      activeTab
    } = this.state
    if (this.isEditModal()) {
      var walk = app.modal.data.walk
      var customer = _.find(customers.customers, c => Number(c.customer_id) === Number(walk.customer.id))
      var customerAddress = customer ? `${customer.address ? customer.address : ''}${customer.address2 ? (' ' + customer.address2) : ''}${customer.city ? (' ' + customer.city) : ''}${customer.zip ? (' ' + customer.zip) : ''}` : ''
      var customerName = walk.customer.name || 'Unidentified customer'
    }
    let title = !this.isEditModal() ? 'Create an Appointment' : customerName + ', ' + (walk.requested_time ? moment(walk.requested_time).format('MM/DD/YYYY @hA') : 'No time scheduled') + ', ' + customerAddress
    switch (activeTab) {
      case this.detailsTabTitle:
        return <EditOrAddWalk canCloseModal={this.props.canCloseModal} isEditModal={this.isEditModal} title={title} />
      case this.mapAndPhotosTabTitle:
        return <MapAndPhotos isEditModal={this.isEditModal} />
      case this.historyTabTitle:
        return <History isEditModal={this.isEditModal} />
    }
    return null
  }
  showTab = activeTab => this.setState({ activeTab })
  render () {
    let { app } = this.props

    let { activeTab } = this.state

    // if (this.isEditModal()) {
    //   var walk = app.modal.data.walk
    //   var customer = _.find(customers.customers, c => Number(c.customer_id) === Number(walk.customer.id))
    // }

    return <div id='WalkModal'>
      {!this.isEditModal() ? null : <div className='details-header'>
        <button className={`details-button${activeTab === 'details' ? ' active' : ''}`}
          onClick={() => this.showTab(this.detailsTabTitle)}>
          Scheduling
        </button>
        {walksController.getStatus(app.modal.data.walk) === 'in_process' || walksController.getStatus(app.modal.data.walk) === 'completed' ? <button className={`details-button${activeTab === 'map&photos' ? ' active' : ''}`}
          onClick={() => this.showTab(this.mapAndPhotosTabTitle)}>
          Summary
        </button> : null}
        <button className={`details-button${activeTab === 'history' ? ' active' : ''}`}
          onClick={() => this.showTab(this.historyTabTitle)}>
          History
        </button>
      </div>}
      {this.renderContent()}
    </div>
  }
}

let mapStateToProps = state => {
  return {
    app: state.app,
    customers: state.customers
  }
}

export default connect(mapStateToProps)(WalkModal)
