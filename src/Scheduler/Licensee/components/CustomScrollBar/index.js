// Libraries
import React from 'react'
import Slider from 'rc-slider'
// import Tooltip from 'rc-tooltip'
// import moment from 'moment'
import { connect } from 'react-redux'

// Styles
import './index.css'

class CustomScrollBar extends React.Component {
  state = {
    offsetWidth: null
  }
  ref = null
  componentDidMount () {
    this.setState({ offsetWidth: this.ref.offsetWidth })
  }
  render () {
    let {
      handleWidth,
      max,
      onChange,
      value
    } = this.props
    let width = this.state.offsetWidth * handleWidth / 100
    let handleStyle = { marginLeft: `-${width / 2}px`, width: `${width}px` }
    return <div id='CustomScrollBar' ref={ref => { this.ref = ref }} style={{ padding: `0 ${width / 2}px` }}>
      <Slider
        handleStyle={handleStyle}
        max={max}
        onChange={onChange}
        value={value}
      />
    </div>
  }
}

export default connect(
  state => {
    return {
      dayViewXUnitWidth: state.scheduler.dayViewXUnitWidth,
      scheduler: state.scheduler
    }
  }
)(CustomScrollBar)
