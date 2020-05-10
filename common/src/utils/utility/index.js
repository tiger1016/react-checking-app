// Constants
import { CREDIT_CARD_DATA } from './constants'
import moment from 'moment'

class Utility {
  arrayMoveInPlace = (arr, oldIndex, newIndex) => {
    if (newIndex >= arr.length) {
      var k = newIndex - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    return arr // for testing
  };

  currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

  /**
   * [capitalizeFirstLetter description]
   * @param  {[type]} string [description]
   * @return {[type]}        [description]
   */
  capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  /**
   * [cardIsMasked description]
   * @param  {[type]} s [description]
   * @return {[type]}   [description]
   */
  cardIsMasked (s) {
    return /\*/.test(s)
  }

  /**
   * Returns a number with extension (px, %, etc..) if on web or just the number if on react native
   * @param  {Number}           number      The number value
   * @param  {[String}          extension   The type extension ('px', '%', etc..)
   * @return {Number || String}             Number adapted to platform
   */
  crossPlatformUnit (number, extension) {
    if (process && process.env && process.env.PLATFORM_ENV && process.env.PLATFORM_ENV === 'web') {
      return `${number}${extension}`
    }
    return number
  }

  /**
   * [dynamicSort description]
   * @param  {[type]} property [description]
   * @return {[type]}          [description]
   */
  dynamicSort (property) {
    var sortOrder = 1
    if (property[0] === '-') {
      sortOrder = -1
      property = property.substr(1)
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
      return result * sortOrder
    }
  }

  /**
   * Simple GUID generator (Not RFC4122 version 4 compliant)
   * @return {String} Guid
   */
  guid = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4()
  }

  isACCV (s) {
    return s && (/^\d{3}$/.test(s) || /\*\*\*/.test(s))
  }

  isACreditCard (s) {
    return CREDIT_CARD_DATA.filter(c => c.regex.test(s)).length > 0
  }

  isWhichCreditCard (s) {
    return CREDIT_CARD_DATA.find(c => c.regex.test(s))
  }

  getCreditCardNameByTitle (title) {
    if (title) {
      const card = CREDIT_CARD_DATA.find(c => c.title.toLowerCase() === title.toLowerCase())
      return (card && card.name) || ''
    }
    return ''
  }

  CREDIT_CARD_DATA

  /**
   * Checks if provided argument is a function
   * @param  {Mixed}    f   Variable to test
   * @return {Boolean}      True if a function, false otherwise
   */
  isAFunction (f) {
    return typeof f === 'function'
  }

  /**
   * Checks if provided argument is an array
   * @param  {Mixed}    a   Variable to test
   * @return {Boolean}      True if an array, false otherwise
   */
  isAnArray (a) {
    if (!a) return false
    return a.constructor === Array
  }

  /**
   * [isAnEIN description]
   * @param  {[type]}  s [description]
   * @return {Boolean}   [description]
   */
  isAnEIN (s) {
    return /^\d{2}-?\d{7}$/.test(s)
  }

