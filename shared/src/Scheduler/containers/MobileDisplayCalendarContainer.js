// Libraries
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Fuse from 'fuse.js'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
// import {MenuContext} from 'react-native-menu'

// Components
import DatePickerButton from '../components/DatePickerButton'
import Loader from '../../globalComponents/Loader'
// import MobileDayTimeDivider from '../components/MobileDayTimeDivider'
// import MobileSingleUserTimeline from '../components/MobileSingleUserTimeline'
import MobileHorizontalScrollMenu from '../components/MobileHorizontalScrollMenu'
import SearchButton from '../components/SearchButton'
import WalkersList from './WalkersList'
import AllStatusComponent from '../components/AllStatusComponent'
// import StatusComponent from '../components/StatusComponent'

// Utils
import { dateTimeUtil, logger } from '../../../utils'
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

// Controller
import { walksController, schedulerController, servicesController, appController } from '../../../controllers'
const resolvedStyle = (process.env.PLATFORM_ENV && process.env.PLATFORM_ENV === 'web') ? 'containerWeb' : 'containerNative'

class MobileDisplayCalendarContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      dayPickerMode: 'day',
      days: [],
      error: null,
      inSearch: false,
      mode: 'day',
      selectedDay: null,
      selectedTime: null,
      times: [],
      selectedDays: [],
      scrollTo: null,
      searchResults: [],
      searchValue: '',
      slotsOffsets: []
    }
  }

  componentWillMount () {
    // Returns start date, and end date for today
    var { start, end, date, daysArray } = dateTimeUtil.day()
    logger.log('ComponentWillMount', [date])
    this.setState({ selectedDays: daysArray })
    walksController.actions.fetchWalks(start, end)
    // walksController.actions.fetchWalks('2018-10-10T00:00:00+05:30', '2018-10-10T23:59:59+05:30')
  }

  componentWillReceiveProps (nextProps) {
    if ((!this.state.days.length && !this.state.days.length) || !_.isEqual(this.props.walks.walks, nextProps.walks)) {
      const days = this._processWalksData(nextProps.walks)
      if (days.length > 1) {
        var pDays = []
        var newWalkers = []
        var newWalks = []
        _.each(days, day => {
          newWalkers = []
          _.each(day.walkers, walker => {
            newWalks = []
            _.each(walker.walks, walk => {
              var spl = walker.walker_name.split(' ')
              var walker_first_name = spl[0] // eslint-disable-line camelcase
              var walker_last_name = spl.pop() // eslint-disable-line camelcase
              newWalks.push({
                ...walk,
                walker_name: walker.walker_name,
                walker_first_name,
                walker_last_name,
                walker_id: walker.walker_id
              })
            })
            newWalkers.push({
              id: walker.walker_id,
              name: walker.walker_name,
              walks: newWalks
            })
          })
          pDays.push({
            date: day.date,
            walkers: newWalkers
          })
        })
        this.setState({
          days: pDays,
          error: null,
          mode: 'week',
          selectedDay: pDays[0],
          selectedTime: null,
          times: []
        })
        logger.log('<MobileDisplayCalendarContainer /> Processed data (Week mode)', pDays)
      } else if (days.length === 1) {
        const times = {}
        _.each(days[0].walkers, walker => {
          _.each(walker.walks, walk => {
            if (!times[moment(walk.requested_time).format('h a')]) {
              times[moment(walk.requested_time).format('h a')] = []
            }
            var spl = walker.walker_name.split(' ')
            var walker_first_name = spl[0] // eslint-disable-line camelcase
            var walker_last_name = spl.pop() // eslint-disable-line camelcase
            times[moment(walk.requested_time).format('h a')].push({
              ...walk,
              walker_name: walker.walker_name,
              walker_first_name,
              walker_last_name,
              walker_id: walker.id
            })
          })
        })
        const timesDigest = []
        _.each(times, (walks, date_time) => { // eslint-disable-line camelcase
          timesDigest.push({
            hour: date_time,
            walks
          })
        })
        this.setState({
          days: [],
          error: null,
          mode: 'day',
          selectedDay: null,
          selectedTime: timesDigest[0],
          times: timesDigest
        })
        logger.log('<MobileDisplayCalendarContainer /> Processed data (Day mode)', timesDigest)
      }
    }
  }

  _dayView = mode => {
    if (this.state.inSearch) {
      return <WalkersList openModal={this._openModal} setSlotOffset={this._setSlotOffset} setListViewRef={this._setListViewRef} scrollTo={this.state.scrollTo} mode={mode} selected={this.state.searchResult[0]} items={this.state.searchResult} searchValue={this.state.searchValue} inSearch={this.state.inSearch} />
    }
    if (this.state.selectedTime !== null && typeof this.state.selectedTime === 'object') {
      return <WalkersList openModal={this._openModal} setSlotOffset={this._setSlotOffset} setListViewRef={this._setListViewRef} scrollTo={this.state.scrollTo} mode={mode} selected={this.state.selectedTime} items={this.state.times} />
    }
    return null
  }

  _openModal = walk => {
    appController.actions.toggleModal({
      modalIdentifier: appController.constants.ADD_WALK_MODAL_IDENTIFIER,
      canClose: true,
      isOpen: true,
      data: { walk: walk }
    })
  }

  _nextDate = () => {
    var sd = this.state.selectedDays.slice()
    if (this.state.mode === 'day') {
      const { start, end, daysArray } = dateTimeUtil.nextDay(sd[0])
      const selectedDays = daysArray
      this.setState({ selectedDays })
      walksController.actions.fetchWalks(start, end)
      logger.log('<MobileDisplayCalendarContainer /> Selected Days', selectedDays)
    } else {
      const { start, end, daysArray } = dateTimeUtil.nextWeek(sd[0])
      const selectedDays = daysArray
      this.setState({ selectedDays })
      walksController.actions.fetchWalks(start, end)
      logger.log('<MobileDisplayCalendarContainer /> Selected Days', selectedDays)
    }
  }

  _previousDate = () => {
    var sd = this.state.selectedDays.slice()
    if (this.state.mode === 'day') {
      const { start, end, daysArray } = dateTimeUtil.previousDay(sd[0])
      const selectedDays = daysArray
      this.setState({ selectedDays })
      walksController.actions.fetchWalks(start, end)
      logger.log('<MobileDisplayCalendarContainer /> Selected Days', selectedDays)
    } else {
      const { start, end, daysArray } = dateTimeUtil.previousWeek(sd[0])
      const selectedDays = daysArray
      this.setState({ selectedDays })
      walksController.actions.fetchWalks(start, end)
      logger.log('<MobileDisplayCalendarContainer /> Selected Days', selectedDays)
    }
  }

  _processWalksData = walksByWalker => {
    const days = []
    _.each(walksByWalker, (walker) => {
      _.each(walker.walks, walk => {
        const date = moment(walk.requested_time).format('YYYY-MM-D')
        const _dayInDays = days.find(day => day.date === date)
        if (_dayInDays) {
          const dayWalker = _dayInDays.walkers.find(innerWalker => innerWalker.walker_id === walker.walker_id)
          if (dayWalker) {
            dayWalker.walks.push(walk)
          } else {
            _dayInDays.walkers.push({ walker_id: walker.walker_id, walker_name: walker.walker_name, walks: [walk] })
          }
        } else {
          days.push({ date: date, walkers: [{ walker_id: walker.walker_id, walker_name: walker.walker_name, walks: [walk] }] })
        }
      })
      // Get only walkers with walks assigned
      // _.each(walker.walks, walk => {
      //   if (walker.walks) {
      //     walkers.push(walker)
      //   }
      // })
      // // Transform respnose to array of objects
      // days.push({date, walkers})
    })
    return days
  }

  _scrollToRow = (event, rowId) => {
    const scrollToPosition = (this.state.slotsOffsets[rowId] - this.listView.petcheck.offset)
    if (process.env.PLATFORM_ENV && process.env.PLATFORM_ENV === 'web') {
      // window.scrollTo(0,scrollToPosition)
      this.listView.scrollTo({ y: scrollToPosition })
    }
  }

  _search = value => {
    if (value) {
      var matches = []
      var options = {
        shouldSort: true,
        threshold: 0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        id: 'walk_id',
        keys: [
          'walker_first_name',
          'walker_last_name',
          'walker_name',
          'customer_first',
          'customer_last',
          'customer_name',
          'pets.name'
        ]
      }
      if (this.state.mode === 'day') {
        const result = []
        _.each(this.state.times, time => {
          var f = new Fuse(time.walks, options)
          result.push(f.search(value.trim()))
        })
        const fResult = _.flattenDeep(result)
        let matchedWalks = []
        _.each(this.state.times, time => {
          matchedWalks = []
          _.each(time.walks, walk => {
            if (_.indexOf(fResult, walk.walk_id) > -1) {
              matchedWalks.push(walk)
            }
          })
          if (matchedWalks.length) {
            matches.push({
              hour: time.hour,
              walks: matchedWalks
            })
          }
        })
      } else {
        const result = []
        _.each(this.state.days, day => {
          _.each(day.walkers, walker => {
            var f = new Fuse(walker.walks, options)
            result.push(f.search(value.trim()))
          })
        })
        const fResult = _.flattenDeep(result)
        let matchedWalkers = []
        let matchedWalks = []
        _.each(this.state.days, day => {
          matchedWalkers = []
          _.each(day.walkers, walker => {
            matchedWalks = []
            _.each(walker.walks, walk => {
              if (_.indexOf(fResult, walk.walk_id) > -1) {
                matchedWalks.push(walk)
              }
            })
            if (matchedWalks.length) {
              matchedWalkers.push({
                id: walker.id,
                name: walker.name,
                walks: matchedWalks
              })
            }
          })
          if (matchedWalkers.length) {
            matches.push({
              date: day.date,
              walkers: matchedWalkers
            })
          }
        })
      }
      logger.log('<MobileDisplayCalendarContainer /> Search Result', matches)
      this.setState({ inSearch: true, searchResult: matches, searchValue: value })
    } else {
      this.setState({ inSearch: false, searchResult: [], searchValue: '' })
    }
  }

  _selectDay = (day, mode) => {
    if (mode === 'day') {
      const { start, end, daysArray } = dateTimeUtil.day(day)
      const selectedDays = daysArray
      logger.log('<MobileDisplayCalendarContainer /> Selected Days', selectedDays)
      this.setState({ selectedDays, mode })
      walksController.actions.fetchWalks(start, end)
    } else {
      const { start, end, daysArray } = dateTimeUtil.week(day)
      const selectedDays = daysArray
      logger.log('<MobileDisplayCalendarContainer /> Selected Days', selectedDays)
      this.setState({ selectedDays, mode })
      walksController.actions.fetchWalks(start, end)
    }
  }

  _setListViewRef = ref => {
    if (ref && process.env.PLATFORM_ENV && process.env.PLATFORM_ENV === 'web') {
      // ref.measure((fx, fy, width, height, px, py) => {
      //   this.listView = ref
      //   this.listView.petcheck = {
      //     offset: py
      //   }
      // })
    }
  }

  _setSlotOffset = (index, offset) => {
    var slotsOffsets = this.state.slotsOffsets
    slotsOffsets[index] = offset
    this.setState({ slotsOffsets })
  }

  _weekView = mode => {
    if (this.state.inSearch) {
      return <WalkersList openModal={this._openModal} setSlotOffset={this._setSlotOffset} setListViewRef={this._setListViewRef} scrollTo={this.state.scrollTo} mode={mode} selected={this.state.searchResult[0]} items={this.state.searchResult} inSearch={this.state.inSearch} searchValue={this.state.searchValue} />
    }
    if (this.state.selectedDay !== null && typeof this.state.selectedDay === 'object') {
      return <WalkersList openModal={this._openModal} setSlotOffset={this._setSlotOffset} setListViewRef={this._setListViewRef} scrollTo={this.state.scrollTo} mode={mode} selected={this.state.selectedDay} items={this.state.days} />
    }
    return null
  }

  render () {
    logger.rlog('<MobileDisplayCalendarContainer />', this)
    return <View className='MobileDisplayCalendarContainer' style={styles[resolvedStyle]}>
      {this.props.walksFullLoading ? <Loader /> : null}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <DatePickerButton openDatePicker={this._openDatePicker} previousDate={this._previousDate} walks={this.props.walks} nextDate={this._nextDate} />
        <AllStatusComponent title='all statuses' icons='md-more' />
      </View>
      <MobileHorizontalScrollMenu scrollTo={this._scrollToRow} mode={this.state.mode} items={this.state.mode === 'week' ? this.state.days : this.state.times} />
      <SearchButton searchValue={this.state.searchValue} search={this._search} />
      {this.state.mode === 'week' ? this._weekView(this.state.mode) : this._dayView(this.state.mode)}
    </View>
  }
}
// <StatusComponent title="in process" showCircle={true} circleColor={{backgroundColor: 'orange'}} buttonSelected={false} clickable= { () => {console.log("Test passed")}} />

