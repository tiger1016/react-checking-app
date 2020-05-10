// Models
import BaseModel from '../baseModel'
import _ from 'lodash'

export default class CustomersModel extends BaseModel {
  updateUnbilledServices (state, { customerId, walks: unbilledServices }) {
    // let unbilledServices = _.groupBy(walks, 'billing_price_group_id')
    // unbilledServices = Object.keys(unbilledServices).map(s => ({
    //   cost: unbilledServices[s][0].cost,
    //   discount_amount: unbilledServices[s][0].discount_amount,
    //   discount_type: unbilledServices[s][0].discount_type,
    //   id: s,
    //   name: unbilledServices[s][0].dropdown_description,
    //   services: unbilledServices[s],
    //   quantity: unbilledServices[s].length
    // }))
    const customers = state.customers.map(c => {
      if (`${c.user_id}` === `${customerId}`) return { ...c, unbilledServices }
      return c
    })
    return this.updateCustomers(state, { customers })
  }

  /**
   * [createcustomers description]
   * @param  {Object} state                   [description]
   * @param  {[type]} options.createcustomers [description]
   * @return {[type]}                         [description]
   */
  createCustomer = (state = {}, { newCustomer }) => {
    const customers = [...state.customers]
    customers.unshift(newCustomer)
    return this.updateCustomers(state, { customers })
  }

  /**
   * [description]
   * @param  {[type]} state             [description]
   * @param  {[type]} options._customer [description]
   * @return {[type]}                   [description]
   */
  deleteCustomer = (state, { customer }) => {
    const customers = state.customers.filter(item => item.user_id.toString() !== customer.user_id.toString())
    return this.updateCustomers(state, { customers })
  }

  /**
   * [description]
   * @param  {[type]} state           [description]
   * @param  {[type]} options._addon  [description]
   * @param  {[type]} options.user_id [description]
   * @return {[type]}                 [description]
   */
  updateCustomerAddonRate = (state, { _addon, user_id }) => { // eslint-disable-line camelcase
    const customers = state.customers.map(item => {
      if (item.user_id.toString() !== user_id.toString()) {
        return item
      }

      const newAddonsCustomer = item.addons_customer && _.isArray(item.addons_customer) ? [...item.addons_customer] : []
      _addon.addons_customer.map(a => {
        const index = newAddonsCustomer.findIndex(n => Number(n.addon_id) === Number(a.addon_id))
        if (index > -1) {
          newAddonsCustomer[index] = a
        } else {
          newAddonsCustomer.unshift(a)
        }
      })

      return { ...item, addons: _addon.addons, addons_customer: newAddonsCustomer }
    })
    return this.updateCustomers(state, { customers })
  }

  /**
   * [description]
   * @param  {[type]} state            [description]
   * @param  {[type]} options.customer [description]
   * @return {[type]}                  [description]
   */
  updateCustomerProfile = (state, { customer }) => {
    let isFound = false
    const customers = state.customers.map(item => {
      if (item.user_id.toString() === customer.user_id.toString()) {
        isFound = true
        return customer
      }
      return item
    })
    if (!isFound) {
      customers.unshift(customer)
    }
    return this.updateCustomers(state, { customers })
  }

  /**
   * [description]
   * @param  {[type]} state            [description]
   * @param  {[type]} options.services [description]
   * @param  {[type]} options.user_id  [description]
   * @return {[type]}                  [description]
   */
  fetchCustomerServiceRate = (state, { services, user_id }) => { // eslint-disable-line camelcase
    const customers = state.customers.map(item => item.user_id.toString() === user_id.toString() ? { ...item, ...services } : item)
    return this.updateCustomers(state, { customers })
  }

  /**
   * [description]
   * @param  {[type]} state              [description]
   * @param  {[type]} options._customer  [description]
   * @param  {[type]} options.customerId [description]
   * @return {[type]}                    [description]
   */
  toggleCustomerStatus = (state, { _customer, customerId }) => {
    let _updatecustomers = [...state.customers]
    if (!_customer.error) {
      _updatecustomers = state.customers.map(item => {
        if (Number(item.user_id) === Number(customerId)) {
          if (item.active !== undefined && item.active.toString() === '0') {
            item.active = 1
          } else {
            item.active = 0
          }
          item.toggled = true
        }
        return item
      })
    }
    return this.updateCustomers(state, { customers: _updatecustomers })
  }

