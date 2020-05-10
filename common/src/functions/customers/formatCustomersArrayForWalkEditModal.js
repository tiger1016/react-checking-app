/**
 * Returns collection of customers formated for use in walk edit modal.
 * @param  {Array}  customers Customers array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of customers for use in edit modal.
 */
export default (customers = []) => {
  var c = customers.slice()
  // c.unshift({first_name: 'All', last_name: 'Customers', customer_id: 'All Customers'})
  return c.sort((a, b) => { if (a.last_name < b.last_name) return -1; if (a.last_name > b.last_name) return 1; return 0 }).map(customer => ({
    value: customer.user_id.toString(),
    label: customer.first_name + ' ' + customer.last_name,
    className: 'Customers' + '-filter ' + customer.user_id.toString(),
    walker_id: customer.walker_id,
    default_service: customer.default_service
  }))
}
