export default (services = [], type) => {
  const _services = services.filter(item => !item.new && !item.newAdded)
  const _newServices = services.filter(item => item.new || item.newAdded)
  let _sortedServices = _services
  if (type === 'name') {
    _sortedServices = _services.sort((a, b) => {
      if (a.dropdown_description.toUpperCase() < b.dropdown_description.toUpperCase()) return -1
      if (a.dropdown_description.toUpperCase() > b.dropdown_description.toUpperCase()) return 1
      return 0
    })
  }
  return [..._newServices, ..._sortedServices]
}
