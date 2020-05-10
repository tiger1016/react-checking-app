// Libraries
import React from 'react'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

// Components
import TextInput from '../TextInput'

// Utility
import { utility } from 'Utils/utility'

// Styles
import './index.css'

const numberMask = createNumberMask({
  allowDecimal: true,
  prefix: '',
  suffix: ''
})
export default class PercentInput extends React.Component {
  constructor () {
    super()
    this.state = { error: false }
  }
  onChange = e => {
    let {
      onChange,
      onValidate
    } = this.props

    let error = 'Please enter valid percentage.'

    if (!utility.isCurrency(e.target.value)) {
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error })
      this.setState({ error: true })
    } else {
      if (utility.isAFunction(onValidate)) onValidate({ name: e.target.name, error: null })
      this.setState({ error: false })
    }

    let value = e.target.value ? `${e.target.value}`.replace(/,/g, '') : ''

    if (utility.isAFunction(onChange)) onChange({ ...e, target: { ...e.target, value } })
  }

  onKeyDown = e => {
    let { onChange } = this.props

    let cursorPos = Number(e.target.selectionStart)
    let length = e.target.value.length
    let keyCode = Number(e.keyCode)

    if (cursorPos === length - 2 && keyCode === 8) {
      e.preventDefault()
      e.target.selectionStart = e.target.selectionStart - 1
      e.target.selectionEnd = e.target.selectionStart
      if (utility.isAFunction(onChange)) onChange(e)
    }
  }
  render () {
    let {
      error,
      name,
      onBlur,
      reduxForm,
      required,
      type2,
      value,
      clearOnFocus
    } = this.props

    return <div className={`PercentInput${this.state.error ? ' error' : ''}`}>
      <div className='percent-icon'>%</div>
      <TextInput
        error={error || this.state.error}
        noLeftBorder
        mask={numberMask}
        name={name}
        onBlur={onBlur}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        reduxForm={reduxForm}
        required={required}
        clearOnFocus={clearOnFocus}
        type2={type2}
        value={value}
      />
    </div>
  }
}
