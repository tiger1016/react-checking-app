/**
 * Returns collection of pets formated for use in scheduler dropdown search.
 * @param  {Array}  pets Pets array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of pets for usscheduler dropdown search.
 */
export default (pets = []) => {
  var p = pets.slice()
  return p.map(pet => ({
    value: pet.name,
    label: pet.name,
    className: 'Search' + '-filter ' + pet.name
  }))
}
