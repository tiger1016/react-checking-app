// Libraries
import React, { Component } from 'react'
import Help from 'GlobalComponents/Help'

export default class Data extends Component {
  render () {
    return <div className={`dashboard-data-container ${this.props.dataIdent}`}>
      <div className='dashboard-data'>
        <div className='data-header'>
          <span>{this.props.dataName}{this.props.help ? <Help text={this.props.help} place={'top'} /> : null}</span>
        </div>
        {this.props.children}
      </div>
    </div>
  }
}
