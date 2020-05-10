// Libraries
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
// Styles

// import SearchInput from 'GlobalComponents/searchInput'

export default class Filterbar extends Component {
  render () {
    return (
      <div className='filter-container'>
        <div className='filter-right'>
          <div style={{ width: '200px', display: 'inline-block' }}>
            <DatePicker selected={this.props.startDate} onSelect={this.props.handleStartDateChange} onChange={this.props.handleStartDateChange} />
            <i className='ion-ios-calendar-outline' />
          </div><span className='cal-span'>to</span>
          <div style={{ width: '200px', display: 'inline-block' }}>
            <DatePicker selected={this.props.endDate} onSelect={this.props.handleEndDateChange} onChange={this.props.handleEndDateChange} />
            <i className='ion-ios-calendar-outline' />
          </div>
        </div>
        <div className='filter-search-bar' />
        {/* <div className='filter-left'>
          <SearchInput onChange={this.props.searchHandle} />
        </div> */}
      </div>
    )
  }
}
