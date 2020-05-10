/*
  SearchAsYouType.js
  Search as you type
*/

// Libraries
import React from 'react'
import _ from 'lodash'

export default class SearchAsYouType extends React.Component {
  constructor () {
    super()
    this._search = _.debounce(this._search, 150)
  }
  _handleChange = event => this._search(event.target.value)
  _search = value => this.props.search(value)
  render () {
    return <input
      type='text'
      style={{
        border: '1px solid #DADADA',
        padding: '10px 25px 10px 10px',
        color: '#999',
        // color: 'red',
        fontWeight: '500',
        maxWidth: '100%',
        width: '100%',
        minWidth: '100%',
        height: '80%',
        flex: '1',
        borderRadius: '4px'
      }}
      placeholder='Staff'
      // value={this.state.value}
      onChange={this._handleChange}
    />
  }
}
