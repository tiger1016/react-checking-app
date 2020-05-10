// Libraries
import React, { Component } from 'react'

// Styles
// import '../../scheduler/styles/style.less'

export default class Data extends Component {
  render () {
    console.log('data props', this.props)
    return (
      <div className={`dashboard-data-container ${this.props.dashItem}`}>
        <div className='dashboard-data'>
          <div className='data-header'>
            <span>{this.props.dataName}</span>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
