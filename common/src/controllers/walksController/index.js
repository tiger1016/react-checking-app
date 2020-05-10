// Libraries
import _ from 'lodash'
import { bindActionCreators } from 'redux'
// import moment from 'moment'
import moment from 'moment-timezone'
// Constants
import * as CONSTANTS from '../../constants/walks'

// Controllers
import BaseController from '../baseController'

// Store
import { store } from '../../store'

// Actions
import actions from '../../actions/walks'

// Selectors
import { addonsSelector, walkersSelector, walksSelector } from '../../selectors'

class WalksController extends BaseController {
  /**
   * Initializes walks controller
   * @return {Void}
   */
  constructor () {
    /**
     * Required super call to use `this` in constructor
     */
    super()
    /**
     * Creates references to action creatores and binds them to store dispatch for eaiser access and usage
     * @type {Object}
     */
    this.actions = bindActionCreators(actions, store.dispatch)
    /**
     * Creates reference to constants
     */
    this.constants = CONSTANTS
  }

  /**
   * [addAllWalkersToWalks description]
   * @param {[type]} state                [description]
   * @param {Array}  walksGroupedByWalker [description]
   */
  addAllWalkersToWalks (state, walksGroupedByWalker = []) {
    const walksByWalkerArray = [...walksGroupedByWalker]
    const allWalkers = walkersSelector.walkersSelector(state)
    allWalkers.forEach(walker => {
      const walkerPresent = _.find(walksByWalkerArray, w => Number(w.walker_id) === Number(walker.user_id))
      if (!walkerPresent) {
        walksByWalkerArray.push({
          walker_id: Number(walker.user_id),
          walker_name: walker.first_name + ' ' + walker.last_name,
          walks: []
        })
      }
    })
    return walksByWalkerArray
  }

  /**
   * Find first walk whose id is in an array of ids
   * @param  {Object} walks Walks object as stored by reducer
   * @param  {Array}  ids   Array of ids to search
   * @return {Object}       Walk object if matched, null otherwise
   */
  findFirstInIds (walks = {}, ids = []) {
    let found = null
    for (var day in walks) {
      if (Object.prototype.hasOwnProperty.call(walks, day)) {
        for (var walker in walks[day].walkers) {
          if (Object.prototype.hasOwnProperty.call(walks[day].walkers, walker)) {
            if (walks[day].walkers[walker] && walks[day].walkers[walker].walks) {
              found = _.find(walks[day].walkers[walker].walks, w => _.indexOf(ids, w.walk_id) > -1)
              if (found) {
                return found
              }
            }
          }
        }
      }
    }
    return found
  }

  /**
   * [description]
   * @param  {[type]} walk [description]
   * @return {[type]}      [description]
   */
  getProgress = (walk) => {
    if (this.getStatus(walk) === 'in_process' && walk.start) {
      let length = walk.length
      if (walk.walk_length) {
        length = moment.duration(walk.walk_length).asMinutes()
      }
      const utcOffset = this.state() && this.state().session.user.utc_offset

      const now = moment().utcOffset(Number(utcOffset) * 60)
      const walkStartTime = moment(walk.start).utcOffset(Number(utcOffset) * 60, true)

      const diffInMinutesRounded = Math.round(now.diff(walkStartTime, 'minutes'))
      const processPercentage = 100 * diffInMinutesRounded / Number(length)
      return processPercentage > 100 ? 100 : processPercentage
    }
    return 0
  }

  /**
   * [description]
   * @param  {[type]} walk [description]
   * @return {[type]}      [description]
   */
  getProgressFill = (walk) => {
    const processPercentage = this.getProgress(walk)
    return `linear-gradient(to right, green ${processPercentage}%, lightgreen ${processPercentage}%)`
  }

  /**
   * Returns the status of a walk
   * @param  {Object} walk Walk object
   * @return {String}      Walk status
   */
  getStatus (walk = {}) {
    if (!walk) {
      return ''
    }
    const hasChangeRequestedRevision = _.find(walk.revision_history, r => (r.revision_status === 'pending'))
    const hasCancelRequestedRevision = _.find(walk.revision_history, r => (r.revision_status === 'cancel_requested'))
    if ((walk.status === 'approved' || walk.status === 'in_process') && hasChangeRequestedRevision) {
      return 'change_requested'
    }
    if ((walk.status === 'approved' || walk.status === 'in_process') && hasCancelRequestedRevision) {
      return 'cancel_requested'
    }
    if (walk.status === 'approved') {
      const utcNow = moment().utc().format('YYYY-MM-DD HH:mm:ss')
      const walkGmt = moment(walk.gmt_requested_time).format('YYYY-MM-DD HH:mm:ss')
      if (new Date(utcNow) > new Date(walkGmt)) {
        return 'late'
      }
    }
    return walk.status
  }

