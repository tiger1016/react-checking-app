/**
 * Returns collection of services formated for use in walk edit modal.
 * @param  {Array}  services Services array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of services for use in edit modal.
 */
export default (services = []) => {
  var s = services.slice()
  // s.unshift({dropdown_description: 'All Services', id: 'All Services'})
  return s.map(service => ({
    value: service.id.toString(),
    label: service.dropdown_description,
    className: 'Services' + '-filter ' + service.id.toString(),
    cost: service.cost
  }))
}
