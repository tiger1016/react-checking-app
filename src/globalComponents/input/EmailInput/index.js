// Libraries
import React from 'react'
// import emailMask from 'text-mask-addons/dist/emailMask'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default class EmailInput extends React.Component {
  constructor () {
    super()
    this.state = {
      error: false
    }
  }
  onChange = e => {
    let name = e.target.name
    let value = e.target.value
    let {
      onChange,
      onValidate,
      required
    } = this.props

    let error = 'Please enter a valid email.'
    if (!value && required) {
      this.setState({ error: true })
      if (utility.isAFunction(onValidate)) onValidate({ name, error })
    } else if (value && !utility.isAnEmail(value)) {
      this.setState({ error: true })
      if (utility.isAFunction(onValidate)) onValidate({ name, error })
    } else {
      this.setState({ error: false })
      if (utility.isAFunction(onValidate)) onValidate({ name, error: null })
    }

    if (utility.isAFunction(onChange)) onChange(e)
  }
  render () {
    let {
      error,
      name,
      placeholder,
      reduxForm,
      required,
      type2,
      value
    } = this.props

    return <div className='EmailInput'>
      <TextInput
        error={error || this.state.error}
        // mask={emailMask}
        name={name}
        placeholder={placeholder}
        onChange={this.onChange}
        reduxForm={reduxForm}
        required={required}
        type2={type2}
        value={value}
      />
    </div>
  }
}
