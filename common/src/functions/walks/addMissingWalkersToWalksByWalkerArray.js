// Libraries
import _ from 'lodash'

/**
 * Completes a walks by walker array to include all walkers as defined in the walkers list
 * returned by the api or the reducer
 * @param {Array} walksByWalkerArray    Walks by walker array
 * @param {Array} activeWalkers         All walkers in the system as returnes by walkers API
 */
export default (walksByWalkerArray = [], allWalkers = []) => {
  allWalkers.forEach(walker => {
    const walkerPresent = _.find(walksByWalkerArray, w => Number(w.walker_id) === Number(walker.user_id))
    if (!walkerPresent) {
      walksByWalkerArray.push({
        walker_id: walker.user_id,
        walker_name: walker.first_name + ' ' + walker.last_name,
        walks: []
      })
    }
  })
  return walksByWalkerArray
}
