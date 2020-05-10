/**
 * Returns collection of pets formated for use in walk edit modal.
 * @param  {Array}  pets Pets array as stored by reducer or as returned by api.
 * @return {Array}         Formatted collection of pets for use in edit modal.
 */
export default (pets = []) => {
  const p = pets.slice()
  p.unshift({ name: 'All Pets', id: 'All Pets', customer_id: '0' })
  return p.map(pet => ({
    value: pet.id.toString(),
    label: pet.name,
    className: 'Pets' + '-filter ' + pet.id.toString(),
    valueKey: pet.customer_id.toString()
  }))
}
