// Libraries
import React from 'react'
import moment from 'moment'

// Components
import Arrows from '../Arrows'
import Today from '../Today'
import ViewSelector from '../ViewSelector'

// Styles
import './index.css'

export default class ToolBar extends React.Component {
  render () {
    let {
      date,
      label,
      onNavigate,
      onViewChange,
      view,
      views
    } = this.props

    let formattedLabel = label

    if (view === 'day') {
      formattedLabel = moment(date).format('dddd, Do')
    } else if (view === 'week' || view === 'work_week') {
      formattedLabel = moment(date).format('MMMM YYYY')
    }

    return <div className='ToolBar'>
      <div className='container'>
        <div className='left'>
          <Arrows navigate={onNavigate} />
          <Today onClick={() => onNavigate('TODAY')} />
        </div>
        <div className='date'>
          {formattedLabel}
        </div>
        <div className='right'>
          <ViewSelector views={views} goToView={onViewChange} />
        </div>
      </div>
    </div>
  }
}
