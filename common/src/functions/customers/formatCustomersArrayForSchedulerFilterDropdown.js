/**
 * Returns collection of customers formated for use in scheduler dropdown filter.
 * @param  {Array}  customers Customers array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of customers for usscheduler dropdown filter.
 */
export default (customers = []) => {
  var c = customers.slice()
  c.unshift({ first_name: 'All', last_name: 'Customers', user_id: 'All Customers' })
  return c.map(customer => ({
    label: customer.first_name + ' ' + customer.last_name,
    value: customer.user_id
  }))
}