  /**
   * [description]
   * @param  {[type]} walk [description]
   * @return {[type]}      [description]
   */
  getStatusFill = (walk) => {
    switch (this.getStatus(walk)) {
      case 'approved':
        return 'lightgreen'
      case 'change_requested':
        return 'rgba(128, 128, 128, 0.6)'
      case 'cancel_requested':
        return 'rgba(128, 128, 128, 0.6)'
      // return 'rgb(255, 239, 176)'
      case 'completed':
        return 'green'
      case 'in_process':
        return this.getProgressFill(walk)
      case 'late':
        return 'rgb(255, 0, 0,0.6)'
      // return '#e01111'
      case 'pending':
        return 'rgb(255, 0, 0,0.6)'
      // return 'rgb(255, 239, 176)'
    }
  }

  /**
   * Returns color of walk status to be used preferably as foreground
   * @param  {Object} walk Walk Object
   * @return {String}      Hex foreround color of status
   */
  getStatusForegroundColor (walk = {}) {
    return '#333'
  }

  /**
   * Returns the status of a walk pretty formatted
   * @param  {Object} walk Walk object
   * @return {String}      Walk status
   */
  getStatusTitle = (walk = {}) => {
    switch (this.getStatus(walk)) {
      case 'in_process':
        return 'In Progress'
      case 'completed':
        return 'Completed'
      case 'approved':
        return 'Approved'
      case 'cancel_requested':
        return 'Cancel Requested'
      case 'change_requested':
        return 'Change Requested'
      case 'pending':
        return 'Pending'
      case 'late':
        return 'Late'
      default:
        return null
    }
  }

  getWalkAddons = (state, walk = {}) => {
    const addons = addonsSelector.addonsSelector(state)
    const wa = walk.addons.filter(a => a.active_addon_id !== 'None').map(a => Number(a.active_addon_id))
    const walkAddons = addons.filter(a => wa.includes(Number(a.active_addon_id)))
    return walkAddons
  }

  /**
   * Checks if a walk is late
   * @param  {Object} walk  Walk object
   * @return {Bool}         True if late, fales otherwise
   */
  isWalkLate (walk = {}) {
    return walk.status === 'late'
  }

  /**
   * Add properties to original walk object needed for the scheduler's daily view functionality,
   * to be used in the daily view's Row component
   * @param  {Array}  walks Array of walk objects
   * @param  {Object} props props received by the Row component
   * @return {Array}        modified walks array
   */
  processWalksDailyView (walks = [], props = {}) {
    const {
      minRowHeight,
      dayViewXUnitWidth,
      services
    } = props

    return walks.map((walk, i) => {
      const xStart = moment.duration(moment(walk.requested_time).format('HH:mm:ss')).asMinutes() * dayViewXUnitWidth
      const service = _.find(services.services, o => Number(o.id) === Number(walk.billing_price_group_id))
      let length = 60 * dayViewXUnitWidth
      if (service) {
        length = moment.duration(service.length).asMinutes() * dayViewXUnitWidth
      }
      const height = minRowHeight
      const yStart = i * height
      return {
        ...walk,
        height,
        originalIndex: i,
        inverseLength: -length,
        length,
        xEnd: xStart + length,
        xStart,
        yEnd: yStart + height,
        yStart
      }
    })
  }

  /**
   * Returns revision info for walk
   * @param  {Object} walk Walk object
   * @return {Object}                       Revision info
   * @return {Bool}   Object.hasRevision      true if walk has a revision, false otherwise
   * @return {Object} Object.pendingChanges   Object with info on changes that need to be revised
   * @return {Object} Object.revisionMessage  Revision message
   */
  revision (walk = {}) {
    const pendingRevision = _.find(walk.revision_history, r => r.revision_status === 'pending')
    let hasRevision = false
    if (pendingRevision) {
      hasRevision = true
    }
    let pendingChanges = {}
    let revisionMessage = ''
    if (hasRevision) {
      let revisionsArray = _.split(pendingRevision.revision_changes, '|')
      revisionsArray = revisionsArray.map(r => {
        if (r.length) {
          return JSON.parse(r)
        }
        return false
      }).filter(r => r)
      pendingChanges = _.assign.apply(_, revisionsArray)
      revisionMessage = pendingRevision.revision_message.replace(/&nbsp;/g, ' ')
    }
    return {
      hasRevision,
      pendingChanges,
      revisionMessage
    }
  }

