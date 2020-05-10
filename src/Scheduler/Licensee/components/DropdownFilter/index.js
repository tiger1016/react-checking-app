// Libraries
import React from 'react'
import Select from 'react-select'

// Styles
import './index.css'

export default class DropwdownFilter extends React.Component {
  render () {
    let {
      dropdownOptions,
      handleDropDownSelectFilter,
      filterType,
      preProcessDropDownFilterProps,
      sortDropDownFilterOptions,
      value
    } = this.props

    let { choices, placeholder } = preProcessDropDownFilterProps(dropdownOptions.slice(), value.slice(), filterType)

    let options = sortDropDownFilterOptions(choices)
    return <div ref={ref => { this.ref = ref }} className={'dropdown-filter' + ' ' + filterType}
      onMouseLeave={() => {}}>
      <Select
        className='dropdown-width scheduler-select'
        multi
        onChange={v => handleDropDownSelectFilter(v, filterType, value)}
        options={options || []}
        placeholder={placeholder || ''}
      />
    </div>
  }
}
