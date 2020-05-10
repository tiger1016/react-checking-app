// Libraries
import React from 'react'
import { connect } from 'react-redux'

// Components
import Modal from '../globalComponents/ReduxModal'
import ReactModal from '../globalComponents/Modal'
// Controllers
import { appController } from '../../controllers'

class ModalContainer extends React.Component {
  canCloseModal = canClose => appController.actions.toggleModal({
    modalIdentifier: this.props.app.modal.identifier,
    canClose,
    isOpen: this.props.app.modal.isOpen,
    data: this.props.app.modal.data
  })

  onAfterOpen = () => {}

  onRequestClose = () => {
    const { app } = this.props
    if (app.modal.canClose) {
      appController.actions.toggleModal({
        modalIdentifier: null,
        canClose: app.modal.canClose,
        isOpened: false,
        data: null
      })
    } else {
      console.log('Closing modal is blocked')
    }
  }

  render () {
    const { app } = this.props
    if (!app.modal) return null
    return <ReactModal
      transparent
      visible={app.modal.isOpen}
      onAfterOpen={this.onAfterOpen}
      style={{ overlay: { backgroundColor: 'rgba(148, 148, 148, 0.55)' } }}
      onRequestClose={this.onRequestClose}>
      <Modal {...this.props}
        canCloseModal={this.canCloseModal}
        closeModal={this.onRequestClose}
      />
    </ReactModal>
  }
}

export default connect(
  state => {
    return {
      app: state.app
    }
  }
)(ModalContainer)