  /**
   * Returns array ofids of walkers(one entry per uniqe walker)
   * @param  {Object} state Store's state
   * @return {Array}       Id's array
   */
  selectUniqueWalkersIdsArrayFromWalksArrayByWalker = (state = null) => walksSelector.uniqueWalkersIdsArrayFromWalksArrayByWalker(state || this.state())

  /**
   * Returns array ofids of walkers(one entry per uniqe walker)
   * @param  {Object} state Store's state
   * @return {Array}       Id's array
   */
  selectWalksArrayByWalker = (state = null) => walksSelector.walksArrayByWalker(state || this.state())

  /**
   * Updates walk object properties to make it stack towards the top of a scheduler row
   * @param  {Object} walk         Walk object as processed by this.processWalksDailyView
   * @param  {Array}  walks        Walks array as processed in dailyView
   * @param  {Number} minRowHeight Minimum row height as configured in daily view
   * @return {Object}              Walk object with new properties
   */
  stackWalkUpwardsDailyView (walk = {}, walks = [], minRowHeight = 0) {
    const collisions = [0]
    walks.forEach(w => {
      if (Number(w.walk_id) !== Number(walk.walk_id)) {
        if ((w.xStart <= walk.xStart && walk.xStart <= w.xEnd) || (w.xStart <= walk.xEnd && walk.xEnd <= w.xEnd)) {
          collisions.push(w.yEnd)
        }
      }
    })
    var openSlots = _.remove(collisions, c => _.findIndex(collisions, c2 => (c2 === c + minRowHeight)) < 0 || false)
    var minSlot = _.min(openSlots)
    return walks.map(w => {
      if (w.walk_id === walk.walk_id) {
        return {
          ...w,
          yStart: minSlot,
          yEnd: minSlot + w.height
        }
      }
      return w
    })
  }

  /**
   * [uniqueWalksOnly description]
   * @param  {Array}  walks [description]
   * @return {[type]}       [description]
   */
  uniqueWalksOnly (walks = []) {
    return walks.filter((walk, index, arr) => {
      return arr.map(walk2 => walk2.walk_id).indexOf(walk.walk_id) === index
    })
  }

  /**
   * Checks if a walk has addons assinged
   * @param  {Object} walk  Walk object
   * @return {Bool}         true if has addons, false otherwise
   */
  walkHasAddons (walk = {}) {
    if (walk) {
      return walk.addons.filter(a => a.active_addon_id !== 'None').length > 0
    }
    return false
  }

  /**
   * [walksGroupedByWalker description]
   * @param  {Array}  walks [description]
   * @return {[type]}       [description]
   */
  walksGroupedByWalker (walks = []) {
    const walksByWalkerId = _.groupBy(walks, 'walker_id')
    const walksArray = []
    for (const walkerId of Object.keys(walksByWalkerId)) {
      walksArray.push({
        walker_name: walksByWalkerId[walkerId][0] ? walksByWalkerId[walkerId][0].walker_name : 'No Name',
        walker_id: Number(walkerId),
        walks: walksByWalkerId[walkerId]
      })
    }
    return walksArray
  }

  /**
   * [walksOfDay description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  walksOfDay (state = null) {
    return walksSelector.walksOfStartDateDay(state)
  }

  /**
   * [walksOfMonth description]
   * @param  {[type]} State [description]
   * @return {[type]}       [description]
   */
  walksOfMonth (state = null) {
    return walksSelector.walksOfStartDateMonth(state)
  }

  /**
   * [walksOfWeek description]
   * @param  {[type]} state [description]
   * @return {[type]}       [description]
   */
  walksOfWeek (state = null) {
    return walksSelector.walksOfStartDateWeek(state)
  }

  fetchWalks () {
    const state = this.state()
    const targetStartDay = state.walks.start_time || new Date()
    const targetEndDay = state.walks.end_time || new Date()
    walksController.actions.fetchWalks(targetStartDay, targetEndDay, false)
  }

  /**
   * [moveUnassignedToTop move unassigned walks to top of table]
   * @param  {[type]} walksByWalker [description]
   * @return {[type]}       [description]
   */
  moveUnassignedToTop (walksByWalker = []) {
    const noWalkerAssinged = walksByWalker.find(w => `${w.walker_id}` === '0')

    if (noWalkerAssinged) {
      walksByWalker = walksByWalker.filter(w => `${w.walker_id}` !== '0')
      walksByWalker.unshift(noWalkerAssinged)
    }
    return walksByWalker
  }
}

export const walksController = new WalksController()
