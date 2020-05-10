// Libraries
import React from 'react'
import { View } from 'react-native'
import moment from 'moment'

// Utils
import { logger } from '../../../utils'

// Components
import MobileDayTimeDivider from '../components/MobileDayTimeDivider'
import MobileSingleUserTimeline from '../components/MobileSingleUserTimeline'

export default class DaySlot extends React.Component {
  componentDidMount () {
    this.daySlot.measure((fx, fy, width, height, px, py) => {
      this.props.setSlotOffset(this.props.rowId, py)
    })
  }

  render () {
    logger.rlog('<DaySlot />', this)
    return <View className='DaySlot' ref={ref => { this.daySlot = ref }}>
      <MobileDayTimeDivider text={moment(this.props.day).format('dddd M/D/YY')} />
      {this.props.walkers.map(walker => <MobileSingleUserTimeline openModal={this.props.openModal} key={this.props.day + '_' + walker.id} walker={walker} walks={walker.walks} />)}
    </View>
  }
}
