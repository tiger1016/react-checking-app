/*
* MultiSelectDropdown.js
* Component that handles the search dropdowns in the header and in the walker column
* TODO: Add tooltip to show selected options
*/

// Libraries
import React from 'react'
import Select from 'react-select'

export default class MultiSelectDropdown extends React.Component {
  render () {
    let { choices, placeholder } = this.props.preProcessDropDownFilterProps(this.props.dropdownOptions.slice(), this.props.value.slice(), this.props.filterType)
    if (placeholder === 'All Days') {
      placeholder = '-choose day'
    }
    return <div className={'dropdown-filter' + ' ' + this.props.filterType}>
      <Select className='dropdown-width'
        multi
        onChange={value => this.props.onChange(value)}
        options={choices || []}
        placeholder={placeholder || ''}
        simpleValue
      />
    </div>
  }
}
