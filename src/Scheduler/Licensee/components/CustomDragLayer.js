// Libraries
import React from 'react'
import { DragLayer } from 'react-dnd'

class CustomDragLayer extends React.Component {
  render () {
    const { isDragging } = this.props
    if (!isDragging) {
      return null
    }
    return <div style={{
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 100,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(51,51,51,.8)'
    }} />
  }
}

export default DragLayer(
  monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  })
)(CustomDragLayer)
