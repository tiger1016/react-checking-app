// Libraries
import React, { Component } from 'react'

// Components
import DatePickerRange from 'GlobalComponents/input/DatePickerRange'
import SearchInput from 'GlobalComponents/searchInput'
import WalkersSelect from 'GlobalComponents/input/WalkersSelect'

export default class Filterbar extends Component {
  render () {
    const { search } = this.props
    return (
      <div className='filter-container'>
        <div className='filter-right'>
          <DatePickerRange startDate={this.props.startDate} handleStartDateChange={this.props.handleStartDateChange} endDate={this.props.endDate} handleEndDateChange={this.props.handleEndDateChange} />
          <span className='filter-walker-label'>Staff Member(s): </span><WalkersSelect multi value={this.props.selectedWalkers} onChange={this.props.handleStaffChange} />
        </div>

        <div className='filter-search-bar' />
        {search && <div className='filter-left'>
          <SearchInput onChange={this.props.searchHandle} />
        </div>}
      </div>
    )
  }
}
