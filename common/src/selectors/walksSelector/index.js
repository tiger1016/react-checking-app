// Libraries
import { createSelector } from 'reselect'
import moment from 'moment'

// Functions
import { walksFunctions } from '../../functions'

// Utils
import { dateTimeUtil } from '../../utils'

// Selectors
import { walkersSelector } from '../walkersSelector'

// Base Selectors
export const endTimeSelector = state => state.walks.end_time
export const errorSelector = state => state.walks.error
export const frequenciesSelector = state => state.walks.frequencies
export const loadingSelector = state => state.walks.loading
export const loadingMessageSelector = state => state.walks.loadingMessage
export const progressSelector = state => state.walks.progress
export const progressTotalSelector = state => state.walks.progressTotal
export const startTimeSelector = state => state.walks.start_time
export const updatingSelector = state => state.walks.updating
export const walksSelector = state => state.walks.walks

export const walksOfStartDateDay = createSelector(
  [walksSelector, startTimeSelector],
  (walks, startTime) => {
    return walks.filter(w => dateTimeUtil.toWalkKeyFormat(w.requested_time) === dateTimeUtil.toWalkKeyFormat(startTime))
  }
)

export const walksOfStartDateMonth = createSelector(
  [walksSelector, startTimeSelector],
  (walks, startTime) => {
    const month = dateTimeUtil.month(startTime)
    return walks.filter(w => {
      const walksInMonth = month.daysArray.filter(d => dateTimeUtil.toWalkKeyFormat(d) === dateTimeUtil.toWalkKeyFormat(w.requested_time))
      return walksInMonth.length > 0
    })
  }
)

export const walksOfStartDateWeek = createSelector(
  [walksSelector, startTimeSelector],
  (walks, startTime) => {
    const week = dateTimeUtil.week(startTime)
    return walks.filter(w => {
      const walksInWeek = week.daysArray.filter(d => dateTimeUtil.toWalkKeyFormat(d) === dateTimeUtil.toWalkKeyFormat(w.requested_time))
      return walksInWeek.length > 0
    })
  }
)

/**
 * Creates selector that  converts walks object coming from API (organized by date)
 * into a walks object organized by walker
 * @param  {Object} walks Walks object as returned by api
 * @return {Object}       Walks object organized by walker
 */
export const walksObjectByWalker = createSelector(
  walksSelector,
  walks => {
    return walksFunctions.walksObjectByWalker(walks)
  }
)

/**
 * Creates selector that converts walks object organized by date
 * into a walks array organized by walker
 * @param  {Object} walkers Walks object organized by walker
 * @return {Array}          Walks array organized by walker
 */
export const walksArrayByWalker = createSelector(
  walksSelector,
  walks => {
    return walksFunctions.walksArrayByWalker(walks)
  }
)

/**
 * [description]
 * @param  {[type]} [walksArrayByWalker  [description]
 * @param  {[type]} walkersSelector]     [description]
 * @param  {[type]} (walksArrayByWalker, walkers       [description]
 * @return {[type]}                      [description]
 */
export const walksArrayByWalkerWithMissingWalkers = createSelector(
  [walksArrayByWalker, walkersSelector],
  (walksArrayByWalker, walkers) => {
    return walksFunctions.addMissingWalkersToWalksByWalkerArray(walksArrayByWalker, walkers)
  }
)

/**
 * Creates selector that returns an array of the date keys
 * in the walks object returned by the api
 * @type {Array}      Array of date strings
 */
export const dateKeysFromWalksObject = createSelector(
  walksSelector,
  walks => {
    return walksFunctions.dateKeysFromWalksObject(walks)
  }
)

/**
 * (Factory) Returns a memoize selector to get walks of day
 * @param  {Object} walks     walks object as returned from api
 * @param  {String} startTime Start date time of walks
 * @return {Array}            Walks array by walker
 */
export const walksArrayOfDayByWalker = createSelector(
  [walksSelector, startTimeSelector],
  (walks, startTime) => {
    const dayFormatted = dateTimeUtil.toWalkKeyFormat(startTime)
    const walksOfDay = walks[dayFormatted]
    const walksObjectOfDay = {
      [dayFormatted]: walksOfDay
    }
    return walksFunctions.walksArrayByWalker(walksObjectOfDay)
  }
)

/**
 * [description]
 * @param  {[type]} [walksSelector     [description]
 * @param  {[type]} startTimeSelector] [description]
 * @param  {[type]} (walks,            startTime     [description]
 * @return {[type]}                    [description]
 */
export const walksArrayOfWeekByWalker = createSelector(
  [walksSelector, startTimeSelector],
  (walks, startTime) => {
    const weekObject = dateTimeUtil.week(startTime)
    const weekDaysInWalkKeyFormat = weekObject.daysArray.map(d => dateTimeUtil.toWalkKeyFormat(d))
    const walksObjectOfWeek = {}
    for (var i = 0; i < weekDaysInWalkKeyFormat.length; i++) {
      walksObjectOfWeek[weekDaysInWalkKeyFormat[i]] = walks[weekDaysInWalkKeyFormat[i]] || {}
    }
    return walksFunctions.walksArrayByWalker(walksObjectOfWeek)
  }
)

/**
 * [description]
 * @param  {[type]} [walksArrayOfDayByWalker [description]
 * @param  {[type]} walkersSelector]         [description]
 * @param  {[type]} (walksArrayByWalker,     walkers       [description]
 * @return {[type]}                          [description]
 */
export const walksArrayByWalkerOfDayWithMissingWalkers = createSelector(
  [walksArrayOfDayByWalker, walkersSelector],
  (walksArrayByWalker, walkers) => {
    return walksFunctions.addMissingWalkersToWalksByWalkerArray(walksArrayByWalker, walkers)
  }
)

/**
 * [description]
 * @param  {[type]} [walksArrayOfWeekByWalker [description]
 * @param  {[type]} walkersSelector]          [description]
 * @param  {[type]} (walksArrayByWalker,      walkers       [description]
 * @return {[type]}                           [description]
 */
export const walksArrayByWalkerOfWeekWithMissingWalkers = createSelector(
  [walksArrayOfWeekByWalker, walkersSelector],
  (walksArrayByWalker, walkers) => {
    return walksFunctions.addMissingWalkersToWalksByWalkerArray(walksArrayByWalker, walkers)
  }
)

/**
 * [description]
 * @param  {[type]} walkers [description]
 * @return {[type]}         [description]
 */
export const uniqueWalkersIdsArrayFromWalksArrayByWalker = createSelector(
  walksArrayByWalker,
  walkers => {
    return walkers.map(w => w.walker_id)
  }
)

/**
 * Returns an array of moment objects mapped from
 * the array of date strings in dateKeysFromWalksObject selector
 * @param  {Array} dates  Date strings array
 * @return {Array}        Array of moment objects
 */
export const dateKeysFromWalksObjectInMomentFormat = createSelector(
  dateKeysFromWalksObject,
  dates => {
    return dates.map(d => moment(d).format())
  }
)
