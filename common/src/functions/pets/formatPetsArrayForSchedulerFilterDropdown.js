/**
 * Returns collection of pets formated for use in scheduler dropdown filter.
 * @param  {Array}  pets Pets array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of pets for usscheduler dropdown filter.
 */
export default (pets = []) => {
  var p = pets.slice()
  p.unshift({ id: -1, name: 'All Pets' })
  return p.map(pet => ({
    label: pet.name,
    value: pet.id
  }))
}
