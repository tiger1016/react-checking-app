// Libraries
import _ from 'lodash'
import moment from 'moment'

class DateTimeUtil {
  constructor () {
    this.moment = moment
    this.walkObjectKeyFormat = 'YYYY-MM-DD'
    this.requestedDateFormat = 'YYYY-MM-DD'
  }

  /**
   * Returns object with useful info about date argument (or current date if no argument)
   * @param  {Date}   day Date object
   * @return {Object}     Custom object with day info
   */
  day (day = new Date()) {
    return {
      date: day,
      daysArray: [moment(day).toDate()],
      end: this.dayEnd(day),
      start: this.dayStart(moment(day).toDate()),
      toDate: this.moment(day).toDate()
    }
  }

  dayEnd (day = new Date()) {
    return this.moment(day).endOf('day').format('YYYY-MM-DD HH:mm:ss')
  }

  dayExistsinArray (day = new Date(), daysInWalkObjectKeyFormatArray = []) {
    return _.indexOf(daysInWalkObjectKeyFormatArray, moment(day).format(this.walkObjectKeyFormat)) > -1
  }

  dayStart (day = new Date()) {
    return this.moment(day).startOf('day').format('YYYY-MM-DD HH:mm:ss')
  }

  month (day = new Date()) {
    var startOfMonth = moment(day).startOf('month')
    var start = startOfMonth.format('YYYY-MM-DD HH:mm:ss')
    var endOfMonth = moment(day).endOf('month')
    var end = endOfMonth.format('YYYY-MM-DD HH:mm:ss')
    var selectedDays = []
    var d = startOfMonth
    while (d <= endOfMonth) {
      selectedDays.push(d.toDate())
      d = d.clone().add(1, 'd')
    }
    return {
      day,
      daysArray: selectedDays,
      end,
      start,
      toDate: this.toDate(day)
    }
  }

  nextDay (day = new Date()) {
    var nextDate = this.moment(day).add(1, 'days')
    return this.day(nextDate)
  }

  nextMonth (day = new Date()) {
    return this.month(this.moment(day).add(1, 'month'))
  }

  nextWeek (day = new Date()) {
    return this.week(this.moment(day).add(1, 'weeks'))
  }

  previousDay (day = new Date()) {
    const previousDate = this.moment(day).subtract(1, 'days')
    return this.day(previousDate)
  }

  previousMonth (day = new Date()) {
    return this.month(this.moment(day).subtract(1, 'months'))
  }

  previousWeek (day = new Date()) {
    return this.week(this.moment(day).subtract(1, 'weeks'))
  }

  toDate (day = new Date()) {
    return this.moment(day).toDate()
  }

  toRequestedDateFormat (day = new Date()) {
    return moment(day).format(this.requestedDateFormat)
  }

  toWalkKeyFormat (day = new Date()) {
    return moment(day).format(this.walkObjectKeyFormat)
  }

  week (day = new Date()) {
    var startOfWeek = moment(day).startOf('week')
    var start = startOfWeek.format('YYYY-MM-DD HH:mm:ss')
    var endOfWeek = moment(day).endOf('week')
    var end = endOfWeek.format('YYYY-MM-DD HH:mm:ss')
    var selectedDays = []
    var d = startOfWeek
    while (d <= endOfWeek) {
      selectedDays.push(d.toDate())
      d = d.clone().add(1, 'd')
    }
    return {
      day,
      daysArray: selectedDays,
      end,
      start,
      toDate: this.toDate(day)
    }
  }

  weekEnd (day = new Date()) {
    return this.moment(day).endOf('week').format('YYYY-MM-DD HH:mm:ss')
  }

  monthOfDayExistsInArray (day = new Date(), days = []) {
    const { daysArray } = this.month(day || new Date())
    if (days.length < daysArray.length) {
      return false
    }
    let isEqual = false
    days.forEach(day => {
      const momentDay = moment(day).format(this.walkObjectKeyFormat)
      isEqual = _.find(daysArray, day => {
        const momentDay2 = moment(day).format(this.walkObjectKeyFormat)
        return momentDay === momentDay2
      })
    })
    return isEqual
  }

  weekOfDayExistsInArray (day = new Date(), days = []) {
    const { daysArray } = this.week(day || new Date())
    if (days.length < daysArray.length) {
      return false
    }
    const isEqual = []
    days.forEach(day => {
      const momentDay = moment(day).format(this.walkObjectKeyFormat)
      isEqual.push(_.find(daysArray, day => {
        const momentDay2 = moment(day).format(this.walkObjectKeyFormat)
        return momentDay === momentDay2
      }))
    })
    return isEqual.length === 7
  }

  weekStart (day = new Date()) {
    return this.moment(day).startOf('week').format('YYYY-MM-DD HH:mm:ss')
  }

  dateStatus (date) {
    var momentA = moment().startOf('day')
    var momentB = moment(date)
    if (momentA > momentB) return 'past'
    else if (momentA < momentB) return 'future'
    else return 'today'
  }

  format (date, format) {
    if (moment(date).isValid()) {
      if (format) {
        return moment(date).format(format)
      } else {
        return moment(date)
      }
    } else {
      return null
    }
  }
}
export const dateTimeUtil = new DateTimeUtil()
