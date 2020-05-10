// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

// Styles
import './index.css'

// Components
import Button from 'GlobalComponents/Button'
import NavTab from 'GlobalComponents/navigation/NavTab'
import ActionsComponent from './components/ActionsComponent'
import OutstandingComponent from './components/OutstandingComponent'
import Filterbar from './components/Filterbar'
import SectionHeader from 'GlobalComponents/SectionHeader'
import CustomTable from 'GlobalComponents/CustomTable'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'

// Controllers
import { appController } from 'Controllers/appController'

// Util
import { utility } from 'Utils/utility'

// Actions
import deleteInvoices from 'Actions/invoices/deleteInvoices'
import fetchLicenseeInvoices from 'Actions/invoices/fetchLicenseeInvoices'
import sendInoicesToSelected from 'Actions/invoices/sendInoicesToSelected'

export class Invoices extends Component {
  state = {
    clickedInvoice: {},
    endDate: null,
    isCreateInvoiceModalOpen: false,
    isReciveInvoiceModalOpen: false,
    isDetailInvoiceModalOpen: false,
    searchText: '',
    selectedInvoices: [],
    startDate: null,
    statusmodalsOpen: false,
    currentFilteringStatus: null
  }

  componentWillMount () {
    const { location: { pathname } } = this.props

    if (pathname.indexOf('/invoices/') !== -1) {
      const status = pathname.includes('all') ? null : pathname.replace('/invoices/', '')
      this.filteringStatusChanged(status)
    } else {
      this.filteringStatusChanged(null)
    }
  }

  componentDidMount () {
    appController.actions.openSideBar()
  }

  openNewInvoiceModal = e => {
    e.stopPropagation()
    appController.actions.toggleModal({
      canClose: true,
      data: { customer_id: undefined, invoiceId: null },
      isOpen: true,
      modalIdentifier: appController.constants.CREATE_INVOICE_MODAL_IDENTIFIER
    })
  }

  openReceivePaymentModal = e => {
    e.stopPropagation()
    appController.actions.toggleModal({
      canClose: true,
      data: null,
      isOpen: true,
      modalIdentifier: appController.constants.RECIVE_PAYMENT_MODAL_IDENTIFIER
    })
  }

  openInvoiceDetailModal = (invoice) => {
    appController.actions.toggleModal({
      canClose: true,
      data: { invoiceId: invoice.id },
      isOpen: true,
      modalIdentifier: appController.constants.INVOICE_DETAIL_MODAL_IDENTIFIER
    })
  }

  handleStartDateChange = startDate => {
    this.setState({ startDate }, this.fetchLicenseeInvoices)
  }

  handleEndDateChange = endDate => {
    this.setState({ endDate }, this.fetchLicenseeInvoices)
  }

  fetchLicenseeInvoices = () => {
    this.props.fetchLicenseeInvoices(this.state.startDate, this.state.endDate, this.state.currentFilteringStatus)
  }

  searchHandle = ({ target: { value: searchText } }) => this.setState({ searchText })

  filterSearch = val => {
    if (this.state.searchText === '') {
      return true
    } else {
      if (val.first_name.toUpperCase().includes(this.state.searchText.toUpperCase())) {
        return true
      } else if (val.last_name.toUpperCase().includes(this.state.searchText.toUpperCase())) {
        return true
      } else if (val.invoice_id.toString().includes(this.state.searchText.toUpperCase())) {
        return true
      }
    }
    return false
  }

  actionInvoice = (e, invoice, type) => {
    e.stopPropagation()
    const { deleteInvoices, sendInoicesToSelected } = this.props
    this.setState({ actionInvoice: invoice })
    switch (type) {
      case 'send':
        sendInoicesToSelected([invoice.id], this.sendSuccessCallback)
        break
      case 'delete':
        deleteInvoices([invoice.id], this.deleteSuccessCallback)
        break
      case 'payment':
        appController.actions.toggleModal({
          canClose: true,
          data: { custid: invoice.user_id, invoice_id: invoice.invoice_id, custName: invoice.first_name + ' ' + invoice.last_name },
          isOpen: true,
          modalIdentifier: appController.constants.RECIVE_PAYMENT_MODAL_IDENTIFIER
        })
        break
      default:
        break
    }
  }

