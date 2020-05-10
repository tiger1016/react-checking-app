// Libraries
import React, { Component } from 'react'
import classNames from 'classnames'

// Utils
import { utility } from 'Utils/utility'

// Components
import AllCapsText from '../../AllCapsText'
import Button from '../../../Button'
import Checkbox from '../../Checkbox'
import CurrencyInput from '../../CurrencyInput'
import FormText from '../../FormText'
import HourMinuteSelect from '../../HourMinuteSelect'
import Switch from '../../Switch'
import TextInput from '../../TextInput'
import TimeRangeSelect from '../../TimeRangeSelect'

/**
 * If more than one input is needed per column
 * @param  {Array}  fields       Field array of column
 * @param  {Boolean} reduxForm Specifiy if it's for use in redux form or as normal input
 * @return {Array}               Array of input components
 */
const arrayTypeResolver = (fields, reduxForm) => {
  return fields.map((field, index) => <div className='multiple-input-column-row' key={index}>
    <ControlledTypeResolver field={field} reduxForm={reduxForm} />
  </div>)
}

/**
 * Modifies style based on props
 * @param  {Object} props Component props
 * @return {Object}       Style object
 */
const styleResolver = props => {
  let { div, field } = props

  return {
    paddingTop: (field.vAlign === 'top' ? '8px' : null),
    maxWidth: (field.width || null),
    verticalAlign: (field.vAlign === 'top' ? 'text-top' : 'middle'),
    width: div ? '100%' : (field.width || null)
  }
}

class ControlledTypeResolver extends Component {
  state = { value: this.props.field.value }

  handleChange = event => {
    this.setState({ value: event.target.value })
    const { field: { onChange } } = this.props
    onChange && onChange()
  }

  handleValidate = ({ name, error }) => {
    this.setState({ name, error })
    const { field: { onValidate } } = this.props
    onValidate && onValidate({ name, error })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.field.value !== this.state.value) {
      this.setState({
        value: nextProps.field.value
      })
    }
  }

  render () {
    const { field, reduxForm } = this.props
    const { value, name, error } = this.state
    /*
    Checkbox
    */
    if (field.type === 'checkbox') {
      return <Checkbox
        checked={field.checked}
        help={field.help}
        label={field.label}
        name={field.name}
        onChange={field.onChange}
        reduxForm={reduxForm} />
      /*
      Currency input
      */
    } else if (field.type === 'currency') {
      return <CurrencyInput
        name={field.name}
        value={value}
        onValidate={this.handleValidate}
        required={field.required}
        onBlur={(e) => field.onBlur(e, { name, error })}
        onChange={this.handleChange}
        reduxForm={reduxForm} />
      /*
      Header text
      */
    } else if (field.type === 'header-text') {
      return <AllCapsText text={field.value} />
      /*
      Hour Minute Select
      */
    } else if (field.type === 'hour-minute') {
      return <HourMinuteSelect
        error={field.error}
        required={field.required}
        help={field.help}
        hourName={field.hourName}
        hourValue={field.hourValue}
        hourNormalize={field.hourNormalize}
        hourOnChange={field.hourOnChange}
        minuteName={field.minuteName}
        minuteValue={field.minuteValue}
        minuteNormalize={field.minuteNormalize}
        minuteOnChange={field.minuteOnChange}
        onValidate={field.onValidate}
        preLabel={field.preLabel}
        preLabelWidth={field.preLabelWidth}
        postLabel={field.postLabel}
        reduxForm={reduxForm} />
      /*
      Icon Button
      */
    } else if (field.type === 'icon-button') {
      return <Button
        iconOnly={field.icon}
        name={field.name}
        onClick={field.onClick}
        size={'md'}
        textOnly />
      /*
      Price Input
      */
    } else if (field.type === 'price') {
      return <FormText text={`$${utility.numberToCurrency(field.value)}`} />
      /*
      Text
      */
    } else if (field.type === 'text') {
      return <FormText clickable={field.clickable} onClick={field.onClick} text={field.value} />
      /*
      Text Input
      */
    } else if (field.type === 'text-input') {
      return <TextInput
        onValidate={this.handleValidate}
        required={field.required}
        maxLength={field.maxLength}
        minLength={field.minLength}
        name={field.name}
        onBlur={(e) => field.onBlur(e, { name, error })}
        onKeyDown={(e) => field.onKeyDown(e, { name, error })}
        onChange={this.handleChange}
        focused={field.focused}
        reduxForm={reduxForm}
        value={value} />
      /*
      Time Range
      */
    } else if (field.type === 'time-range') {
      return <TimeRangeSelect
        hourStartName={field.hourStartName}
        minuteStartName={field.minuteStartName}
        hourEndName={field.hourEndName}
        minuteEndName={field.minuteEndName}
        ReduxForm={reduxForm} />
      /*
      Switch Input
      */
    } else if (field.type === 'switch') {
      return <Switch
        format={field.format}
        name={field.name}
        normalize={field.normalize}
        onChange={field.onChange}
        offText={field.offText}
        onText={field.onText}
        ReduxForm={reduxForm}
        checked={field.checked}
        disabled={field.disabled} />
    }

    return null
  }
}

export default class Column extends Component {
  shouldComponentUpdate (nextProps) {
    const { columnChanged, forceUpdate, head, optimizeWithWasChanged } = nextProps
    if (!forceUpdate && optimizeWithWasChanged) {
      return head ? false : (columnChanged || false)
    }
    return true
  }
  render () {
    let Wrap = 'td'
    const { div, field, head, reduxForm } = this.props
    if (head) {
      return <th className={`Column${field.sortable ? ' sortable' : ''}`} style={styleResolver(this.props)} onClick={field.onClick}>
        <ControlledTypeResolver field={field} reduxForm={reduxForm} />
      </th>
    }

    if (div) {
      Wrap = 'div'
    }

    if (utility.isAnArray(field)) {
      return <Wrap
        className={classNames([
          'Column',
          field.sortable && 'sortable',
          'multiple',
          field.contentAlign || '',
          field.unread && 'bold'
        ])}
        onClick={field.onClick}>
        {arrayTypeResolver(field, reduxForm)}
      </Wrap>
    }

    return <Wrap
      className={classNames([
        'Column',
        field.sortable && 'sortable',
        field.contentAlign || '',
        field.unread && 'bold'
      ])}
      style={styleResolver(this.props)}
      onClick={field.onClick}
    >
      <ControlledTypeResolver field={field} reduxForm={reduxForm} />
    </Wrap>
  }
}
