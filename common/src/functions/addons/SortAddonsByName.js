export default (addons = []) => {
  const _addons = addons.filter(item => !item.new && !item.newAdded)
  const _newAddons = addons.filter(item => item.new || item.newAdded)
  const _sortedAddons = _addons.sort((a, b) => {
    if (a.name && b.name) {
      a.addon_name = a.name
      b.addon_name = b.name
    }
    if (!a.addon_name || !b.addon_name) return 0
    if (a.addon_name.toUpperCase() < b.addon_name.toUpperCase()) return -1
    if (a.addon_name.toUpperCase() > b.addon_name.toUpperCase()) return 1
    return 0
  })
  return [..._newAddons, ..._sortedAddons]
}
