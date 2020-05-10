// Libraries
import React from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

// Components
import Modal from 'GlobalComponents/ReduxModal'

// Actions
import toggleModal from 'Actions/app/toggleModal'

ReactModal.setAppElement('#root')

class ModalContainer extends React.Component {
  canCloseModal = canClose => this.props.toggleModal({
    canClose,
    data: this.props.modalData,
    isOpen: this.props.modalIsOpen,
    modalIdentifier: this.props.modalIdentifier
  })

  onAfterOpen = () => {}

  onRequestClose = () => {
    const { canClose, toggleModal } = this.props
    if (canClose) {
      toggleModal({
        canClose: canClose,
        data: null,
        isOpened: false,
        modalIdentifier: null
      })
    } else {
      console.log('Closing modal is blocked')
    }
  }

  render () {
    const {
      location, modalExists, modalIdentifier, modalIsOpen
    } = this.props
    const { pathname, search } = location

    if (!modalExists) return null

    return <ReactModal
      ariaHideApp
      className='ReactModal__Content ReactModal__Content--after-open'
      contentLabel='Petcheck Modal'
      isOpen={modalIsOpen}
      onAfterOpen={this.onAfterOpen}
      style={{ overlay: { background: 'rgba(0,0,0,.1)' } }}
      onRequestClose={this.onRequestClose}>
      <Modal
        canCloseModal={this.canCloseModal}
        closeModal={this.onRequestClose}
        identifier={modalIdentifier}
        pathname={pathname}
        search={search}
      />
    </ReactModal>
  }
}

ModalContainer.propTypes = {
  canClose: PropTypes.bool,
  modalData: PropTypes.object,
  modalExists: PropTypes.bool,
  modalIdentifier: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  location: PropTypes.object
}

const mapStateToProps = state => {
  const canClose = state.app.modal.canClose
  const modalData = state.app.modal.data
  const modalExists = state.app.modal && true
  const modalIdentifier = state.app.modal.identifier
  const modalIsOpen = state.app.modal && state.app.modal.isOpen
  return {
    canClose,
    modalData,
    modalExists,
    modalIdentifier,
    modalIsOpen
  }
}

const mapDispatchToProps = {
  toggleModal
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalContainer))
