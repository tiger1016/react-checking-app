// Libraries
import React from 'react'
import Select from 'react-select'
import classNames from 'classnames'

// Utility
import { utility } from 'Utils/utility'

// Styles
import 'react-select/dist/react-select.css'
import './index.css'

export default class CustomSelect extends React.Component {
  /**
   * onChange handler to make select work with redux form
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  onChangeReduxForm = event => {
    if (this.props.input.onChange && event != null) {
      // To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
      this.props.input.onChange(event.value)
    } else {
      // Clear the input field
      this.props.input.onChange(null)
    }
  }

  /**
   * [description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  onBlur = event => {
    this.props.input.onBlur(this.props.input.value)
  }

  /**
   * [description]
   * @return {[type]} [description]
   */
  resolveContainerClassNames = () => {
    const {
      error,
      iconClassname,
      mark,
      highContrast,
      searchFormat,
      secondary
    } = this.props
    return classNames({
      'alert': error,
      'CustomSelect': !iconClassname,
      'CustomSelectWithIcon': iconClassname,
      'highContrast': highContrast,
      'mark': mark,
      'searchFormat': searchFormat,
      secondary
    })
  }

  /**
   * [description]
   * @return {[type]} [description]
   */
  resolveIconClassName = () => {
    let {
      iconClassname
    } = this.props
    return classNames({
      [iconClassname]: true,
      'larger': true,
      'icon-container': true
    })
  }

  /**
   * Redux form select
   * @return {Component} Select component to be used in redux form
   */
  renderReduxForm = () => {
    return (
      <Select {...this.props}
        className={this.resolveContainerClassNames()}
        clearable={this.props.clearable || false}
        disabled={this.props.disabled}
        onBlur={this.onBlur}
        onChange={this.onChangeReduxForm}
        onClose={this.props.onClose}
        onOpen={this.props.onOpen}
        options={this.props.options}
        placeholder={this.props.placeholder}
        value={this.props.input.value}
      />
    )
  }

  onChange = selected => {
    const {
      name,
      onChange,
      required,
      error
    } = this.props
    if (required) {
      const { onValidate } = this.props
      const errorStr = 'This field is required.'
      let valid = true
      if (!selected || utility.isEmpty(selected) || error) {
        valid = false
      } else if ((utility.isAnArray(selected) && !selected.length) || error) {
        valid = false
      }

      if (!valid) {
        if (utility.isAFunction(onValidate)) onValidate({ name, error: errorStr })
      } else {
        if (utility.isAFunction(onValidate)) onValidate({ name, error: null })
      }
    }
    if (utility.isAFunction(onChange)) onChange(selected)
  }

  componentDidMount () {
    const { options, required, value } = this.props
    if (required) {
      const selected = options && options.find(o => o.value === value)
      if (selected) {
        this.onChange(selected)
      } else {
        this.onChange(null)
      }
    }
  }

  Caret = () => <div className='icon ion-arrow-down-b' />

  SearchIcon = () => <div className='icon ion-search' />
  sortList (a, b) {
    if (a.label < b.label) { return -1 }
    if (a.label > b.label) { return 1 }
    return 0
  }
  /**
   * Renders regular select
   * @return {[type]} [description]
   */
  renderSelect = () => {
    let {
      clearable,
      closeOnSelect,
      Creatable,
      disabled,
      error,
      iconClassname,
      multi,
      name,
      onClose,
      onOpen,
      options,
      placeholder,
      searchFormat,
      value,
      width,
      processOptions,
      sorted
    } = this.props
    let containerClassName = this.resolveContainerClassNames()
    let iconClassName = this.resolveIconClassName()
    let style = { width: width || null }
    if (sorted) {
      options = options.sort(this.sortList)
    }
    options = utility.isAFunction(processOptions) ? processOptions(options) : options
    if (error) style.borderColor = '#c7011a'
    clearable = clearable || false
    placeholder = placeholder || '--'
    return <div className={containerClassName}>
      {iconClassname ? <div className={iconClassName} /> : null}
      <div className='select-container' style={style}>
        {Creatable ? <Select.Creatable
          className='select-component'
          clearable={clearable}
          disabled={disabled}
          multi={multi}
          name={name}
          onChange={this.onChange}
          onClose={onClose}
          onOpen={onOpen}
          onCreateOption={this.onCreateOption}
          options={options}
          placeholder={placeholder}
          value={value}
          closeOnSelect={closeOnSelect}
        /> : <Select
          arrowRenderer={searchFormat ? this.SearchIcon : this.caret}
          className='select-component'
          clearable={clearable}
          disabled={disabled}
          multi={multi}
          name={name}
          onChange={this.onChange}
          onClose={onClose}
          onOpen={onOpen}
          options={options}
          placeholder={placeholder}
          value={value}
          closeOnSelect={closeOnSelect}
        />}
      </div>
    </div>
  }
  render () {
    let { reduxForm } = this.props
    return reduxForm ? this.renderReduxForm() : this.renderSelect()
  }
}
