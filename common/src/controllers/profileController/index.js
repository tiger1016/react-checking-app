// Libraries
import { bindActionCreators } from 'redux'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/profile'

// Selectors
// import { profileSelector } from 'Selectors'

class ProfileController extends BaseController {
  /**
   * Initializes profile controller
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
  bankInfoStructGenerator () {
    return BankInfoStruct
  }

  /**
   * Creates generator for a basic profile information object.
   * @return {Func} Basic profile information data object generator
   */
  basicInfoStructGenerator () {
    return BasicProfileStruct
  }

  /**
   * Creates generator for a payment information object.
   * @return {Func} Payment information data object generator
   */
  paymentInfoStructGenerator () {
    return PaymentInfoStruct
  }

  /**
   * [qrCodeStructGenerator description]
   * @return {[type]} [description]
   */
  qrCodeStructGenerator () {
    return QrCodeStruct
  }
}

/**
 * Structure of basic profile information
 * @param {Object} profileInfo Initial basic profile information values
 */
const BasicProfileStruct = function (profileInfo = {}) {
  this.address_billing = profileInfo.address_billing || ''
  this.address_shipping = profileInfo.address_shipping || ''
  this.address2_billing = profileInfo.address2_billing || ''
  this.address2_shipping = profileInfo.address2_shipping || ''
  this.city_billing = profileInfo.city_billing || ''
  this.city_shipping = profileInfo.city_shipping || ''
  this.first_name_billing = profileInfo.first_name_billing || ''
  this.last_name_billing = profileInfo.last_name_billing || ''
  this.first_name = profileInfo.first_name || ''
  this.last_name = profileInfo.last_name || ''
  this.logo = profileInfo.logo || ''
  this.sales_tax_percentage = profileInfo.sales_tax_percentage || ''
  this.state_billing = profileInfo.state_billing || ''
  this.state_shipping = profileInfo.state_shipping || ''
  this.time_zone = profileInfo.time_zone || ''
  this.username = profileInfo.username || ''
  this.zip_billing = profileInfo.zip_billing || ''
  this.zip_shipping = profileInfo.zip_shipping || ''
  this.licensee_phone = profileInfo.licensee_phone || ''
}

/**
 * Structure of bank information
 * @param {Object} bankInfo Bank info initial values
 */
const BankInfoStruct = function (bankInfo = {}) {
  this.bank_account_number = bankInfo.bank_account_number || ''
  this.bank_routing_number = bankInfo.bank_routing_number || ''
  this.birth_day = parseInt(bankInfo.birth_day) || ''
  this.birth_month = parseInt(bankInfo.birth_month) || ''
  this.birth_year = bankInfo.birth_year || ''
  this.fein_number = bankInfo.fein_number || ''
  this.social_number = bankInfo.social_number || ''
}

/**
 * Structure for payment information
 * @param {Object} paymentInfo Payment info intial values
 * */
const PaymentInfoStruct = function (paymentInfo = {}) {
  this.address_billing = paymentInfo.address_billing || ''
  this.address2_billing = paymentInfo.address2_billing || ''
  this.card_expiration_month = paymentInfo.card_expiration_month || ''
  this.card_expiration_year = paymentInfo.card_expiration_year || ''
  this.card_number = paymentInfo.card_number || ''
  this.card_type = paymentInfo.card_type || ''
  this.city_billing = paymentInfo.city_billing || ''
  this.cvv = paymentInfo.cvv || ''
  this.first_name_billing = paymentInfo.first_name_billing || ''
  this.last_name_billing = paymentInfo.last_name_billing || ''
  this.first_name = paymentInfo.first_name || ''
  this.last_name = paymentInfo.last_name || ''
  this.state_billing = paymentInfo.state_billing || ''
  this.zip_billing = paymentInfo.zip_billing || ''
}

/**
 * [QrCodeStruct description]
 * @param {[type]} qrcodesInfo [description]
 */
const QrCodeStruct = function (qrcodesInfo = {}, to) {
  this.address_shipping = qrcodesInfo.address_shipping || ''
  this.address2_shipping = qrcodesInfo.address2_shipping || ''
  this.city_shipping = qrcodesInfo.city_shipping || ''
  this.quantity = 25
  this.sales_tax_percentage = qrcodesInfo.sales_tax_percentage || ''
  this.state_shipping = qrcodesInfo.state_shipping || ''
  this.zip_shipping = qrcodesInfo.zip_shipping || ''
  this.to = to || ''
}

export const profileController = new ProfileController()
