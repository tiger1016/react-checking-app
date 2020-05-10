// Libraries
import React, { Component } from 'react'
// Components
import DatePickerRange from 'GlobalComponents/input/DatePickerRange'
import SearchInput from 'GlobalComponents/searchInput'

export default class Filterbar extends Component {
  render () {
    return (
      <div className='filter-container'>
        <div className='filter-right'>
          <DatePickerRange startDate={this.props.startDate} handleStartDateChange={this.props.handleStartDateChange} endDate={this.props.endDate} handleEndDateChange={this.props.handleEndDateChange} />
        </div>
        {/* {this.props.showSearch && <div className='filter-left' > <div className='filter-search-bar'>
          <input type='text' onChange={this.props.searchHandle} name='search' placeholder='Search' spellCheck='false' />
          <div className='ginger-module-inputHandlerGhost ginger-module-inputHandlerGhost-textarea' />
          <div className='icon-search'>
            <img src='/5eca83527fc1a0c1828487c2dec3137a.png' />
          </div>
        </div>} */}
        <div className='filter-search-bar' />
        {this.props.showSearch &&
          <div className='filter-left'>
            <SearchInput onChange={this.props.searchHandle} />
          </div>}
        {/* {this.props.showActions && <div className='filter-left'>
          <label>select all</label><Checkbox id={this.props.type} onChange={this.props.selectall} />
          <label>bulk action:</label>
          <button onClick={() => this.props.selectedInvoicesAction(1)} className='btnAction'> <i className='ion-paper-airplane' /></button>
          <button onClick={() => this.props.selectedInvoicesAction(2)} className='btnAction'><img src={delIcon} /></button>
        </div>} */}
        {/* {
          !this.props.showActions && <div className='filter-left' />
        } */}
      </div>
    )
  }
}
