import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-mobile-datepicker'
import moment from 'moment'
export default class DatePickerDialog extends Component {
  constructor (props) {
    super(props)

    this.modalKey = `IosDatePickerModal_${Date.now()}`

    this.state = {
      datePickerVisible: false,
      options: null
    }
  }

  static propTypes = {
    /**
     * Date picked handler.
     *
     * This is called when the user selected the date from picker
     * The first and only argument is a Date object representing the picked
     * date and time.
     */
    onDatePicked: PropTypes.func,

    /**
     * Date Cancelled handler.
     *
     * This is called when the user dismissed the picker.
     */
    onCancel: PropTypes.func,

    /**
    * Ok button label
    */
    okLabel: PropTypes.string,

    /**
    * Cancel button label
    */
    cancelLabel: PropTypes.string
  }

  static defaultProps = {
    okLabel: 'Ok',
    cancelLabel: 'Cancel'
  }

  /**
 * Opens the standard IOS date picker dialog.
 *
 * The available keys for the `options` object are:
 *   * `date` (`Date` object or timestamp in milliseconds) - date to show by default
 *   * `minDate` (`Date` or timestamp in milliseconds) - minimum date that can be selected
 *   * `maxDate` (`Date` object or timestamp in milliseconds) - minimum date that can be selected
 *
 */
  open (options: Object) {
    this.setState({
      options: options
    })
    this.showDatePickerModal()
  }

  getSelectedDate () {
    // return (options) ? options.date : null
  }

  cancel = () => {
    this.hideDatePickerModal()
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  ok = (time) => {
    this.hideDatePickerModal()
    if (this.props.onDatePicked) {
      this.props.onDatePicked(moment(time))
    }
  }

  showDatePickerModal () {
    this.setState({
      datePickerVisible: true
    })
  }

  hideDatePickerModal () {
    this.setState({
      datePickerVisible: false
    })
  }

  render () {
    const datePickerProps = {}
    if (this.state.options) {
      if (this.state.options.date) {
        datePickerProps['date'] = this.state.options.date
      }
      if (this.state.options.minDate) {
        datePickerProps['minimumDate'] = this.state.options.minDate
      }
      if (this.state.options.maxDate) {
        datePickerProps['maximumDate'] = this.state.options.maxDate
      }
    } else {
      datePickerProps['date'] = new Date()
    }

    return (
      <DatePicker
        value={datePickerProps.date}
        isOpen={this.state.datePickerVisible}
        onSelect={this.ok}
        onCancel={this.cancel}
        confirmText={this.props.okLabel}
        cancelText={this.props.cancelLabel}
        isPopup />
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.58)',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0
//   },
//   background: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   modalContent: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingTop: 8,
//     paddingLeft: 8,
//     paddingRight: 8,
//     paddingBottom: 16,
//     margin: 16
//   },
//   buttonTextStyle: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#007AFF'
//   }
// })
