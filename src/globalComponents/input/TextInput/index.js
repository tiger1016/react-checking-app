// Libraries
import React from 'react'
import PropType from 'prop-types'
import { Field } from 'redux-form'
import MaskedInput from 'react-text-mask'
import classNames from 'classnames'

// Utility
import { utility } from 'Utils/utility'

// Components
import CustomIcon from '../../CustomIcon'
import Help from '../../Help'
import LabelText from '../LabelText'

// Styles
import './index.css'

export default class TextInput extends React.PureComponent {
  static propTypes = {
    value: PropType.oneOfType([PropType.string, PropType.number])
  }

  static defaultProps = {
    value: ''
  }

  state = {
    error: false,
    name: ''
  }

  ref = null

  onChange = e => {
    let { onChange, required, number, maxLength } = this.props

    if (number) {
      if (isNaN(e.target.value)) return
    }

    if (maxLength) {
      if (e.target.value.length > maxLength) return
    }

    const name = e.target.name
    const value = e.target.value

    const { onValidate, minLength } = this.props

    let error = null
    if (required && utility.isEmpty(value)) {
      this.setState({ error: true })
      if (utility.isAFunction(onValidate)) onValidate({ name, error: 'This field is required.' })
    } else if (minLength && value && value.length < minLength) {
      this.setState({ error: true })
      if (utility.isAFunction(onValidate)) onValidate({ name, error: 'This field is Invalid' })
    } else {
      this.setState({ error: false })
      if (utility.isAFunction(onValidate)) onValidate({ name, error })
    }

    if (utility.isAFunction(onChange)) onChange(e)
  }

  maskInputReduxForm = props => {
    const { mask } = this.props
    const { input, meta, ...custom } = props
    return <MaskedInput mask={mask} {...input} {...custom} />
  }

  componentDidMount () {
    const { focused } = this.props
    const target = this.ref.querySelector('input')
    if (focused) target.focus()
  }

  fieldNormalize = (value, oldValue) => {
    const { maxLength, number } = this.props
    let _value = value
    if (maxLength && value) {
      if (value.length > maxLength) {
        _value = oldValue
      }
    }
    if (number) {
      if (_value !== '') {
        _value = parseInt(_value)
      }
    }
    return _value
  }

  onBlur = e => {
    const { onBlur } = this.props
    this.setState({ name: null })
    if (onBlur) onBlur(e)
  }

  onFocus = name => evt => {
    if (this.props.error) this.setState({ name: '' })
    else this.setState({ name })
    if (this.props.clearOnFocus) {
      evt.target.value = ''
    }
    this.props.onChange(evt)
  }

  render () {
    const {
      help,
      iconLeft,
      iconRight,
      label,
      mask,
      name,
      onKeyDown,
      noLeftBorder,
      password,
      placeholder,
      reduxForm,
      error,
      type2,
      value,
      autoComplete
    } = this.props

    const hasError = error || this.state.error

    return (
      <div
        className={classNames([
          'TextInput',
          noLeftBorder && 'no-left-border',
          hasError && 'error',
          iconLeft && 'icon-left',
          iconRight && 'icon-right',
          type2 && 'type-2',
          name && `t-container${name}`
        ])}
        ref={ref => { this.ref = ref }}>
        <label>
          {label && <LabelText text={label} />}
          <div className='input-section' onFocus={this.onFocus(name)}>
            <div className='input-wrapper'>
              {reduxForm ? (<Field
                component={mask ? this.maskInputReduxForm : 'input'}
                format={this.fieldNormalize}
                name={name}
                normalize={this.fieldNormalize}
                onBlur={this.onBlur}
                onChange={this.onChange}
                onKeyDown={onKeyDown}
                type={password ? 'password' : 'text'}
                value={value}
              />) : (mask ? <MaskedInput
                guide={false}
                mask={mask}
                name={name}
                onBlur={this.onBlur}
                onChange={this.onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                type={password ? 'password' : 'text'}
                value={value}
              /> : <input
                className={`t-${name}`}
                name={name}
                autoComplete={autoComplete}
                onChange={this.onChange}
                onKeyDown={onKeyDown}
                onBlur={this.onBlur}
                placeholder={placeholder}
                type={password ? 'password' : 'text'}
                value={value}
              />)}
            </div>
            {iconLeft && <div className='icon-section textinput-left'>
              <CustomIcon name={iconLeft} size={'xs'} />
            </div>}
            {iconRight && <div className='icon-section textinput-right'>
              <CustomIcon name={iconRight} size={'xs'} />
            </div>}
          </div>
        </label>
        {help && <Help text={help.text} place={help.place} />}
      </div>
    )
  }
}
