// Libraries
import React from 'react'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'

// Config
import loadableConfig from 'Config/loadable.config'

// Controllers
import { appController } from 'Controllers/appController'

// Styles
import './index.css'

// Components
import FullScreenTextOnly from 'GlobalComponents/FullScreenTextOnly'

export default class Modal extends React.Component {
  LoadingComponent = () => <FullScreenTextOnly text='Loading' spinner />

  _loadableConfig = {
    ...loadableConfig,
    loading: this.LoadingComponent
  }

  AddCustomer = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/AddCustomer')
  })

  AddPetModal = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/AddPetModal')
  })

  AddWalker = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/AddWalker')
  })

  CreateOrEditInvoice = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/CreateOrEditInvoice')
  })

  FilterSchedulerModal = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/FilterSchedulerModal')
  })

  InvoiceDetail = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/InvoiceDetail')
  })

  IssueCreditModal = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/IssueCreditModal')
  })

  IssueRefundModal = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/IssueRefundModal')
  })

  PayrollDetailModal = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/PayrollDetailModal')
  })

  ReceivePayment = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/ReceivePayment')
  })

  SendFeedbackModal = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/FeedbackModal')
  })

  WalkModal = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/WalkModal')
  })

  DisbursementDetail = Loadable({
    ...this._loadableConfig,
    loader: () => import('../../modals/DisbursementDetail')
  })

  renderModal () {
    const { canCloseModal, identifier, pathname, search } = this.props

    switch (identifier) {
      case appController.constants.ADD_WALK_MODAL_IDENTIFIER:
      case appController.constants.EDIT_WALK_MODAL_IDENTIFIER:
        return <this.WalkModal canCloseModal={canCloseModal} />
      case appController.constants.ISSUE_CREDIT_MODAL_IDENTIFIER:
        return <this.IssueCreditModal />
      case appController.constants.ISSUE_REFUND_MODAL_IDENTIFIER:
        return <this.IssueRefundModal />
      case appController.constants.INVOICE_DETAIL_MODAL_IDENTIFIER:
        return <this.InvoiceDetail />
      case appController.constants.CREATE_INVOICE_MODAL_IDENTIFIER:
        return <this.CreateOrEditInvoice />
      case appController.constants.RECIVE_PAYMENT_MODAL_IDENTIFIER:
        return <this.ReceivePayment />
      case appController.constants.ADD_WALKER_MODAL_IDENTIFIER:
        return <this.AddWalker />
      case appController.constants.ADD_CUSTOMER_MODAL_IDENTIFIER:
        return <this.AddCustomer />
      case appController.constants.PAYROLL_DETAIL_MODAL_IDENTIFIER:
        return <this.PayrollDetailModal />
      case appController.constants.ADD_PET_MODAL_IDENTIFIER:
        return <this.AddPetModal />
      case appController.constants.SEND_FEEDBACK_MODAL_IDENTIFIER:
        return <this.SendFeedbackModal />
      case appController.constants.FILTER_SCHEDULER_MODAL_IDENTIFIER:
        return <this.FilterSchedulerModal
          pathname={pathname}
          search={search}
        />
      case appController.constants.DISBURSEMENT_DETAIL_MODAL_IDENTIFIER:
        return <this.DisbursementDetail />
    }
    return <span>Modal type not supported.</span>
  }

  render () {
    return <div id='Modal' className='modal-main-container'>
      {this.renderModal()}
    </div>
  }
}

Modal.propTypes = {
  canCloseModal: PropTypes.func,
  identifier: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string
}
