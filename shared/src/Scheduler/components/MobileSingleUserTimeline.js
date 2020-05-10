// Libraries
import React from 'react'
import { View } from 'react-native'
import _ from 'lodash'

// Utils
import { logger } from '../../../utils'

// Components
import MobileSingleUserTimelineHeader from './MobileSingleUserTimelineHeader'
import MobileSingleUserTimelineCard from './MobileSingleUserTimelineCard'

export default props => {
  logger.rlog('<MobileSingleUserTimeline />', props)
  const walks = []
  _.forEach(props.walks, walk => {
    walks.push(<MobileSingleUserTimelineCard openModal={props.openModal} key={walk.walk_id} walk={walk} />)
  })
  return <View className='MobileSingleUserTimeline'>
    <MobileSingleUserTimelineHeader walker={props.walker} />
    {walks}
  </View>
}

// const styles = StyleSheet.create({
//   container: {
//     width: '100%'
//   }
// })