  selectInvoice = ({ stopPropagation, target }) => {
    stopPropagation()
    const selectedInvoices = this.state.selectedInvoices.slice()
    if (selectedInvoices.indexOf(target.id) === -1 && target.checked) {
      selectedInvoices.push(target.id)
    } else {
      selectedInvoices.remove(target.id)
    }
    this.setState({ selectedInvoices })
  }

  selectall = ({ target }) => {
    if (target.checked) {
      const { invoices } = this.props
      const selectedInvoices = invoices.filter(this.filterSearch).filter(i => {
        if (target.id === 'all') return i
        return target.id === i.status
      }).map(i => i.id)
      this.setState({ selectedInvoices })
    }
  }

  selectedInvoicesAction = (event) => {
    const { deleteInvoices, sendInoicesToSelected } = this.props
    const { selectedInvoices } = this.state
    if (selectedInvoices && selectedInvoices.length > 0) {
      if (event === 2) {
        deleteInvoices(selectedInvoices, this.deleteSuccessCallback)
      } else if (event === 1) {
        sendInoicesToSelected(selectedInvoices, this.sendSuccessCallback)
      }
    } else {
      toast.error('No Invoice Selected !', { position: toast.POSITION.LEFT })
    }
  }

  deleteSuccessCallback = () => this.setState({ selectedInvoices: [] })
  sendSuccessCallback = () => this.setState({ selectedInvoices: [] })

  filteringStatusChanged = (status) => {
    this.setState({ currentFilteringStatus: status }, this.fetchLicenseeInvoices)
  }

  filterInvoicesRoutes = () => [
    {
      index: true,
      path: `/invoices/all`,
      title: 'All',
      onClick: () => {
        this.filteringStatusChanged(null)
      }
    },
    {
      path: `/invoices/unpaid`,
      title: 'Unpaid',
      onClick: () => {
        this.filteringStatusChanged('unpaid')
      }
    },
    {
      path: `/invoices/paid`,
      title: 'Paid',
      onClick: () => {
        this.filteringStatusChanged('paid')
      }
    }
  ]

  filterInvoices = (invoices = [], pathname = '') => {
    if (invoices.length > 0) {
      switch (pathname.toLowerCase()) {
        case '/invoices/unpaid':
          return invoices.filter(i => i.status === 'unpaid' || i.status === 'partial').filter(this.filterSearch)
        case '/invoices/paid':
          return invoices.filter(i => i.status === 'paid').filter(this.filterSearch)
        default:
          return invoices.filter(this.filterSearch)
      }
    }
    return []
  }

  filterInvoiceColumns = (pathname = '') => {
    switch (pathname.toLowerCase()) {
      case '/invoices/unpaid':
        return this.invoicesColumns.filter(item => (!item.paths || item.paths.indexOf('unpaid') !== -1))
      case '/invoices/paid':
        return this.invoicesColumns.filter(item => (!item.paths || item.paths.indexOf('paid') !== -1))
      default:
        return this.invoicesColumns.filter(item => (!item.paths || item.paths.indexOf('all') !== -1))
    }
  }

