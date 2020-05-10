// Libraries
import React from 'react'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default class DateInput extends React.Component {
  constructor () {
    super()
    this.state = {
      error: false
    }
  }
  onChange = e => {
    let {
      onChange,
      onValidate
    } = this.props

    let error = 'Please enter a valid date.'

    if (!utility.isDate(e.target.value, 'default')) {
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

    if ((cursorPos === 5 || cursorPos === 8) && keyCode === 8) {
      e.preventDefault()
      e.target.value = e.target.value || ''

      e.target.value = e.target.value.substring(0, e.target.value.length - 2)

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

    return <div className='DateInput'>
      <TextInput
        error={error || this.state.error}
        mask={[/\d/, /\d/, /\d/, /\d/, '-', /[0-1]/, /\d/, '-', /[0-3]/, /\d/]}
        name={name}
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