  /**
   * Checks if provided string is an email
   * @param  {String}  s String to check
   * @return {Boolean}   True if email, false otherwise
   */
  isAnEmail (s) {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s)
  }

  /**
   * Checks if provided argument is an empty array
   * @param  {Mixed}    a   Variable to test
   * @return {Boolean}      True if an empty array, false otherwise
   */
  isAnEmptyArray = (a) => {
    return this.isAnArray(a) && a.length < 1
  }

  /**
   * Checks if provided argument is an empty object
   * @param  {Mixed}    o   Variable to test
   * @return {Boolean}      True if empty object, false otherwise
   */
  isAnEmptyObject = (o) => {
    return this.isAnObject(o) && Object.keys(o).length === 0 && o.constructor === Object
  }

  /**
   * Checks if provided argument is an empty string
   * @param  {Mixed}    s   Variable to test
   * @return {Boolean}      True if an empty string, false otherwise
   */
  isAnEmptyString = (s) => {
    return this.isAString(s) && s.trim() === ''
  }

  /**
   * Checks if provided argument is an eobject
   * @param  {Mixed}    o   Variable to test
   * @return {Boolean}      True if object, false otherwise
   */
  isAnObject (o) {
    return o !== null && typeof o === 'object'
  }

  /**
   * [isANumber description]
   * @param  {[type]}  n [description]
   * @return {Boolean}   [description]
   */
  isANumber (n) {
    return /^[0-9]{1,45}$/.test(n)
  }

  /**
   * Is a SSN
   * @param  {String}  s A string
   * @return {Boolean}   True if object, false otherwise
   */
  isASSN (s) {
    return /^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\1(?!0000)[0-9]{4}$/.test(s)
  }

  /**
   * Is a RoutingNumner
   * @param  {String}  s A string
   * @return {Boolean}   True if object, false otherwise
   */
  isARoutingN (s) {
    return /^[0-9]{9}$/.test(s)
  }

  /**
   * Is a AccountNumner
   * @param  {String}  s A string
   * @return {Boolean}   True if object, false otherwise
   */
  isAAccountN (s) {
    return /^[0-9]{10,12}$/.test(s)
  }

  /**
   * Checks if provided argument is an string
   * @param  {Mixed}    s   Variable to test
   * @return {Boolean}      True if a string, false otherwise
   */
  isAString (s) {
    return typeof s === 'string' || s instanceof String
  }

  /**
   * Checks if string is a us phone number
   * @param  {String}  s String to test
   * @return {Boolean}   True if US phone, false otherwise
   */
  isAUSPhone (s) {
    return /^(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/.test(s)
  }

  /**
   * [isAYear description]
   * @param  {[type]}  s [description]
   * @return {Boolean}   [description]
   */
  isAYear (s) {
    return /^[1-9]\d{3}$/.test(s)
  }

  /**
   * Checkz if string is a zip code
   * @param  {String}  s String
   * @return {Boolean}   [description]
   */
  isAZip (s) {
    return /^\d{5}(?:[-\s]\d{4})?$/.test(s)
  }

  /**
   * Checks if string is currency
   * @param  {String}  s String
   * @return {Boolean}   True if currency, false otherwise
   */
  isCurrency (s) {
    return /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/.test(s)
  }

  /**
   * [isDate description]
   * @param  {[type]}  s      [description]
   * @param  {[type]}  format [description]
   * @return {Boolean}        [description]
   */
  isDate (s, format) {
    return /^\d{4}-[0-1]{1}[0-9]{1}-[1-3]{1}\d{1}$/.test(s)
  }

  /**
   * Checks if provided argument is empty
   * @param  {Mixed}    v   Variable to test
   * @return {Boolean}      True if empty, false otherwise
   */
  isEmpty = (v) => {
    return this.isInvalid(v) || this.isAnEmptyObject(v) || this.isAnEmptyString(v) || this.isAnEmptyArray(v)
  }

  /**
   * Checks if provided argument is invalid
   * @param  {Mixed}    v   variable to test
   * @return {Boolean}      True if invalid, false otherwise
   */
  isInvalid (v) {
    return v === null || typeof v === 'undefined'
  }

  /**
   * Checks if provided argument is not truthy
   * @param  {Mixed}    v   variable to test
   * @return {Boolean}      True if untruthy, false otherwise
   */
  isNotTruthy = (v) => {
    return this.isInvalid(v) || v === 0 || this.isAnEmptyString(v) || v === false || Number.isNaN(v)
  }

  /**
   * [isPercentage description]
   * @param  {[type]}  s [description]
   * @return {Boolean}   [description]
   */
  isPercentage (s) {
    return /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,3})?$/.test(s)
  }

  /**
   * @description Utility to format currency number
   *
   * @param {Number} cur currency number to be converted
   * @returns {String} formatted currency string
   */
  formatCurrency (cur) {
    return this.currencyFormatter.format(cur)
  }

  /**
   * [isWeight description]
   * @param  {[type]}  s [description]
   * @return {Boolean}   [description]
   */
  isWeight (s) {
    return /^\d{2,3}.\d{0,3}$/.test(s)
  }

  /**
   * [mutateArrayMove description]
   * @param  {[type]} arr      [description]
   * @param  {[type]} oldIndex [description]
   * @param  {[type]} newIndex [description]
   * @return {[type]}          [description]
   */
  mutateArrayMove (arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
      var k = newIndex - arr.length + 1
      while (k--) {
        arr.push(undefined)
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
  }

  /**
   * Sorts in place the provided array by the provided property name.
   * @param  {Array}  arr      Array to sort (by mutation)
   * @param  {String} property Property to sort by
   * @return {Array}           Mutated array sorted by property
   */
  mutateSortCollectionBy (arr = [], property = '') {
    return arr.sort((a, b) => (a[property].toUpperCase() > b[property].toUpperCase()) ? 1 : ((b[property].toUpperCase() > a[property].toUpperCase()) ? -1 : 0))
  }

  /**
   * Converts a number into currency
   * @param  {Number} n Number to convert
   * @return {Number}   Currency value
   */
  numberToCurrency (n) {
    return parseFloat(n).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  /**
   * S4 section to be used in this.guid()
   * @return {String} s4 string
   */
  s4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  }

  /**
   * [toEIN description]
   * @param  {[type]} s [description]
   * @return {[type]}   [description]
   */
  toEIN (s) {
    const einNumber = `${s}`.replace(/\D+/g, '')
    return `${einNumber}`.replace(/(\d{2})(\d{7})/, '$1-$2')
  }

  /**
   * [toPhone description]
   * @param  {[type]} s [description]
   * @return {[type]}   [description]
   */
  toPhone (s) {
    const phoneNumber = `${s}`.replace(/\D+/g, '')
    return `${phoneNumber}`.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  }

  /**
   * [uniqueValuesOfArray description]
   * @param  {[type]} a [description]
   * @return {[type]}   [description]
   */
  uniquesOfArray (a) {
    return a.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
  }

  /**
   * RFC4122 version 4 compliant guid
   * @return {String} RFC4122 version 4 compliant guid string
   */
  uuidv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = Math.random() * 16 | 0
      var v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  /**
   *  Check invalid date and format
   *  @param  {[type]} s [description]
   *  @param  {[type]} s [description]
   * @return {Object} mement date object or null
   */
  dateFormat (date, format) {
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

  /**
   *  parse val into float after fixed to 2 decimal places
   *  @param  {[type]} s [description]
   *  @param  {[type]} s [description]
   * @return {Object} mement date object or null
   */
  parseFloatWithFixed (val, fixed) {
    if (isNaN(parseFloat(val))) {
      return 0.00
    }
    if (fixed) {
      return parseFloat(val).toFixed(fixed)
    }
    return parseFloat(val)
  }

  customEllipsis (val, max) {
    if (val) {
      if (val.length > max) {
        return val.substr(0, max - 2) + '..'
      } else {
        return val
      }
    }
  }

  getSubDomain () {
    var domain = /:\/\/([^/]+)/.exec(window.location.href)[1]
    var _tempArray = domain.split('.')
    if (_tempArray.length === 3) {
      return _tempArray[0]
    } else {
      return ''
    }
  }
}
export const utility = new Utility()
