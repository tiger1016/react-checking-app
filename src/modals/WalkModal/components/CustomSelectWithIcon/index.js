// Libraries
import React from 'react'
import Select from 'react-select'

// Styles
import './index.css'

export default props => <div className={`CustomSelectWithIcon${props.alert ? ' alert' : ''}${props.mark ? ' mark' : ''}`}>
  <div className={`${props.iconClassname || ''} larger icon-container`} />
  <div className='select-container' style={{ width: props.width || null }}>
    <Select
      className='select-component'
      clearable={props.clearable || false}
      disabled={props.disabled}
      multi={props.multi}
      onChange={props.onChange}
      options={props.options}
      placeholder={props.placeholder || '--'}
      value={props.value}
    />
  </div>
</div>
