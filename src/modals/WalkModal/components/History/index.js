// Libraries
import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

// Styles
import './index.css'

class History extends React.Component {
  render () {
    let {
      app
    } = this.props

    let revisionHistory = app.modal.data.walk.revision_history
    return <div id='History'>
      {revisionHistory.map(h => <div className='entry-container'>
        <span className='entry'>{h.revision_message.replace(/&nbsp;/, ' ')}</span>
      </div>)}
      <div className='entry-container'>
        <span className='entry'>Scanned in: {moment(app.modal.data.walk.start).format()}</span>
      </div>
      <div className='entry-container'>
        <span className='entry'>Scanned out: {moment(app.modal.data.walk.end).format()}</span>
      </div>
    </div>
  }
}

let mapStateToProps = state => {
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(History)
