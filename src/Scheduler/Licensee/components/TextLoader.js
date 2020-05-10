// Libraries
import React from 'react'

export default class TextLoader extends React.Component {
  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.progress !== nextProps.progress) {
      return true
    }
    return false
  }
  render () {
    return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'content' }}>
      <div style={{ flex: 1, textAlign: 'center', padding: '50px' }}>
        <span style={{ fontWeight: 'bold', color: '#a0a0a0', fontStyle: 'italic' }}>Loading</span>
        <span style={{ padding: '5px', color: 'rgb(54, 111, 149)' }}>{this.props.progress}</span>
      </div>
    </div>
  }
}
