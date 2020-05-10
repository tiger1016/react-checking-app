// Libraries
import React from 'react'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

export default class ZipInput extends React.Component {
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
      onValidate
    } = this.props

    let error = 'Please enter a valid zip code.'

    if (!utility.isAZip(value)) {
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

    return <div className='ZipInput'>
      <TextInput
        error={error || this.state.error}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
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
