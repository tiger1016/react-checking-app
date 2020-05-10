// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { View } from 'react-native'

// Controllers
import { appController, sessionController } from '../../controllers'

// Actions
import deleteAlerts from 'Actions/alerts/deleteAlerts'
import fetchAlerts from 'Actions/alerts/fetchAlerts'

// Components
// import Button from '../globalComponents/Button'
// import CenteredTextNotify from '../globalComponents/CenteredTextNotify'
// import CustomForm from '../globalContainers/input/CustomForm'
// import Loader from '../globalComponents/Loader'
import NavSelect from '../navigation/NavSelect'
import SectionHeader from '../globalComponents/SectionHeader'
import CustomTable from '../globalComponents/CustomTable'
import CenteredTextNotify from '../globalComponents/CenteredTextNotify'
// import PaginationElement, { paginate } from '../globalComponents/PaginationElement'
// import SectionHeader from '../globalComponents/SectionHeader'
// import TableInputGroup from '../globalComponents/input/TableInputGroup'

// Styles
// import './index.css'
import styles from './styles'
class Alerts extends React.Component {
  constructor () {
    super()
    this.state = {
      checkedAlerts: [],
      currentPage: 1,
      pageSize: 24
    }
  }

  componentWillMount () {
    this.props.fetchAlerts()
  }

  componentDidMount () {
    appController.actions.openSideBar()
  }

