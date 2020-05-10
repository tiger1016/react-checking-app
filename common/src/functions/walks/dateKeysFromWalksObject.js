/**
 * Returns an array of the dates keys in the walks object
 * returned by api
 * @param  {Object} walks Walks object as returned from api
 * @return {Array}        Array of date strings
 */
export default (walks = {}) => {
  const dates = []
  for (const date in walks) {
    if (Object.prototype.hasOwnProperty.call(walks, date)) {
      dates.push(date)
    }
  }
  return dates
}
