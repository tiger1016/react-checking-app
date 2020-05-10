// Libraries
import React, { Component } from 'react'

// Styles
import '../../index.css'

export class ActionsComponent extends Component {
  render () {
    return (
      <div className='action-container' >
        {this.props.edit === 'unpaid' && <span className='ion-edit ions-style' />}
        {this.props.edit === 'partial' && <span className='ion-edit ions-style' />}
        {this.props.edit === 'paid' && <span className='ion-informaticon ion-circled ions-style' />}
        {<span>&nbsp;&nbsp;</span>}{<span className='ion-android-delete ions-style' />}
        {<span>&nbsp;&nbsp;</span>}{<span className='ion-paper-airplane ions-style' />}
      </div>
    )
  }
}
