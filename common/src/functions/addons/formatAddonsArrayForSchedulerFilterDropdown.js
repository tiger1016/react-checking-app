/**
 * Returns collection of addons formated for use in scheduler dropdown filter.
 * @param  {Array}  addons Addons array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of addons for usscheduler dropdown filter.
 */
export default (addons = []) => {
  var a = addons.slice()
  a.unshift({ active_addon_id: -1, name: 'All Addons' })
  return a.map(addon => ({
    label: addon.name,
    value: addon.active_addon_id
  }))
}
