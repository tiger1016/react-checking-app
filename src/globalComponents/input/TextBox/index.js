// Libraries
import React from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import classNames from 'classnames'

// Styles
import './index.css'

// Utility
import { utility } from 'Utils/utility'

export default class TextBox extends React.Component {
  constructor () {
    super()
    this.ref = null
    this.state = {
      error: false,
      name: ''
    }
  }
  componentDidMount () {
    let {
      required
    } = this.props
    let target = this.ref.querySelector('input')
    if (required) {
      let e = { target }
      this.onChange(e)
    }
  }
  onChange = e => {
    let { onChange, required, number, maxLength } = this.props
    if (number) {
      if (isNaN(e.target.value)) {
        return
      }
    }
    if (maxLength) {
      if (e.target.value.length > maxLength) {
        return
      }
    }
    if (required) {
      let name = e.target.name
      let value = e.target.value

      let { onValidate, minLength } = this.props

      let error = 'This field is required.'
      if (utility.isEmpty(value)) {
        this.setState({ error: true })
        if (utility.isAFunction(onValidate)) onValidate({ name, error })
      } else if (minLength && value && value.length < minLength) {
        this.setState({ error: true })
        if (utility.isAFunction(onValidate)) onValidate({ name, error: 'This field is Invalid' })
      } else {
        this.setState({ error: false })
        if (utility.isAFunction(onValidate)) onValidate({ name, error: null })
      }
    }
    if (utility.isAFunction(onChange)) onChange(e)
  }
  resolveClassNames = () => {
    let {
      error
    } = this.props

    return classNames({
      'TextBox': true,
      'error': error || this.state.error
    })
  }

  onFocus = (name) => {
    this.setState({
      name: name
    })
  }
  render () {
    let {
      icon
    } = this.props
    let _iconClass = 'icon-container '
    if (icon && icon !== '' && icon.toString() !== 'true') {
      _iconClass = _iconClass + _iconClass
    } else {
      _iconClass = _iconClass + 'larger ion-android-clipboard'
    }

    let { ContainerClassName, skip, ...props } = this.props
    if (icon) {
      return <div className={'TextBoxWithIcon ' + ContainerClassName}>
        {icon && <span className={_iconClass} />}
        <div className={this.resolveClassNames()} ref={ref => { this.ref = ref }}>
          <TextareaAutosize onChange={this.onChange} {...props}>
            {props.value}
          </TextareaAutosize>
        </div>
      </div>
    }
    return <div
      className={this.resolveClassNames()}
      ref={ref => { this.ref = ref }}
      onClick={() => this.onFocus(this.props.label)}
      style={{
        border: this.state.name === this.props.label ? '1px solid #aeaeae' : null, borderRadius: '5px'
      }}
    >
      <TextareaAutosize
        onChange={this.onChange} {...props}
        onBlur={e => {
          this.setState({ name: null })
        }}
      >
        {this.props.value}
      </TextareaAutosize>
    </div>
  }
}
