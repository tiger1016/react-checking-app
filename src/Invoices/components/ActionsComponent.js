// Libraries
import React, { Component } from 'react'

// Controllers
import { appController } from 'Controllers'

export default class ActionsComponent extends Component {
  openEditInvoiceModal = (e) => {
    e.stopPropagation()
    const { invoice } = this.props
    appController.actions.toggleModal({
      canClose: true,
      data: { customerId: invoice.user_id, invoiceId: invoice.id },
      isOpen: true,
      modalIdentifier: appController.constants.CREATE_INVOICE_MODAL_IDENTIFIER
    })
  }

  render () {
    return (
      <div className='action-container' >
        {this.props.invoice.status === 'unpaid' && <span className='ion-edit ions-style' onClick={(e) => this.openEditInvoiceModal(e)} />}
        {/* { this.props.edit === 'paid' && <span className='ion-informaticon ion-circled ions-style' /> } */}
        {<span>&nbsp;&nbsp;</span>}{this.props.invoice.status === 'unpaid' && <span className='ion-android-delete ions-style' onClick={(e) => this.props.actions(e, this.props.invoice, 'delete')} />}
        {<span>&nbsp;&nbsp;</span>}{<span className='ion-paper-airplane ions-style' onClick={(e) => this.props.actions(e, this.props.invoice, 'send')} />}
        {<span>&nbsp;&nbsp;</span>}{(this.props.invoice.status === 'unpaid' || this.props.invoice.status === 'partial') && <span className='ions-style' onClick={(e) => this.props.actions(e, this.props.invoice, 'payment')}>$</span>}
      </div>
    )
  }
}
