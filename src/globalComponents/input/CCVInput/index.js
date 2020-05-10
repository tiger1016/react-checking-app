// Libraries
import React from 'react'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default class CCVInput extends React.Component {
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

    let error = 'Please enter a valid CCV.'

    if (!utility.isACCV(value)) {
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
    const { name, value } = e.target
    const { onChange, onValidate } = this.props

    const error = 'Please enter a valid CCV.'

    if (!utility.isACCV(value)) {
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
      reduxForm,
      required,
      type2,
      value
    } = this.props

    return <div className='CCVInput'>
      <TextInput
        error={error || this.state.error}
        mask={[/\d|\*/, /\d|\*/, /\d|\*/]}
        name={name}
        onChange={this.onChange}
        reduxForm={reduxForm}
        required={required}
        type2={type2}
        value={value}
      />
    </div>
  }
}
