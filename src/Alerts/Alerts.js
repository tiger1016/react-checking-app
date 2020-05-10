// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

// Controllers
import { alertsController } from 'Controllers/alertsController'
import { appController } from 'Controllers/appController'
import { sessionController } from 'Controllers/sessionController'

// Actions
import deleteAlerts from 'Actions/alerts/deleteAlerts'
import fetchAlerts from 'Actions/alerts/fetchAlerts'
import fetchWalkDetail from 'Actions/walks/fetchWalkDetail'
import openSideBar from 'Actions/app/openSideBar'
import setReadAlert from 'Actions/alerts/setReadAlert'
import toggleAlert from 'Actions/app/toggleAlert'
import toggleModal from 'Actions/app/toggleModal'

// Components
import Button from 'GlobalComponents/Button'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'
import CustomForm from '../globalContainers/input/CustomForm'
import Loader from 'GlobalComponents/Loader'
import NavTab from 'GlobalComponents/navigation/NavTab'
import PaginationElement, { paginate } from 'GlobalComponents/PaginationElement'
import SectionHeader from 'GlobalComponents/SectionHeader'
import TableInputGroup from 'GlobalComponents/input/TableInputGroup'

// Styles
import './index.css'

class Alerts extends React.Component {
  state = {
    checkedAlerts: [],
    currentPage: 1,
    pageSize: 24,
    walkDetailLoading: false
  }

  componentDidMount () {
    const {
      fetchAlerts,
      openSideBar
    } = this.props
    fetchAlerts()
    openSideBar()
  }

  deleteActionClicked = id => () => {
    const { toggleAlert } = this.props
    toggleAlert({
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

  deleteAlert (alertIds) {
    const { deleteAlerts, fetchAlerts } = this.props
    deleteAlerts(alertIds || [], () => {
      this.setState({ checkedAlerts: [] }, () => {
        fetchAlerts()
      })
    })
  }

  deleteAllAlerts = () => {
    const { alerts, location: { pathname } } = this.props
    const alertIds = this.selectAlerts(alerts, pathname).map(item => item.id)
    this.deleteAlert(alertIds.join(','))
  }

  deleteAllAlertsClicked = () => {
    const { toggleAlert } = this.props
    toggleAlert({
      alertIsVisible: true,
      alertData: {
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
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

  deleteSelectedAlerts = () => this.deleteAlert(this.state.checkedAlerts.join(','))

  deleteSelectedAlertsClicked = () => {
    const { toggleAlert } = this.props
    const { checkedAlerts } = this.state
    if (checkedAlerts.length > 0) {
      toggleAlert({
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
  }

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

  headerRight = () => {
    const { selectUserType } = this.props
    const { checkedAlerts } = this.state
    if (selectUserType === 'customer') {
      return <div className='main-buttons-wrapper'>
        <Button disabled={checkedAlerts <= 0} onClick={this.deleteSelectedAlertsClicked} text='Delete Selected' round />
        <Button onClick={this.deleteAllAlertsClicked} text='Manage Alerts' round />
      </div>
    }
    return <div className='main-buttons-wrapper'>
      <Button disabled={checkedAlerts <= 0} onClick={this.deleteSelectedAlertsClicked} text='Delete Selected' round />
      <Button onClick={this.deleteAllAlertsClicked} text='Delete All Alerts' round />
    </div>
  }

  isChecked = id => this.state.checkedAlerts.indexOf(Number(id)) > -1

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

  tableRows = (fields = []) => {
    return fields.map((row, i) => {
      return {
        columns: [
          { width: '28px', type: 'checkbox', checked: this.isChecked(row.id), onChange: this.toggleCheckedAlert(row.id), unread: row.unread },
          { width: '54px', type: 'text', value: row.date, unread: row.unread },
          { width: '108px', type: 'text', value: row.time, unread: row.unread },
          { type: 'text', value: row.message, clickable: row.walk_id, onClick: this.openWalkDetail(row.walk_id, row.id, row.unread), unread: row.unread },
          { width: '58px', type: 'icon-button', name: 'archive-1', icon: 'ion-trash-b', contentAlign: 'center', onClick: this.deleteActionClicked(row.id), unread: row.unread }
        ]
      }
    })
  }

  openWalkDetail = (walkId, alertId, unread) => e => {
    const {
      fetchWalkDetail,
      setReadAlert,
      toggleModal,
      walks
    } = this.props

    e.stopPropagation()

    if (unread) {
      setReadAlert(alertId)
    }

    if (walkId) {
      const walk = walks.find(item => Number(item.walk_id) === Number(walkId))
      if (walk) {
        toggleModal({
          modalIdentifier: appController.constants.EDIT_WALK_MODAL_IDENTIFIER,
          canClose: true,
          isOpen: true,
          data: { walk }
        })
      }

      this.setState({ walkDetailLoading: true })
      fetchWalkDetail(walkId, (err, walks) => {
        this.setState({ walkDetailLoading: false }, () => {
          if (!err && walks && walks.length > 0) {
            toggleModal({
              modalIdentifier: appController.constants.EDIT_WALK_MODAL_IDENTIFIER,
              canClose: true,
              isOpen: true,
              data: { walk: walks[0] }
            })
          }
        })
      })
    }
  }

  toggleCheckedAlert = id => () => {
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
      location: { pathname }
    } = this.props
    const {
      currentPage,
      pageSize,
      walkDetailLoading
    } = this.state

    const routes = this.filterNavRoutes()

    if (!alertsIsLoading && alertsController.noAlerts(alerts)) {
      return <div id='Alerts' className='empty'>
        <SectionHeader title='Alerts' bigBottomPadding />
        <CenteredTextNotify icon='ion-ios-checkmark' text='You have no alerts.' />
      </div>
    }

    let selectedAlerts = this.selectAlerts(alerts, pathname).map(a => {
      return {
        ...a,
        date: moment(a.ts).format('MM/DD/YY'),
        time: moment(a.ts).format('h:mm a')
      }
    })

    const totalPages = Math.ceil(selectedAlerts.length / pageSize)
    selectedAlerts = paginate(selectedAlerts, pageSize, currentPage)

    return (
      <div id='Alerts'>
        <SectionHeader title='Alerts' />
        {alertsIsLoading || walkDetailLoading ? <div className='alertLoading'><Loader /></div> : this.props.selectUserType !== 'customer' && <NavTab routes={routes} />}
        {!alertsIsLoading && selectedAlerts.length > 0 && <SectionHeader emptyTitle rightComponent={this.headerRight()} />}
        {!alertsIsLoading && selectedAlerts.length > 0 && <CustomForm>
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
        {!alertsIsLoading && selectedAlerts.length > 0 && <div className='pagination-container'>
          <PaginationElement onPageChange={currentPage => this.setState({ currentPage })} totalPages={totalPages} />
        </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const selectUserType = sessionController.selectUserType(state)
  return {
    alerts: state.alerts.alerts,
    alertsIsLoading: state.alerts.loading,
    selectUserType,
    walks: state.walks.walks
  }
}

const mapDispatchToProps = {
  deleteAlerts,
  fetchAlerts,
  fetchWalkDetail,
  openSideBar,
  setReadAlert,
  toggleAlert,
  toggleModal
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Alerts))
