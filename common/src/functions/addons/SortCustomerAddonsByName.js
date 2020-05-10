export default (addons = []) => {
  const _addons = addons.filter(item => !item.new && !item.newAdded)
  const _newAddons = addons.filter(item => item.new || item.newAdded)
  const _sortedAddons = _addons.sort((a, b) => {
    if (a.addon_name && b.addon_name) {
      a.name = a.addon_name
      b.name = b.addon_name
    }
    if (a.name.toUpperCase() < b.name.toUpperCase()) return -1
    if (a.name.toUpperCase() > b.name.toUpperCase()) return 1
    return 0
  })
  return [..._sortedAddons, ..._newAddons]
}
