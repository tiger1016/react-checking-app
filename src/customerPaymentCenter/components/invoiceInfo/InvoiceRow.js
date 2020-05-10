// Libraries
import React, { Component } from 'react'

import { DateComponent } from './DateComponent'
import { NumberComponent } from './NumberComponent'
import { DueDateComponent } from './DueDateComponent'
import { StatusComponent } from './StatusComponent'
import { AmountDueComponent } from './AmountDueComponent'
import { AmountPaidComponent } from './AmountPaidComponent'
import { DatePaidComponent } from './DatePaidComponent'
import { OutstandingComponent } from './OutstandingComponent'

// Styles
import '../../index.css'

// const statusStyles = {
//   content: {
//     width: '50%',
//     minHeight: '610px',
//     minWidth: 'auto',
//     height: '550px',
//     top: '48%',
//     left: '5%',
//     right: '50%',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     overflowY: 'auto',
//     overflowX: 'hidden'
//   }
// }

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: '50%',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)'
//   }
// }

// const deleteStyles = {
//   content: {
//     minHeight: '200px'
//     // minWidth              : 'auto',
//     // width                 : '400px',
//     // top                   : '50%',
//     // left                  : '50%',
//     // right                 : '50%',
//     // bottom                : 'auto',
//     // marginRight           : '-50%',
//     // transform             : 'translate(-50%, -50%)'
//   }
// }

export class InvoiceRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      deletemodalIsOpen: false,
      statusmodalIsOpen: false,
      invoice: {}
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.openStatusModal = this.openStatusModal.bind(this)
    this.closeStatusModal = this.closeStatusModal.bind(this)
    this.closeModalAfterSubmit = this.closeModalAfterSubmit.bind(this)
  }
  componentWillMount () {
    var invoice = this.props.customerProfile
    this.setState({ invoice: invoice })
  }

  openModal () {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal () {
    this.setState({ modalIsOpen: false })
  }

  openDeleteModal () {
    this.setState({
      deletemodalIsOpen: true
    })
  }

  closeDeleteModal () {
    this.setState({ deletemodalIsOpen: false })
  }

  openStatusModal () {
    this.setState({ statusmodalIsOpen: true })
  }

  closeStatusModal () {
    this.setState({ statusmodalIsOpen: false })
  }

  closeModalAfterSubmit (allInvoice) {
    this.props.valueAfterDelete(allInvoice)
    this.setState({ deletemodalIsOpen: false })
  }

  render () {
    const invoice = this.props.invoice
    return (
      <div className='row-container'>
        <div className='action-container' style={{ width: '100%', paddingLeft: '24px' }} onClick={() => this.openStatusModal()}>
          <DateComponent date={invoice.ts} />
          <NumberComponent number={invoice.invoice_id} />
          <DueDateComponent dueDate={invoice.date} />
          <StatusComponent status={invoice.status} />
          <AmountDueComponent amtDue={invoice.owed} />
          <AmountPaidComponent status={invoice.status} amtPaid={invoice.paid} />
          <DatePaidComponent datePaid={invoice.date} />
          <OutstandingComponent status={invoice.status} amtDue={invoice.owed} outstanding={invoice.paid} />
        </div>
        <div />
      </div>
    )
  }
}
