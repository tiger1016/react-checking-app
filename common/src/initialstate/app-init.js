// Base init
import baseInit from './base-init'

export default {
  ...baseInit,
  alertIsVisible: false,
  qrIsVisible: false,
  alertData: null,
  currentScript: null,
  modal: {
    canClose: true,
    data: {},
    identifier: null,
    isOpen: false
  },
  sideBar: true,
  syncEvents: []
}
