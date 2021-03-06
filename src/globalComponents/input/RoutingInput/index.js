// Libraries
import React from 'react'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default class RoutingInput extends React.Component {
  constructor () {
    super()
    this.state = {
      error: false
    }
  }
  componentWillMount () {
    let {
      onValidate,
      value,
      name
    } = this.props

    let error = 'Please enter a valid Routing Number.'

    if (!utility.isARoutingN(value)) {
      if (utility.isAFunction(onValidate)) {
        onValidate({ name: name, error })
        this.setState({ error: true })
      }
    } else {
      if (utility.isAFunction(onValidate)) {
        onValidate({ name: name, error: null })
        this.setState({ error: false })
      }
    }
  }
  onChange = e => {
    e.target.value = e.target.value || ''
    e.target.value = e.target.value.replace(/\D+/g, '')

    let {
      onChange,
      onValidate
    } = this.props

    let error = 'Please enter a valid Routing Number.'

    if (!utility.isARoutingN(e.target.value)) {
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error })
      this.setState({ error: true })
    } else {
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error: null })
      this.setState({ error: false })
    }

    if (utility.isAFunction(onChange)) onChange(e)
  }
  // Fix text mask bug on backspace
  onKeyDown = e => {
    let { onChange } = this.props

    let cursorPos = Number(e.target.selectionStart)
    let keyCode = Number(e.keyCode)

    if ((cursorPos === 7 || cursorPos === 4) && keyCode === 8) {
      e.preventDefault()
      e.target.value = e.target.value || ''
      e.target.value = e.target.value.replace(/\D+/g, '')

      e.target.value = e.target.value.substring(0, e.target.value.length - 1)

      if (utility.isAFunction(onChange)) onChange(e)
    }
  }
  render () {
    let {
      error,
      name,
      reduxForm,
      required,
      type2,
      value
    } = this.props

    return <div className='Input'>
      <TextInput
        error={this.state.error || error}
        name={name}
        type='number'
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        reduxForm={reduxForm}
        required={required}
        type2={type2}
        value={value}
      />
    </div>
  }
}
