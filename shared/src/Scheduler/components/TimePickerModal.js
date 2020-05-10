// Libraries
import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
// import _ from 'lodash'
// import moment from 'moment'
// import DayPicker from 'react-day-picker'
import Modal from 'react-modal'
import Icon from '../../globalComponents/CustomIcon'

// Utils
import { logger } from '../../../utils'
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

// let CaptionElement = ({ date, localeUtils, locale, onChange }) => {
//   // console.log(localeUtils.formatMonthTitle(date, locale))
//   const d = localeUtils.formatMonthTitle(date, locale)
//   return <View style={captionStyles.container}>
//     <Text style={captionStyles.caption}>{`${d.slice(0, 3).toUpperCase()} ${d.slice(-4)}`}</Text>
//   </View>
// }

// const captionStyles = {
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     top: format_number(-135, 'px'),
//     width: '100%'
//   },
//   caption: {
//     color: '#FFF',
//     fontSize: format_number(12, 'px')
//   }
// }

// let Weekday = ({ weekday, className, localeUtils, locale }) => {
//   const weekdayName = localeUtils.formatWeekdayLong(weekday, locale)
//   return <div className={className} title={weekdayName} style={styles.weekdayStyles}>
//     {weekdayName.slice(0, 2).toUpperCase()}
//   </div>
// }

// const weekdayStyles = {
//   weekday: {
//     color: '#FFF',
//     fontSize: format_number(12, 'px')
//   }
// }

// let Navbar = ({ nextMonth, previousMonth, onPreviousClick, onNextClick, className, localeUtils }) => {
//   // const months = localeUtils.getMonths()
//   // const prev = months[previousMonth.getMonth()]
//   // const next = months[nextMonth.getMonth()]
//   return <View className={className} style={navbarStyles.container}>
//     <TouchableHighlight style={navbarStyles.button} onPress={() => onPreviousClick()}>
//       <Icon name='ios-arrow-back' size={14} color='#999' style={navbarStyles.arrows} />
//     </TouchableHighlight>
//     <TouchableHighlight style={navbarStyles.button} onPress={() => onNextClick()}>
//       <Icon name='ios-arrow-forward' size={14} color='#999' style={navbarStyles.arrows} />
//     </TouchableHighlight>
//   </View>
// }

// const navbarStyles = {
//   arrows: {
//     fontSize: format_number(13, 'px'),
//     color: '#F5F5F5'
//   },
//   button: {
//     paddingTop: format_number(6, 'px'),
//     paddingRight: format_number(8, 'px'),
//     paddingBottom: format_number(5, 'px'),
//     paddingLeft: format_number(8, 'px'),
//     borderRadius: format_number(100, 'px'),
//     borderWidth: format_number(1, 'px'),
//     borderStyle: 'solid',
//     borderColor: '#F5F5F5',
//     marginLeft: format_number(50, 'px'),
//     marginRight: format_number(50, 'px')
//   },
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     position: 'absolute',
//     top: format_number(-140, 'px'),
//     zIndex: 5000
//   }
// }

// let Day = day => <View className='theContainer'>
//   <Text className='theDay'>{day.getDate()}</Text>
// </View>

export default class TimePickerModal extends React.Component {
  constructor () {
    super()
    this.state = {
      mode: 'day'
    }
  }

  render () {
    logger.rlog('<TimePickerModal />', this)
    return <Modal
      isOpen={this.props.isOpen}
      // onAfterOpen={this._openHandler}
      // onRequestClose={requestCloseFn}
      // closeTimeoutMS={n}
      style={modalStyles}
      contentLabel='Modal'
    >
      <View style={styles.container} className={`TimePickerModal ${this.state.mode}_mode`}>
        <TouchableHighlight style={styles.closeContainer} onPress={this.props.close}>
          <Icon style={styles.close} name='close' size={14} color='#999' />
        </TouchableHighlight>
        <View style={styles.modeContainer}>
          <TouchableHighlight onPress={() => this.setState({ mode: 'day' })}>
            <Text style={[styles.modeButton, styles.modeButtonLeft, { backgroundColor: (this.state.mode === 'day' ? '#F5F5F5' : 'transparent'), color: (this.state.mode === 'day' ? '#000' : '#F5F5F5') }]}>Day</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.setState({ mode: 'week' })}>
            <Text style={[styles.modeButton, styles.modeButtonRight, { backgroundColor: (this.state.mode === 'week' ? '#F5F5F5' : 'transparent'), color: (this.state.mode === 'week' ? '#000' : '#F5F5F5') }]}>Week</Text>
          </TouchableHighlight>
        </View>
        {/* <DayPicker renderDay={Day} captionElement={<CaptionElement />} selectedDays={this.props.selectedDays} weekdayElement={<Weekday />} navbarElement={<Navbar />} onDayClick={day => this.props.selectDay(day, this.state.mode)} /> */}
      </View>
    </Modal>
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flex: 1,
    paddingTop: format_number(180, 'px')
  },
  close: {
    color: '#F5F5F5',
    fontSize: format_number(22, 'px'),
    paddingTop: format_number(8, 'px'),
    paddingBottom: format_number(8, 'px'),
    paddingLeft: format_number(13, 'px'),
    paddingRight: format_number(13, 'px'),
    borderRadius: format_number(100, '%'),
    backgroundColor: '#000'
  },
  closeContainer: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  modeButton: {
    paddingTop: format_number(15, 'px'),
    paddingRight: format_number(22, 'px'),
    paddingBottom: format_number(14, 'px'),
    paddingLeft: format_number(24, 'px'),
    color: '#FFF',
    fontSize: format_number(12, 'px'),
    fontFamily: 'Roboto',
    borderWidth: format_number(2, 'px'),
    borderStyle: 'solid',
    borderColor: '#F5F5F5'
  },
  modeButtonLeft: {
    borderTopLeftRadius: format_number(4, 'px'),
    borderBottomLeftRadius: format_number(4, 'px')
  },
  modeButtonRight: {
    borderTopRightRadius: format_number(4, 'px'),
    borderBottomRightRadius: format_number(4, 'px')
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: format_number(20, 'px')
  }
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.92)'
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 'none',
    background: 'transparent',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0',
    outline: 'none',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1
  }
}
