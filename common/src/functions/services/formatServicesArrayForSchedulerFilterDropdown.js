/**
 * Returns collection of services formated for use in scheduler dropdown filter.
 * @param  {Array}  services Services array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of services for usscheduler dropdown filter.
 */
export default (services = []) => {
  var s = services.slice()
  s.unshift({ id: -1, dropdown_description: 'All Services' })
  return s.map(service => ({
    label: service.dropdown_description,
    value: service.id
  }))
}