  /**
   * Updates customer
   * @param  {Object} state             Customers reducer state
   * @param  {Array}  options.customer  Customer onject
   * @return {Object}                   Return new reducer state
   */
  updateCustomer = (state = {}, { customer }) => {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      customers: state.customers.map(c => {
        if (Number(c.user_id) === Number(customer.user_id)) {
          return { ...c, ...customer }
        }
        return c
      }),
      error: null
    }
  }

  /**
   * [description]
   * @param  {[type]} state           [description]
   * @param  {[type]} options._addon  [description]
   * @param  {[type]} options.user_id [description]
   * @return {[type]}                 [description]
   */
  fetchCustomerAddonRate = (state, { _addon, user_id }) => { // eslint-disable-line camelcase
    const customers = state.customers.map(item => {
      if (item.user_id.toString() === user_id.toString()) {
        item.addons = _addon.addons
        item.addons_customer = _addon.addons_customer
      }
      return item
    })
    return this.updateCustomers(state, { customers })
  }

  /**
   * Updates customers, turns of loading & loading message, and resets error
   * @param  {Object} state             Customers reducer state
   * @param  {Array}  options.customers Customers action payload
   * @return {Object}                   Return new reducer state
   */
  updateCustomers = (state = {}, { customers }) => {
    const _customers = [...state.customers]
    customers.forEach(item => {
      delete item.pets
      const index = _customers.findIndex(cus => Number(cus.user_id) === Number(item.user_id))
      if (index > -1) {
        _customers[index] = { ..._customers[index], ...item }
      } else {
        _customers.unshift(item)
      }
    })

    return {
      ...state,
      loading: false,
      loadingMessage: null,
      customers: _customers,
      error: null
    }
  }

  /**
   * [updatecustomersProfile description]
   * @param  {Object} state                    [description]
   * @param  {[type]} options.customersProfile [description]
   * @return {[type]}                          [description]
   */
  updateCustomersProfile = (state = {}, { customerProfile }) => {
    const _updatecustomer = state.customers.map(item => {
      if (item.user_id.toString() === customerProfile.user_id.toString()) {
        return customerProfile
      }
      return item
    })
    return this.updateCustomers(state, { customers: _updatecustomer })
  }

  /**
   * [description]
   * @param  {[type]} state            [description]
   * @param  {[type]} options._service [description]
   * @param  {[type]} options.user_id  [description]
   * @return {[type]}                  [description]
   */
  updateCustomerServiceRate = (state, { _service, user_id }) => { // eslint-disable-line camelcase
    const customers = state.customers.map(item => {
      if (item.user_id.toString() === user_id.toString()) {
        item.service_types_cost = _service.service_types
        item.services = _service.service_types_customer
      }
      return item
    })
    return this.updateCustomers(state, { customers })
  }

  /**
   * [updatePaymentInformation description]
   * @param  {Object} state                      [description]
   * @param  {[type]} options.paymentInformation [description]
   * @return {[type]}                            [description]
   */
  updatePaymentInformation = (state = {}, { paymentInformation }) => {
    const customers = state.customers.map(c => {
      if (`${c.user_id}` === `${paymentInformation.user_id}`) {
        return {
          ...c,
          paymentInformation: { ...paymentInformation }
        }
      }
      return c
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      customers: _.cloneDeep(customers),
      error: null
    }
  }

  /**
   * [updatePaymentInformationOfUser description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  updatePaymentInformationOfUser = (state = {}, { paymentInformation }) => {
    const customers = state.customers.map(c => {
      if (c.user_id === paymentInformation.user_id) {
        return {
          ...c,
          paymentInformation
        }
      }
      return c
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      customers,
      error: null
    }
  }
}

export const customersModel = new CustomersModel()
