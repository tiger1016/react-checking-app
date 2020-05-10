/**
 * Returns collection of addons formated for use in walk edit modal.
 * @param  {Array}  addons Addons array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of addons for use in edit modal.
 */
export default (addons = []) => {
  var a = addons.slice()
  return a.map(addon => ({
    value: addon.id.toString(),
    label: addon.name,
    className: 'Addons' + '-filter ' + addon.id.toString(),
    cost: addon.price
  }))
}
