// Libraries
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/session'

// Selectors
import { sessionSelector } from '../../selectors'
class SessionController extends BaseController {
  /**
   * Initializes session controller
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

    // window.addEventListener('storage', function (event) {
    //  console.log('Storage Event',event)
    // })
  }

  /**
   * Checks if user is logged in
   * @param  {Object} state Store's state
   * @return {Bool}         True if logged in, false otherwise
   */
  selectLoggedIn = (state = {}) => sessionSelector.loggedIn(state || this.state())

  /**
   * [description]
   * @param  {Object} sessionStore [description]
   * @return {[type]}              [description]
   */
  selectLoggingIn = (state = {}) => sessionSelector.loggingIn(state || this.state())

  /**
   * [description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  selectLoginFailed = (state = {}) => sessionSelector.loginFailed(state || this.state())

  /**
   * [description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  selectSessionToken = (state = {}) => sessionSelector.sessionTokenSelector(state || this.state())

  /**
   * [description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  selectUser = (state = {}) => sessionSelector.userSelector(state || this.state())

  /**
   * [description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  selectUserTimeZone = (state = {}) => sessionSelector.userTimeZoneSelector(state || this.state())

  /**
   * [description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  isPartialAdmin = (state = {}) => {
    const session = (state || this.state()).session
    if (session.user && session.user.admin && !session.user.full_admin) { return true } else { return false }
  }

  selectUserType = (state = {}) => {
    const type = sessionSelector.userTypeSelector(state || this.state())
    const isAdmin = sessionSelector.walkerAdminSelector(state || this.state())
    const isAdminFull = sessionSelector.walkerAdminFullSelector(state || this.state())
    switch (type) {
      case 2:
        return 'licensee'
      case 4:
        if (isAdmin) return 'scheduling_admin'
        if (isAdminFull) return 'full_scheduling_admin'
        return 'walker'
      case 5:
        return 'customer'
      default:
        return 'unknown user type'
    }
  }

  /**
   * [description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  selectWalker = (state = {}) => sessionSelector.walkerSelector(state || this.state())
}

export const sessionController = new SessionController()
