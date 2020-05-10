// Libraries
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SweetAlert from 'sweetalert-react'

// Utils
import { doc } from 'Utils/doc'

// Controllers
import { appController } from 'Controllers/appController'

// Styles
import './index.css'

class ReduxPopupAlert extends React.Component {
  componentDidMount () {
    document.addEventListener('keydown', this.handleESC)
  }

  componentDidUpdate () {
    const { format } = this.props
    const body = document.getElementsByTagName('body')[0]
    doc.addClassToElement(body, format || '')

    this.removeInjectedCloseButton()
    this.injectCloseButton()

    if (format === 'confirm-delete') {
      this.removeInjectedDeleteIcon()
      this.injectDeleteIcon()
    }
  }

  componentWillUnmount () {
    const { format } = this.props
    document.removeEventListener('keydown', this.handleESC)
    this.removeInjectedCloseButton()
    if (format === 'confirm-delete') {
      this.removeInjectedDeleteIcon()
    }
  }

  handleESC = e => {
    if (e.keyCode === 27) {
      appController.closeAlert()
      document.removeEventListener('keydown', this.handleESC)
    }
  }

  injectCloseButton = () => {
    const sweetAlert = document.querySelector('.sweet-alert')
    if (sweetAlert) {
      const close = document.createElement('div')
      const x = document.createElement('span')
      x.innerHTML = 'X'
      x.onclick = () => appController.closeAlert()
      close.id = 'alert-custom-close'
      close.appendChild(x)
      sweetAlert.insertAdjacentElement('afterbegin', close)
    }
  }

  injectDeleteIcon = () => {
    const sweetAlert = document.querySelector('.sweet-alert')
    if (sweetAlert) {
      const p = sweetAlert.getElementsByTagName('h2')[0]
      const icon = document.createElement('div')
      const i = document.createElement('i')
      i.className = 'icon ion-trash-b'
      icon.id = 'alert-delete-icon'
      icon.appendChild(i)
      doc.insertElementAfter(icon, p)
    }
  }

  removeInjectedCloseButton = () => {
    const btn = document.getElementById('alert-custom-close')
    if (btn) {
      btn.remove()
    }
  }

  removeInjectedDeleteIcon = () => {
    const icon = document.getElementById('alert-delete-icon')
    if (icon) {
      icon.remove()
    }
  }

  noop = () => null

  render () {
    const {
      cancelButtonText,
      confirmButtonColor,
      confirmButtonText,
      onCancel,
      onConfirm,
      onKeyDown,
      show,
      showCancelButton,
      text,
      title,
      type
    } = this.props

    return <SweetAlert
      cancelButtonText={cancelButtonText || ''}
      confirmButtonColor={confirmButtonColor || '#1875F0'}
      confirmButtonText={confirmButtonText || ''}
      onCancel={onCancel || this.noop}
      onConfirm={onConfirm || this.noop}
      onKeyDown={onKeyDown || this.noop}
      show={show}
      showCancelButton={showCancelButton || false}
      text={text || ''}
      title={title || ''}
      type={type || 'info'}
    />
  }
}

ReduxPopupAlert.propTypes = {
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  format: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onKeyDown: PropTypes.func,
  show: PropTypes.bool,
  showCancelButton: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
}

const mapStateToProps = state => {
  const { alertIsVisible: show } = state.app
  const {
    cancelButtonText,
    confirmButtonText,
    onCancel,
    onConfirm,
    onKeyDown,
    showCancelButton,
    text,
    title,
    type
  } = state.app.alertData || {}
  return {
    cancelButtonText,
    confirmButtonText,
    onCancel,
    onConfirm,
    onKeyDown,
    show,
    showCancelButton,
    text,
    title,
    type
  }
}

export default connect(mapStateToProps)(ReduxPopupAlert)
