// Libraries
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/refunds'

// Selectors
import { refundsSelector } from '../../selectors'

class RefundsController extends BaseController {
  /**
   * Initializes refunds controller
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
  }

  selectRefundsOfCustomer = (state = {}, customerId) => refundsSelector.refundsSelector(state).filter(r => Number(r.customer_id) === Number(customerId))
}

/**
 * Structure of refund information
 * @param {Object} refund initial values
 */
// const RefundStruct = function (refund = {}) {
//   this.address = refund.address || ''
//   this.address2 = refund.address2 || ''
//   this.city = refund.city || ''
//   this.default_service = refund.default_service || ''
//   this.email = (refund.email || refund.username) || ''
//   this.email_secondary = refund.email_secondary || ''
//   this.first_name = refund.first_name || ''
//   this.first_name_secondary = refund.first_name_secondary || ''
//   this.first_name_emergency = refund.first_name_emergency || ''
//   this.house_alarm_code = refund.house_alarm_code || ''
//   this.last_name = refund.last_name || ''
//   this.last_name_emergency = refund.last_name_emergency || ''
//   this.last_name_secondary = refund.last_name_secondary || ''
//   this.notes = refund.notes || ''
//   this.password = refund.password || ''
//   this.phone_emergency = refund.phone_emergency || ''
//   this.phone_home = refund.phone_home || ''
//   this.phone_home_secondary = refund.phone_home_secondary || ''
//   this.phone_mobile = refund.phone_mobile || ''
//   this.phone_mobile_secondary = refund.phone_mobile_secondary || ''
//   this.phone_work = refund.phone_work || ''
//   this.phone_work_secondary = refund.phone_work_secondary || ''
//   this.referred_from = refund.referred_from || ''
//   this.sign_up_date = refund.sign_up_date || ''
//   this.state = refund.state || ''
//   this.walker_id = refund.walker_id || ''
//   this.zip = refund.zip || ''
// }

export const refundsController = new RefundsController()
