// Libraries
import { bindActionCreators } from 'redux'

// Constants
import * as CONSTANTS from '../../constants/app'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/app'

// Functions
import * as functions from '../../functions/app'

// Selectors
// import { appSelector } from 'Selectors'

class AppController extends BaseController {
  /**
   * Initializes app controller
   * @return {Void}
   */
  constructor () {
    /**
     * Required super call to use `this` in constructor
     */
    super()
    /**
     * Creates references to action creatores and binds them to store dispatch for eaiser access and usage
     * @type {Object}
     */
    this.actions = bindActionCreators(actions, store.dispatch)
    /**
     * Creates reference to constants
     */
    this.constants = CONSTANTS
    /**
     * Adds functions to controller and binds them
     */
    this.prepareFunctions(functions)
  }

  getAssetsUrl () {
    return process.env.REACT_APP_ASSETS_URL || ''
  }

  /**
   * Dispatches action to close global redux alert
   * @return {Void}
   */
  closeAlert = () => {
    this.actions.toggleAlert({ alertIsVisible: false, alertData: null })
  }

  closeQrScanner = () => {
    this.actions.toggleQrScanner({ qrIsVisible: false })
  }

  openQrScanner = () => {
    this.actions.toggleQrScanner({ qrIsVisible: true })
  }

  /**
   * Dispatches action to close modal
   * @return {[type]} [description]
   */
  closeModal = () => {
    this.actions.toggleModal({
      modalIdentifier: null,
      canClose: true,
      isOpen: false,
      data: {}
    })
  }

  /**
   * [description]
   * @param  {Function} cb [description]
   * @return {[type]}      [description]
   */
  confirmDiscardChanges = (cb) => {
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        format: 'confirm-delete',
        onConfirm: () => { appController.closeAlert(); cb() },
        onCancel: () => appController.closeAlert(),
        onKeyDown: () => appController.closeAlert(),
        show: true,
        showCancelButton: true,
        text: 'Are you sure you want to discard the information you entered?',
        type: 'warning'
      }
    })
  }

  /**
   * [description]
   * @param  {Function} cb   [description]
   * @param  {[type]}   text [description]
   * @return {[type]}        [description]
   */
  confirmSaveChanges = (cb, text, cancelCb) => {
    appController.actions.toggleAlert({
      alertIsVisible: true,
      alertData: {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        format: 'info',
        onConfirm: () => { appController.closeAlert(); if (typeof cb === 'function') cb() },
        onCancel: () => { appController.closeAlert(); if (typeof cancelCb === 'function') cancelCb() },
        onKeyDown: () => appController.closeAlert(),
        show: true,
        icon: 'ios-checkmark',
        showCancelButton: true,
        text: text || 'Are you sure you want to save the information you entered?',
        type: 'warning'
      }
    })
  }
}

export const appController = new AppController()
