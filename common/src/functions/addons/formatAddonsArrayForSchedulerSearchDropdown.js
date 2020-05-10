/**
 * Returns collection of addons formated for use in scheduler dropdown search.
 * @param  {Array}  addons Addons array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of addons for usscheduler dropdown search.
 */
export default (addons = []) => {
  var a = addons.slice()
  return a.map(addon => ({
    value: addon.id.toString(),
    label: addon.name,
    className: 'Search' + '-filter ' + addon.id.toString()
  }))
}
