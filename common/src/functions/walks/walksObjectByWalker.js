/**
 * [walksByWalkerObjectFormat description]
 * @param  {[type]} walks [description]
 * @return {[type]}       [description]
 */
export default (walks = {}) => {
  const walkers = {}
  for (const day in walks) {
    if (Object.prototype.hasOwnProperty.call(walks, day)) {
      if (walks[day] && walks[day].walkers) {
        for (const walker in walks[day].walkers) {
          if (Object.prototype.hasOwnProperty.call(walks[day].walkers, walker)) {
            if (!walkers[walker]) {
              walkers[walker] = []
            }
            if (walks[day].walkers[walker].walks) {
              walks[day].walkers[walker].walks.forEach(walk => {
                walkers[walker].push({ ...walk, walker_id: walker, walker_name: walks[day].walkers[walker].name })
              })
            }
          }
        }
      }
    }
  }
  return walkers
}
