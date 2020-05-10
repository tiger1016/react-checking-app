import React from 'react'
import Gesture from 'rc-gesture'

export default props => <Gesture onSwipeLeft={props.onSwipeLeft} onSwipeRight={props.onSwipeRight}>{this.props.children}</Gesture>
