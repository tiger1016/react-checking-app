// Libraries
import React from 'react'
import Select from 'react-select'
import classNames from 'classnames'

// Utility
import { utility } from '../../../../utils'

// Styles
import 'react-select/dist/react-select.css'
import './index.css'

export default class CustomSelect extends React.Component {
  state = {
    error: false
  }

  onChangeReduxForm = event => {
    if (this.props.input.onChange && event != null) {
      // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      this.props.input.onChange(event.value)
    } else {
      // Clear the input field
      this.props.input.onChange(null)
    }
  }

  onBlur = event => {
    this.props.input.onBlur(this.props.input.value)
  }

  resolveContainerClassNames = () => {
    const {
      error,
      iconClassname,
      mark,
      highContrast,
      searchFormat
    } = this.props
    return classNames({
      alert: error || this.state.error,
      CustomSelect: !iconClassname,
      CustomSelectWithIcon: iconClassname,
      highContrast: highContrast,
      mark: mark,
      searchFormat: searchFormat
    })
  }

  resolveIconClassName = () => {
    const {
      iconClassname
    } = this.props
    return classNames({
      [iconClassname]: true,
      larger: true,
      'icon-container': true
    })
  }

  renderReduxForm = () => <Select {...this.props}
    className={this.resolveContainerClassNames()}
    clearable={this.props.clearable || false}
    disabled={this.props.disabled}
    onBlur={this.onBlur}
    onChange={this.onChangeReduxForm}
    options={this.props.options}
    placeholder={this.props.placeholder || '--'}
    value={this.props.input.value}
  />

  onChange = selected => {
    const {
      name,
      onChange,
      required
    } = this.props
    if (required) {
      const { onValidate } = this.props
      const error = 'This field is required.'
      let valid = true
      if (!selected || utility.isEmpty(selected)) {
        valid = false
      } else if (utility.isAnArray(selected) && !selected.length) {
        valid = false
      }
      if (!valid) {
        this.setState({ error: true })
        if (utility.isAFunction(onValidate)) onValidate({ name, error })
      } else {
        this.setState({ error: false })
        if (utility.isAFunction(onValidate)) onValidate({ name, error: null })
      }
    }
    if (utility.isAFunction(onChange)) onChange(selected)
  }

  componentDidMount () {
    const {
      options,
      required,
      value
    } = this.props
    if (required) {
      const selected = (options || []).find(o => o.value === value)
      const hasValidValue = value.length
      if (hasValidValue) {
        this.onChange(selected)
      } else {
        this.onChange(null)
      }
    }
  }

  Caret = () => <div className='icon ion-arrow-down-b' />

  SearchIcon = () => <div className='icon ion-search' />

  renderSelect = () => {
    const {
      clearable,
      closeOnSelect,
      Creatable,
      disabled,
      error,
      iconClassname,
      multi,
      name,
      options,
      placeholder,
      searchFormat,
      value,
      width
    } = this.props

    const containerClassName = this.resolveContainerClassNames()
    const iconClassName = this.resolveIconClassName()
    const style = { width: width || null }

    if (error)style.borderColor = '#c7011a'
    const itsClearable = clearable || false
    const thePlaceholder = placeholder || '--'

    return <div className={containerClassName}>
      {iconClassname ? <div className={iconClassName} /> : null}
      <div className='select-container' style={style}>
        {Creatable ? <Select.Creatable
          className='select-component'
          clearable={itsClearable}
          disabled={disabled}
          multi={multi}
          name={name}
          onChange={this.onChange}
          options={options}
          placeholder={thePlaceholder}
          value={value}
          closeOnSelect={closeOnSelect}
        /> : <Select
          arrowRenderer={searchFormat ? this.SearchIcon : this.caret}
          className='select-component'
          clearable={itsClearable}
          disabled={disabled}
          multi={multi}
          name={name}
          onChange={this.onChange}
          options={options}
          placeholder={thePlaceholder}
          value={value}
          closeOnSelect={closeOnSelect}
        />}
      </div>
    </div>
  }

  render () {
    const { reduxForm } = this.props
    return reduxForm ? this.renderReduxForm() : this.renderSelect()
  }
}
