// Libraries
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/customers'

// Selectors
import { customersSelector } from '../../selectors'
import { utility } from '../../utils'

class CustomersController extends BaseController {
  /**
   * Initializes customers controller
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

  /**
   * Creates generator for a bank information object.
   * @return {Func} Bank information data object generator
   */
  customerStructGenerator (customer = {}) {
    return {
      address: customer.address || '',
      address2: customer.address2 || '',
      city: customer.city || '',
      default_service: customer.default_service || '',
      email: (customer.email || customer.username) || '',
      email_secondary: customer.email_secondary || '',
      email_emergency: customer.email_emergency || '',
      first_name: customer.first_name || '',
      first_name_secondary: customer.first_name_secondary || '',
      first_name_emergency: customer.first_name_emergency || '',
      house_alarm_code: customer.house_alarm_code || '',
      last_name: customer.last_name || '',
      last_name_emergency: customer.last_name_emergency || '',
      last_name_secondary: customer.last_name_secondary || '',
      notes: customer.notes || '',
      key_info: customer.key_info || '',
      password: customer.password || '',
      phone_emergency: customer.phone_emergency || '',
      phone_home: customer.phone_home || '',
      phone_home_secondary: customer.phone_home_secondary || '',
      phone_mobile: customer.phone_mobile || '',
      phone_mobile_secondary: customer.phone_mobile_secondary || '',
      phone_work: customer.phone_work || '',
      phone_work_secondary: customer.phone_work_secondary || '',
      referred_from: customer.referred_from || '',
      sign_up_date: customer.sign_up_date || '',
      state: customer.state || '',
      walker_id: customer.walker_id || '',
      zip: customer.zip || '',
      qr_code: customer.qr_code || '',
      qr_code_location: customer.qr_code_location || ''
    }
  }

  /**
   * [billingStructGenerator description]
   * @return {[type]} [description]
   */
  billingStructGenerator (paymentInformation = {}) {
    return {
      balance: paymentInformation.balance || '',
      payment_type: paymentInformation.payment_type || '',
      first_name_billing: paymentInformation.first_name_billing || '',
      last_name_billing: paymentInformation.last_name_billing || '',
      card_type: paymentInformation.card_type || '',
      card_digits: paymentInformation.card_digits ? '***********' + paymentInformation.card_digits.substr(paymentInformation.card_digits.length - 4) : '',
      cvv: '***',
      card_expiration_month: (paymentInformation.card_expiration_month || paymentInformation.exp_month) || '',
      card_expiration_year: (paymentInformation.card_expiration_year || paymentInformation.exp_year) || '',
      address_billing: paymentInformation.address_billing || '',
      address2_billing: paymentInformation.address2_billing || '',
      city_billing: paymentInformation.city_billing || '',
      state_billing: paymentInformation.state_billing || '',
      zip_billing: paymentInformation.zip_billing || '',
      billing_timing: paymentInformation.billing_timing || '',
      billing_frequency: paymentInformation.billing_frequency || '',
      invoice_terms: paymentInformation.invoice_terms || '',
      billing_date: paymentInformation.billing_date || ''
    }
  }

  /**
   * [description]
   * @param  {[type]} state [description]
   * @param  {[type]} id    [description]
   * @return {[type]}       [description]
   */
  selectCustomerFromId = (state = null, id) => customersSelector.customersSelector(state).find(c => Number(c.user_id) === Number(id))

  /**
   * Returns collection of customers formated for use in walk edit modal, using
   * memoized selector and hydrated state
   * @param  {Object}  state  Store's state
   * @return {Array}          Formatted collection of customers for use in edit modal.
   */
  selectCustomersArrayFormatForEditModal = (state = null) => customersSelector.formatCustomersArrayForWalkEditModal(state || this.state())

  /**
   * Returns collection of customers formated for use in scheduler dropdown filter, using
   * memoized selector and hydrated state
   * @param  {Object}  state  Store's state
   * @return {Array}          Formatted collection of customers for usscheduler dropdown filter.
   */
  selectFormatCustomersArrayForSchedulerFilterDropdown = (state = null) => customersSelector.formatCustomersArrayForSchedulerFilterDropdown(state || this.state())

