// Libraries
// import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
// import { store } from 'Store'

// Actions
// import actions from 'Actions/router'

// Selectors
// import { routerSelector } from 'Selectors'

class RouterController extends BaseController {
  getPathnameRoot (pathname) {
    if (pathname.match(/^\//)) {
      const pathArray = pathname.substring(1).split('/')
      if (pathArray.length) {
        return pathArray[0]
      }
    }
    return ''
  }
}

export const routerController = new RouterController()
