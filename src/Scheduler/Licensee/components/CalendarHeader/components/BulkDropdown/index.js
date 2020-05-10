// Libraries
import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'

// Controllers
import {
  appController,
  schedulerController,
  walksController
} from 'Controllers'

// Styles
import './index.css'

class BulkDropdown extends React.Component {
  constructor () {
    super()
    this.defaultSelection = { value: 'title', label: 'Bulk Actions' }
    this.state = {
      selected: this.defaultSelection
    }
  }
  onChange = selected => {
    let {
      bulkList,
      bulkListLength,
      walks
    } = this.props

    walksController.findFirstInIds(walks, bulkList)
    this.setState({ selected }, () => {
      if (this.state.selected.value === 'delete') {
        if (bulkListLength > 1) {
          appController.actions.toggleAlert({
            alertIsVisible: true,
            alertData: {
              type: 'info',
              confirmButtonText: `Cancel ${bulkListLength} walks`,
              onConfirm: () => {
                walksController.actions.cancelWalks(bulkList)
                appController.closeAlert()
              },
              showCancelButton: false,
              title: `Are you sure you want to cancel ${bulkListLength} walks?`,
              text: '',
              onKeyDown: e => appController.closeAlert()
            }
          })
        } else {
          let walk = walksController.findFirstInIds(walks, bulkList)
          appController.actions.toggleAlert({
            alertIsVisible: true,
            alertData: {
              type: 'info',
              confirmButtonText: 'All walks',
              onConfirm: () => {
                walksController.actions.cancelWalk(walk.walk_id, true)
                appController.closeAlert()
              },
              cancelButtonText: 'Only this walk',
              onCancel: () => {
                walksController.actions.cancelWalk(walk.walk_id, false)
                appController.closeAlert()
              },
              showCancelButton: true,
              title: 'Cancel all walks in this series or just this walk?',
              text: '',
              onKeyDown: e => appController.closeAlert()
            }
          })
        }
        this.setState({ selected: this.defaultSelection })
      } else if (this.state.selected.value === 'select') {
        schedulerController.actions.selectAllWalks(true)
      } else if (this.state.selected.value === 'clear') {
        this.setState({ selected: this.defaultSelection }, () => {
          schedulerController.actions.clearBulkList()
          schedulerController.actions.selectAllWalks(false)
        })
      }
    })
  }
  render () {
    let {
      selected
    } = this.state
    return <div id='BulkDropdown'>
      <Select
        className='BulkDropdown scheduler-select'
        name='bulkDropdown'
        value={selected.value}
        clearable={false}
        options={[
          { value: 'title', label: 'Bulk Actions' },
          { value: 'delete', label: 'Delete Selected' },
          { value: 'select', label: 'Select Visible' },
          { value: 'clear', label: 'Clear Selection' }
        ]}
        onChange={this.onChange}
      />
    </div>
  }
}

const mapStateToProps = state => {
  return {
    bulkList: state.scheduler.bulkList,
    bulkListLength: state.scheduler.bulkList.length,
    walks: state.walks.walks
  }
}

export default connect(mapStateToProps)(BulkDropdown)
