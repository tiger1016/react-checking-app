// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'

// Controllers
import { appController } from 'Controllers/appController'

// Components
import ActionsComponent from './components/ActionsComponent'
import Button from 'GlobalComponents/Button'
import CenteredTextNotify from 'GlobalComponents/CenteredTextNotify'
import CustomTable from 'GlobalComponents/CustomTable'
import OutstandingComponent from './components/OutstandingComponent'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Actions
import deleteInvoices from 'Actions/invoices/deleteInvoices'
import fetchCustomerInvoices from 'Actions/invoices/fetchCustomerInvoices'
import sendInoicesToSelected from 'Actions/invoices/sendInoicesToSelected'

// Util
import { utility } from 'Utils/utility'

// Styles
import './index.css'

class CustomerInvoices extends React.PureComponent {
  componentWillMount () {
    const { customerId, fetchCustomerInvoices, invoices } = this.props
    if (!invoices) {
      fetchCustomerInvoices(customerId)
    }
  }

  openInvoiceDetailModal = ({ id }) => {
    appController.actions.toggleModal({
      canClose: true,
      data: { invoiceId: id },
      isOpen: true,
      modalIdentifier: appController.constants.INVOICE_DETAIL_MODAL_IDENTIFIER
    })
  }

  actionInvoice = (e, invoice, type) => {
    e.stopPropagation()
    const { deleteInvoices, sendInoicesToSelected } = this.props
    switch (type) {
      case 'send':
        sendInoicesToSelected([invoice.id])
        break
      case 'delete':
        deleteInvoices([invoice.id])
        break
      case 'payment':
        appController.actions.toggleModal({
          canClose: true,
          data: { custid: invoice.user_id, invoice_id: invoice.invoice_id, custName: invoice.first_name + ' ' + invoice.last_name, source: 'customer' },
          isOpen: true,
          modalIdentifier: appController.constants.RECIVE_PAYMENT_MODAL_IDENTIFIER
        })
        break
      default:
        break
    }
  }

  openNewInvoiceModal = (e) => {
    e.stopPropagation()
    const { customerId } = this.props
    appController.actions.toggleModal({
      canClose: true,
      data: { customerId: customerId, invoiceId: null },
      isOpen: true,
      modalIdentifier: appController.constants.CREATE_INVOICE_MODAL_IDENTIFIER
    })
  }

  render () {
    const { customersLoading, invoices, loading } = this.props
    return <div id='CustomerInvoices'>
      <SectionHeader
        title='Invoices'
        rightComponent={<Button onClick={this.openNewInvoiceModal} round text='Create Invoice' />}
      />
      {invoices.length > 0 && <CustomTable
        data={invoices}
        getTrProps={(state, rowInfo, column, instance) => ({ onClick: () => this.openInvoiceDetailModal(rowInfo.original) })}
        loading={customersLoading || loading}
        columns={[{
          columns: [
            {
              accessor: d => moment(d.date).format('MM/DD/YYYY'),
              className: 'text strong',
              id: 'date',
              label: 'DATE',
              maxWidth: 120
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
              paths: ['All', 'Partial']
            },
            // {
            //   accessor: d => moment(d.ts).format('MM/DD/YYYY'),
            //   id: 'due_date',
            //   className: 'text',
            //   label: 'DUE DATE',
            //   maxWidth: 100
            // },
            {
              Cell: d => <NumberFormat value={d.original.paid ? d.original.paid : 0} displayType={'text'} thousandSeparator prefix={'$'} fixedDecimalScale decimalScale={2} />,
              id: 'paid',
              className: 'text',
              label: 'AMOUNT PAID',
              maxWidth: 120,
              paths: ['All', 'Partial', 'Paid']
            },
            {
              accessor: d => d.status.toUpperCase() !== 'UNPAID' && d.last_paid_date && moment(d.last_paid_date).format('MM/DD/YYYY'),
              id: 'date_paid',
              className: 'text',
              label: 'DATE PAID',
              paths: ['Paid'],
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
              paths: ['All', 'Partial', 'Unpaid'],
              maxWidth: 120
            },
            {
              Cell: d => <ActionsComponent invoice={d.original} actions={this.actionInvoice} />,
              id: 'actions',
              className: 'text',
              label: 'ACTIONS',
              maxWidth: 90
            }]
        }]}
      />}

      {(!loading && invoices.length < 1) && <div className='empty'>
        <CenteredTextNotify icon='ion-ios-checkmark' text={`There are no invoices to display.`} />
      </div>}
    </div>
  }
}

CustomerInvoices.propTypes = {
  customerId: PropTypes.string.isRequired,
  deleteInvoices: PropTypes.func.isRequired,
  fetchCustomerInvoices: PropTypes.func.isRequired,
  invoices: PropTypes.array,
  loading: PropTypes.bool
}

const mapStateToProps = ({ customers, invoices: { invoices, loading } }, { customerId }) => {
  const customer = customers.customers.find(c => `${c.user_id}` === `${customerId}`)
  const customerInvoices = invoices.filter(i => `${i.user_id}` === `${customer.user_id}`)

  return {
    invoices: customerInvoices,
    loading
  }
}

const mapDispatchToProps = {
  deleteInvoices,
  fetchCustomerInvoices,
  sendInoicesToSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInvoices)