const styles = StyleSheet.create({
  containerNative: {
    flex: 1,
    padding: format_number(10, 'px')
  },
  containerWeb: {
    padding: format_number(10, 'px'),
    width: '100%',
    height: '100%'
  }
})

const mapStateToProps = (state, props) => {
  // Fetch walks of day if do not exist in store
  // All this can be optimized with reselect

  const walksByWalker = schedulerController.processWalks(state, walksController.walksOfMonth(state), {})

  // walksByWalker = _.flatten(walksByWalker.map(w => w.walks))

  console.log(walksByWalker)

  const targetDay = state.walks.start_time || new Date()
  const walkDatesArray = _.uniq(state.walks.walks.map(w => dateTimeUtil.toWalkKeyFormat(w.requested_time)))
  let walksOfMonthExist = false
  if (dateTimeUtil.monthOfDayExistsInArray(targetDay, walkDatesArray)) {
    walksOfMonthExist = true
  }

  return {
    services: servicesController.selectActiveServices(state),
    startDateTime: state.walks.start_time,
    targetDay,
    walks: walksByWalker,
    walksFullLoading: state.walks.loading && state.walks.loadingEvent === 'fetch',
    walksOfMonthExist,
    customers: state.customers,
    session: state.session
  }
}

export default connect(mapStateToProps)(MobileDisplayCalendarContainer)
