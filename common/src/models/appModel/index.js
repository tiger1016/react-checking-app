import _ from 'lodash'
// Models
import BaseModel from '../baseModel'

export default class AppModel extends BaseModel {
  /**
   * [closeSideBar description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  closeSideBar (state) {
    return {
      ...state,
      sideBar: false
    }
  }

  /**
   * [openSideBar description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  openSideBar (state) {
    return {
      ...state,
      sideBar: true
    }
  }

  /**
   * [toggleAlert description]
   * @param  {Object} state           [description]
   * @param  {[type]} options.payload [description]
   * @return {[type]}                 [description]
   */
  toggleAlert (state = {}, { payload }) {
    return {
      ...state,
      alertData: payload.alertData,
      alertIsVisible: payload.alertIsVisible
    }
  }

  /**
   * [toggleQrScanner description]
   * @param  {Object} state           [description]
   * @param  {[type]} options.payload [description]
   * @return {[type]}                 [description]
   */
  toggleQrScanner (state = {}, { payload }) {
    return {
      ...state,
      qrIsVisible: payload.qrIsVisible
    }
  }

  /**
   * [toggleModal description]
   * @param  {Object} state           [description]
   * @param  {[type]} options.payload [description]
   * @return {[type]}                 [description]
   */
  toggleModal (state = {}, { payload }) {
    return {
      ...state,
      modal: {
        ...state.modal,
        canClose: payload.canClose,
        data: { ...payload.data },
        identifier: payload.modalIdentifier,
        isOpen: payload.isOpen
      }
    }
  }

  /**
   * [toggleSideBar description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  toggleSideBar (state = {}) {
    return {
      ...state,
      sideBar: !state.sideBar
    }
  }

  /**
   * [updateCurrentScript description]
   * @param  {Object} state                 [description]
   * @param  {[type]} options.currentScript [description]
   * @return {[type]}                       [description]
   */
  updateCurrentScript (state = {}, { currentScript }) {
    return {
      ...state,
      currentScript
    }
  }

  /**
   * [sync description]
   * @param  {Object} state  [description]
   * @param  {[type]} action [description]
   * @return {[type]}        [description]
   */
  sync (state = {}, { syncEventsArray }) {
    const syncEvents = _.unionBy(state.syncEvents, syncEventsArray, 'id')
    return {
      ...state,
      syncEvents
    }
  }
}

export const appModel = new AppModel()
