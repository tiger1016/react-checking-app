// Libraries
import React from 'react'
import { View } from 'react-native'
import _ from 'lodash'

// Utils
import { logger } from '../../../utils'

// Components
import MobileDayTimeDivider from '../components/MobileDayTimeDivider'
import MobileSingleUserTimeline from '../components/MobileSingleUserTimeline'

export default class TimeSlot extends React.Component {
  constructor () {
    super()
    this.state = {

    }
  }

  componentDidMount () {
    this.timeSlot.measure((fx, fy, width, height, px, py) => {
      // console.log('Component width is: ' + width)
      // console.log('Component height is: ' + height)
      // console.log('X offset to frame: ' + fx)
      // console.log('Y offset to frame: ' + fy)
      // console.log('X offset to page: ' + px)
      // console.log('TimeSlot Y offset to page: ' + py)
      this.props.setSlotOffset(this.props.rowId, py)
    })
  }

  _displayWalksByWalker = (props, walkers) => {
    for (var walker in walkers) {
      const w = {
        name: walker.split(':')[1]
      }
      return <MobileSingleUserTimeline openModal={this.props.openModal} key={props.time + '_' + walker.id} walker={w} walks={walkers[walker]} />
    }
    return null
  }

  render () {
    logger.rlog('<TimeSlot />', this)
    const walkers = {}
    _.each(this.props.walks, walk => {
      if (!walkers[walk.walker_id + ':' + walk.walker_name]) {
        walkers[walk.walker_id + ':' + walk.walker_name] = []
      }
      walkers[walk.walker_id + ':' + walk.walker_name].push(walk)
    })
    return <View className='TimeSlot' ref={ref => { this.timeSlot = ref }}>
      <MobileDayTimeDivider text={this.props.time} />
      {this._displayWalksByWalker(this.props, walkers)}
    </View>
  }
}