  /**
   * Returns collection of customers formated for use in scheduler dropdown search, using
   * memoized selector and hydrated state
   * @param  {OBject}  state  Store's state
   * @return {Array}          Formatted collection of customers for usscheduler dropdown search.
   */
  selectFormatCustomersArrayForSchedulerSearchDropdown = (state = null) => customersSelector.formatCustomersArrayForSchedulerSearchDropdown(state || this.state())

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectCustomersForSelectInput = (state = null) => customersSelector.selectCustomersForSelectInput(state)

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectCustomerServicesForSelectInput = (customer_id = null, description = null, state = null) => { // eslint-disable-line camelcase
    const customer = this.selectCustomerFromId(state || this.state(), customer_id)

    if (!customer) return []

    const services = ((state || this.state()).services.services || [])
      .filter(s => {
        if (description) {
          return s && !s.archive && !s.is_deleted && s.dropdown_description.toLowerCase() === description.toLowerCase()
        }
        return s && !s.archive && !s.is_deleted
      })
      .map(s => ({ label: s.dropdown_description, value: Number(s.id), id: Number(s.id), cost: s.cost }))
      .map(s => {
        let updatedCost = utility.isAnArray(customer.services) &&
        customer.services.find(customerCost => Number(customerCost.billing_price_group_id) === Number(s.value))

        if (updatedCost && (updatedCost.cost || updatedCost.customer_cost)) {
          return { ...s, customer_cost: updatedCost.override && updatedCost.customer_cost ? updatedCost.customer_cost : updatedCost.cost }
        }

        updatedCost = utility.isAnArray(customer.services_customer_cost) &&
          customer.services_customer_cost.find(customerCost => Number(customerCost.id) === s.value)

        if (updatedCost && updatedCost.cost) {
          return { ...s, customer_cost: updatedCost.cost }
        }

        updatedCost = utility.isAnArray(customer.service_types_cost) &&
          customer.service_types_cost.find(licenseeCost => Number(licenseeCost.id) === s.value)

        if (updatedCost && updatedCost.cost) {
          return { ...s, customer_cost: updatedCost.cost }
        }

        return s
      })

    return services
  }

  /**
   * [description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  selectCustomerAddonsForSelectInput = (customer_id = null, id = null, state = null) => { // eslint-disable-line camelcase
    const customer = this.selectCustomerFromId(state || this.state(), customer_id)

    if (!customer) return id ? null : []

    const addons = ((state || this.state()).addons.addons || [])
      .filter(a => {
        if (id != null) {
          return a && !parseInt(a.archived, 10) && !parseInt(a.is_deleted, 10) && Number(a.id) === Number(id)
        }
        return a && !parseInt(a.archived, 10) && !parseInt(a.is_deleted, 10)
      })
      .map(a => ({ label: a.name || a.addon_name, name: a.name || a.addon_name, value: Number(a.active_addon_id), id: Number(a.id), addon_price: a.addon_price }))
      .map(a => {
        const updatedCost = utility.isAnArray(customer.addons_customer) && customer.addons_customer.find(aa => Number(aa.addon_id) === Number(a.id))
        if (updatedCost && updatedCost.customer_cost !== null) {
          return { ...a, addon_price: updatedCost.customer_cost !== null ? updatedCost.customer_cost : updatedCost.addon_price }
        }

        return a
      })

    return id ? (addons.length > 0 ? addons[0] : null) : addons
  }

  /**
   * [getBillingTitle description]
   * @param  {[type]} v [description]
   * @return {[type]}   [description]
   */
  getBillingTitle (v) {
    switch (v) {
      case 'cash_check':
        return 'Cash / Check'
      case 'cc':
        return 'Credit Card'
      case 'prepay':
        return 'Customer Prepays'
      case 'arrears':
        return 'Bill Customer after Service'
      case 'upon_receipt':
        return 'Upon Receipt'
      case 'net_7_days':
        return 'Next 7 Days'
      case 'net_14_days':
        return 'Next 14 Days'
      case 'net_30_days':
        return 'Next 30 Days'
    }
    return ''
  }
}

export const customersController = new CustomersController()