  /**
   * Fires when the delete actin (trash icon) is pressed
   * @param  {Number} id Id of current alert
   * @return {Void}
   */
  deleteActionClicked = id => {
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        format: 'confirm-delete',
        onConfirm: () => { this.deleteAlert(id); appController.closeAlert() },
        onCancel: () => appController.closeAlert(),
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        text: 'Are you sure you want to delete this alert?',
        type: 'warning'
      }
    })
  }

  /**
   * Deletes an alert by id
   * @param  {[Number} alertId Alert id
   * @return {Void}
   */
  deleteAlert (alertIds) {
    this.props.deleteAlerts(alertIds || [], () => {
      this.setState({ checkedAlerts: [] }, () => {
        this.props.fetchAlerts()
      })
    })
  }

  /**
   * Delete all alerts of logged user
   * @return {Void}
   */
  deleteAllAlerts = () => {
    let _alertIds = []
    _alertIds = this.selectAlerts(this.props.alerts, this.props.pathname).map(item => item.id)
    this.deleteAlert(_alertIds.join(','))
  }

  /**
   * [description]
   * @return {[type]} [description]
   */
  deleteAllAlertsClicked = () => {
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        format: 'confirm-delete',
        onConfirm: () => { this.deleteAllAlerts(); appController.closeAlert() },
        onCancel: () => appController.closeAlert(),
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        text: 'Are you sure you want to delete all alerts?',
        type: 'warning'
      }
    })
  }

  /**
   * Deletes only selected alerts
   * @return {Void}
   */
  deleteSelectedAlerts = () => {
    this.deleteAlert(this.state.checkedAlerts.join(','))
  }

  /**
   * [description]
   * @return {[type]} [description]
   */
  deleteSelectedAlertsClicked = () => {
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        format: 'confirm-delete',
        onConfirm: () => { this.deleteSelectedAlerts(); appController.closeAlert() },
        onCancel: () => appController.closeAlert(),
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        text: 'Are you sure you want to delete selected alerts?',
        type: 'warning'
      }
    })
  }

  /**
   * Routes (items) on the filter nav bar
   * @return {Array} Routes array
   */
  filterNavRoutes = () => [
    {
      index: true,
      path: `/alerts/all-alerts`,
      title: 'All'
    },
    {
      path: `/alerts/late-alerts`,
      title: 'Late'
    },
    {
      path: `/alerts/customer-request-alerts`,
      title: 'Customer'
    },
    {
      path: `/alerts/credit-card-alerts`,
      title: 'Credit Card'
    }
  ]

  /**
   * Right button group component for the header
   * @return {React.Component} Button group component
   */
  headerRight = () => {
    if (this.props.selectUserType === 'customer') {
      return <div className='main-buttons-wrapper'>
        {/* <Button onClick={this.deleteSelectedAlertsClicked} text='Delete Selected' round />
        <Button onClick={this.deleteAllAlertsClicked} text='Manage Alerts' round /> */}
      </div>
    } else {
      return <div className='main-buttons-wrapper'>
        {/* <Button onClick={this.deleteSelectedAlertsClicked} text='Delete Selected' round />
        <Button onClick={this.deleteAllAlertsClicked} text='Delete All Alerts' round /> */}
      </div>
    }
  }

  /**
   * Checks if an alert id has been checked
   * @param  {Number} id Alert id
   * @return {Bool}      True if checked, false otherwise
   */
  isChecked = id => {
    return this.state.checkedAlerts.indexOf(Number(id)) > -1
  }

  /**
   * Select (show) only alerts of certain type
   * @param  {Object} alerts   Alerts object as stored in store or returned from api
   * @param  {String} pathname Alert type to select
   * @return {Array}           Array with alerts of pathname type
   */
  selectAlerts = (alerts = {}, pathname = '') => {
    switch (pathname) {
      case '/alerts/late-alerts':
        return alerts.late || []
      case '/alerts/customer-request-alerts':
        return alerts.customer_requests || []
      case '/alerts/credit-card-alerts':
        return alerts.credit_card || []
      default:
        return alerts.total || []
    }
  }

  /**
   * Populates table rows
   * @param  {Array}  fields Array of data that goes in each row
   * @return {Object}        Table data object
   */
  tableRows = (fields = []) => {
    return fields.map((row, i) => {
      return {
        columns: [
          { width: '28px', type: 'checkbox', checked: this.isChecked(row.id), onChange: () => this.toggleCheckedAlert(row.id) },
          { width: '54px', type: 'text', value: row.date },
          { width: '108px', type: 'text', value: row.time },
          { type: 'text', value: row.message },
          { width: '58px', type: 'icon-button', name: 'archive-1', icon: 'ion-trash-b', contentAlign: 'center', onClick: () => this.deleteActionClicked(row.id) }
        ]
      }
    })
  }

  /**
   * Checks and unchecks alerts on table
   * @param  {Number} id Id of alert to check or uncheck
   * @return {Void}
   */
  toggleCheckedAlert = id => {
    const indexOfTargetAlert = this.state.checkedAlerts.indexOf(Number(id))
    const checkedAlerts = this.state.checkedAlerts.slice()
    if (indexOfTargetAlert > -1) {
      checkedAlerts.splice(indexOfTargetAlert, 1)
    } else {
      checkedAlerts.push(id)
    }
    this.setState({ checkedAlerts })
  }

  render () {
    const {
      alerts,
      alertsIsLoading,
      pathname
    } = this.props

    // let {
    //   currentPage,
    //   pageSize
    // } = this.state

    const routes = this.filterNavRoutes()

    // if (!alertsIsLoading && alertsController.noAlerts(alerts)) {
    //   return <div id='Alerts' className='empty'>
    //     <SectionHeader title='Alerts' bigBottomPadding />
    //     <CenteredTextNotify icon='ion-ios-checkmark' text='You have no alerts.' />
    //   </div>
    // }

    const selectedAlerts = this.selectAlerts(alerts, pathname).map(a => {
      return {
        ...a,
        date: moment(a.ts).format('MM/DD/YY'),
        time: moment(a.ts).format('h:mm a')
      }
    })
    // if (selectedAlerts.length === 0) {
    //   selectedAlerts.push({date: moment().format('MM/DD/YY'), time: moment().format('h:mm a'), message: 'test'})
    // }
    // let totalPages = Math.ceil(selectedAlerts.length / pageSize)

    // selectedAlerts = paginate(selectedAlerts, pageSize, currentPage)

    return <View style={styles.Alert}>
      <NavSelect routes={routes} pathname={this.props.pathname} history={this.props.history} />
      <SectionHeader bigBottomPadding title='Alerts' />
      {(alertsIsLoading || selectedAlerts.length > 0) && <CustomTable
        data={selectedAlerts}
        style={styles.alertsTable}
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: () => this.openPayrollDetailModal(rowInfo.original)
        })}
        loading={alertsIsLoading}
        columns={[
          {
            accessor: 'date',
            className: 'text strong',
            id: 'date',
            label: 'DATE',
            width: 110
          },
          {
            accessor: 'time',
            className: 'text',
            label: 'TIME',
            width: 110
          },
          {
            accessor: 'message',
            id: 'message',
            className: 'text',
            label: 'DESCRIPTION',
            width: 180
          }
        ]
        }
      />}
      {!alertsIsLoading && selectedAlerts.length === 0 && <CenteredTextNotify icon='ios-checkmark-circle' text={`You have no alerts.`} />}
      {/* <NavTab routes={routes} pathname={this.props.pathname} history={this.props.history} /> */}
      {/* <SectionHeader title='Alerts'  />
      {alertsIsLoading ? <div className='alertLoading'><Loader /></div> : this.props.selectUserType === 'customer' ? null : <NavTab routes={routes} />}
      {alertsIsLoading || selectedAlerts.length === 0 ? null : <SectionHeader emptyTitle rightComponent={this.headerRight()} />}
      {alertsIsLoading || selectedAlerts.length === 0 ? null : <CustomForm>
        <TableInputGroup
          headerRow={[
            { width: '28px', type: 'header-text', value: '' },
            { width: '54px', type: 'header-text', value: 'DATE' },
            { width: '108px', type: 'header-text', value: 'TIME' },
            { type: 'header-text', value: 'DESCRIPTION' },
            { width: '58px', type: 'header-text', value: 'ACTIONS' }
          ]}
          rows={this.tableRows(selectedAlerts)}
        />

      </CustomForm>}
      {!alertsIsLoading && !selectedAlerts.length && <div id='Alerts' className='empty'>
        <CenteredTextNotify icon='ion-ios-checkmark' text={`You have no ${pathname.split('/')[2].replace(/-/g, ' ')}.`} />
      </div>}
      {alertsIsLoading || selectedAlerts.length === 0 ? null : <div className='pagination-container'>
        <PaginationElement onPageChange={currentPage => this.setState({ currentPage })} totalPages={totalPages} />
      </div>} */}
    </View>
  }
}

const mapStateToProps = state => {
  const selectUserType = sessionController.selectUserType(state)
  return {
    alerts: state.alerts.alerts,
    alertsIsLoading: state.alerts.loading,
    selectUserType
  }
}

const mapDispatchToProps = {
  deleteAlerts,
  fetchAlerts
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
