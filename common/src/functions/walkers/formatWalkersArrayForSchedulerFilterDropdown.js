// Libraries
import _ from 'lodash'

/**
 * Returns collection of walkers formated for use in scheduler dropdown filter.
 * @param  {Array}  walkers Addons array as stored by reducer or as returned by api.
 * @return {Array}          Formatted collection of walkers for usscheduler dropdown filter.
 */
export default (walkers = []) => {
  const w = walkers.filter(w => w.active).map(walker => ({
    value: walker.user_id,
    label: walker.first_name.trim() + ' ' + walker.last_name.trim()
  }))
  const sorted = _.sortBy(_.uniqBy(w, 'value'), option => option.label.toLowerCase(), 'label')
  sorted.unshift(
    { value: -1, label: 'All Staff' },
    { value: -2, label: 'All Scheduled Staff' }
  )
  return sorted
}
