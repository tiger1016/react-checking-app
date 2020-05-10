// Libraries
import React from 'react'

// Controllers
import { appController } from 'Controllers/appController'

export default class ActionsComponent extends React.Component {
  openEditInvoiceModal = (e) => {
    const { invoice } = this.props
    e.stopPropagation()
    appController.actions.toggleModal({
      canClose: true,
      data: { customerId: invoice.user_id, invoiceId: invoice.invoice_id },
      isOpen: true,
      modalIdentifier: appController.constants.CREATE_INVOICE_MODAL_IDENTIFIER
    })
  }

  render () {
    const { actions, invoice } = this.props
    return <div className='action-container' >
      {invoice.status === 'unpaid' && <span className='ion-edit ions-style' onClick={(e) => this.openEditInvoiceModal(e)} />}
      {/* { this.props.edit === 'paid' && <span className='ion-informaticon ion-circled ions-style' /> } */}
      {<span>&nbsp;&nbsp;</span>}
      {invoice.status === 'unpaid' && <span className='ion-android-delete ions-style' onClick={(e) => actions(e, invoice, 'delete')} />}
      {<span>&nbsp;&nbsp;</span>}
      {<span className='ion-paper-airplane ions-style' onClick={(e) => actions(e, invoice, 'send')} />}
      <span>&nbsp;&nbsp;</span>
      {(invoice.status === 'unpaid' || invoice.status === 'partial') && <span className='ions-style' onClick={(e) => actions(e, invoice, 'payment')}>$</span>}
    </div>
  }
}
