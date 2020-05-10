/**
 * Returns collection of services formated for use in scheduler dropdown search.
 * @param  {Array}  services Services array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of services for usscheduler dropdown search.
 */
export default (services = []) => {
  var s = services.slice()
  return s.map(service => ({
    value: service.dropdown_description,
    label: service.dropdown_description,
    className: 'Search' + '-filter ' + service.dropdown_description
  }))
}
