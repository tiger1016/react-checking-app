import React from 'react'
import Gesture from 'react-native-swipe-gestures'
const gestureConfig = {
  velocityThreshold: 0.5,
  directionalOffsetThreshold: 90
}
export default props => <Gesture config={gestureConfig}
  style={{ flex: 1 }}
  onSwipeLeft={props.onSwipeLeft}
  onSwipeRight={props.onSwipeRight}>{this.props.children}</Gesture>