  invoicesColumns = [
    {
      accessor: 'date',
      className: 'text strong',
      id: 'date',
      label: 'DATE',
      maxWidth: 100,
      Cell: props => <span>{moment(props.value).format('MM/DD/YYYY')}</span>
    },
    {
      accessor: 'invoice_id',
      className: 'text',
      label: 'NUMBER',
      maxWidth: 90
    },
    {
      accessor: d => d.status.toUpperCase(),
      id: 'status',
      className: 'text',
      label: 'STATUS',
      maxWidth: 75,
      paths: ['all']
    },
    {
      accessor: d => (d.first_name + ' ' + d.last_name),
      id: 'staff_name',
      className: 'text',
      label: 'CUSTOMER'
    },
    {
      accessor: d => moment(d.date).format('MM/DD/YYYY'),
      id: 'due_date',
      className: 'text',
      label: 'DUE DATE',
      maxWidth: 100
    },
    {
      Cell: d => <NumberFormat value={d.original.paid ? d.original.paid : 0} displayType={'text'} thousandSeparator prefix={'$'} fixedDecimalScale decimalScale={2} />,
      id: 'paid',
      className: 'text',
      label: 'AMOUNT PAID',
      maxWidth: 120,
      paths: ['all', 'unpaid', 'paid']
    },
    {
      accessor: d => moment(d.ts).format('MM/DD/YYYY'),
      id: 'date_paid',
      className: 'text',
      label: 'DATE PAID',
      paths: ['paid'],
      maxWidth: 110
    },
    {
      Cell: d => {
        let outstanding = utility.parseFloatWithFixed(utility.parseFloatWithFixed(d.original.owed) - utility.parseFloatWithFixed(d.original.paid))
        outstanding = outstanding < 0 ? 0 : outstanding
        return <OutstandingComponent outstanding={utility.parseFloatWithFixed(outstanding, 2)} />
      },
      id: 'outstanding',
      className: 'text',
      label: 'AMOUNT DUE',
      paths: ['all', 'unpaid'],
      maxWidth: 120
    },
    // {
    //   accessor: d => moment().diff(moment(d.ts), 'days'),
    //   id: 'days_late',
    //   className: 'text',
    //   label: 'DAYS LATE',
    //   paths: ['unpaid'],
    //   maxWidth: 110
    // },
    {
      Cell: d => <ActionsComponent invoice={d.original} actions={this.actionInvoice} />,
      id: 'actions',
      className: 'text',
      label: 'ACTIONS',
      maxWidth: 90
    }]

  render () {
    const { invoices, loading, loadingEvent, location: { pathname } } = this.props
    const processedInvoices = this.filterInvoices(invoices, pathname)

    const rightHeaderComponent = <div className='headerRightComponent'>
      <Button gray onClick={this.openReceivePaymentModal} text='RECEIVE PAYMENT' round />
      <span className='clearfix' />
      <Button onClick={this.openNewInvoiceModal} text='CREATE INVOICE' round />
    </div>

    const routes = this.filterInvoicesRoutes()

    return <div id='Invoices'>
      <SectionHeader bigBottomPadding title='Invoices' rightComponent={rightHeaderComponent} />
      <NavTab routes={routes} />
      <Filterbar
        endDate={this.state.endDate}
        handleEndDateChange={this.handleEndDateChange}
        handleStartDateChange={this.handleStartDateChange}
        searchHandle={this.searchHandle}
        selectall={this.selectall}
        selectedInvoicesAction={this.selectedInvoicesAction}
        showActions={processedInvoices.length > 0}
        showSearch={invoices.length > 0}
        startDate={this.state.startDate}
        type='all'
      />

      {((loading && loadingEvent == null) || processedInvoices.length > 0) && <CustomTable
        data={processedInvoices}
        defaultSorted={[{
          id: 'date',
          desc: true
        }]}
        getTrProps={(state, rowInfo, column, instance) => ({ onClick: () => this.openInvoiceDetailModal(rowInfo.original) })}
        loading={loading && loadingEvent == null}
        columns={[{ columns: this.filterInvoiceColumns(pathname) }]}
      />}

      {!loading && processedInvoices.length === 0 && <div className='empty'>
        <CenteredTextNotify icon='ion-ios-checkmark' text={`There are no invoices to display.`} />
      </div>}
    </div>
  }
}

Invoices.propTypes = {
  invoices: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  loadingEvent: PropTypes.string
}

const mapStateToProps = (state) => {
  const invoices = state.invoices.invoices.map(i => {
    const arr = i.date.split('-')
    const date = new Date(Number(arr[0]), Number(arr[1]) > 0 ? Number(arr[1]) - 1 : 0, Number(arr[2]))
    return {
      ...i,
      date
    }
  })
  return {
    invoices,
    loading: state.invoices.loading,
    loadingEvent: state.invoices.loadingEvent
  }
}

const mapDispatchToProps = {
  deleteInvoices,
  fetchLicenseeInvoices,
  sendInoicesToSelected
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Invoices))
