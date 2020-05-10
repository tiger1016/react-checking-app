// Libraries
import React, { Component } from 'react'

// Components

import DiscountTypeSelect from '../DiscountTypeSelect'
import TextInput from '../TextInput'
// Styles
import './index.css'

export default class DiscountAndTypeSelect extends Component {
  render () {
    const {
      error,
      help,
      reduxForm,
      discountValue,
      onDiscountChange,
      discountTypeValue,
      onDiscountTypeChange,
      iconClassname,
      disabled,
      required,
      placeholder,
      type
    } = this.props

    return <div className='DiscountAndTypeSelect'>
      <TextInput
        error={error}
        help={help}
        onChange={(e) => onDiscountChange(e.target.value)}
        reduxForm={reduxForm}
        value={discountValue || ''}
        iconLeft={iconClassname}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        type={type}
        number
      />
      <DiscountTypeSelect
        error={error}
        help={help}
        onChange={(e) => onDiscountTypeChange(e.value)}
        reduxForm={reduxForm}
        value={discountTypeValue}
        disabled={disabled}
        required={required}
      />
    </div>
  }
}
