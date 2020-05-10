// Libraries
import React from 'react'

// Components
import HourMinuteSelect from '../HourMinuteSelect'

// Styles
import './index.css'

export default class HourMinuteReduxForm extends React.Component {
  render () {
    return <div className='TimeRangeSelect'>
      {this.props.preLabel ? <span className='preLabel' style={{ width: (this.props.preLabelWidth || null) }}>{this.props.preLabel}</span> : null}
      <HourMinuteSelect
        format='hr'
        hourName={this.props.hourStartName}
        minuteName={this.props.minuteStartName}
        reduxForm={this.props.reduxForm}
      />
      <span className='RangeSeparator'>{this.props.separator || '-'}</span>
      <HourMinuteSelect
        format='hr'
        hourName={this.props.hourEndName}
        minuteName={this.props.minuteEndName}
        reduxForm={this.props.reduxForm}
      />
      {this.props.preLabel ? <span className='postLabel'>{this.props.postLabel}</span> : null}
    </div>
  }
}
