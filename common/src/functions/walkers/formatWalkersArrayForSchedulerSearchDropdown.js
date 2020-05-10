/**
 * Returns collection of walkers formated for use in scheduler dropdown search.
 * @param  {Array}  walkers Walkers array as stored by reducer or as returned by api.
 * @return {Array}          Formatted collection of walkers for usscheduler dropdown search.
 */
export default (walkers = []) => {
  var w = walkers.slice()
  return w.map(walker => ({
    value: walker.first_name + ' ' + walker.last_name,
    label: walker.first_name + ' ' + walker.last_name,
    className: 'Search' + '-filter ' + walker.first_name + ' ' + walker.last_name
  }))
}
