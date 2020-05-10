/**
 * Returns collection of customers formated for use in scheduler dropdown search.
 * @param  {Array}  customers Customers array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of customers for usscheduler dropdown search.
 */
export default (customers = []) => {
  var c = customers.slice()
  return c.map(customer => ({
    value: customer.first_name + ' ' + customer.last_name,
    label: customer.first_name + ' ' + customer.last_name,
    className: 'Search' + '-filter ' + customer.first_name + ' ' + customer.last_name
  }))
}
