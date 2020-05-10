// Functions
import walksObjectByWalker from './walksObjectByWalker'

/**
 * Converts a walks by date object as returned by api
 * into to a walks by walkers array
 * @param  {Object} walks Walks by date object
 * @return {Array}        Walks by walkers array
 */
export default (walks = {}) => {
  const walkersObject = walksObjectByWalker(walks)
  const walkersArray = []
  for (const walker in walkersObject) {
    if (Object.prototype.hasOwnProperty.call(walkersObject, walker)) {
      if (walkersObject[walker][0]) {
        walkersArray.push({
          walker_id: Number(walker),
          walker_name: walkersObject[walker][0].walker_name,
          walks: walkersObject[walker]
        })
      }
    }
  }
  return walkersArray
}
