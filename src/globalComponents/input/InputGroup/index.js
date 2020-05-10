// Libraries
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

// Components
import Button from '../../Button'
import Checkbox from '../Checkbox'
import CompleteDateInputAndSelect from '../CompleteDateInputAndSelect'
import CustomSelect from '../CustomSelect'
import DaysOfMonthSelect from '../DaysOfMonthSelect'
import FormLink from '../FormLink'
import FormText from '../FormText'
import HourMinuteSelect from '../HourMinuteSelect'
import Loader from '../../Loader'
import Switch from '../Switch'
import RadioInput from '../RadioInput'
import WeekDaySelect from '../WeekDaySelect'

// Styles
import './index.css'

export default class InputGroup extends React.Component {
  renderFields () {
    let {
      fields,
      reduxForm
    } = this.props

    if (reduxForm) {
      return this.renderFieldsReduxForm(fields)
    }

    return <div>Only redux form supported, please add non redux form support.</div>
  }
  renderFieldsReduxForm = arr => arr.map((a, i) => {
    let field = a && a.type ? <span>{`Input type \`${a.type}\` not supported.`}</span> : null
    if (a.type === 'radio') {
      field = <RadioInput
        child={a.child}
        help={a.help}
        label={a.label}
        name={a.name}
        parentOf={a.parentOf}
        reduxForm
        value={a.value}
      />
    } else if (a.type === 'checkbox') {
      field = <Checkbox
        help={a.help}
        label={a.label}
        name={a.name}
        reduxForm
      />
    } else if (a.type === 'custom-select') {
      field = <Field
        component={CustomSelect}
        help={a.help}
        name={a.name}
        options={a.options}
        placeholder={a.label}
        reduxForm
      />
    } else if (a.type === 'days-of-month-select') {
      field = <DaysOfMonthSelect
        name={a.name}
        placeholder={a.label}
        reduxForm
      />
    } else if (a.type === 'hour-minute') {
      field = <HourMinuteSelect
        help={a.help}
        hourFormat={a.hourFormat}
        hourName={a.hourName}
        hourNormalize={a.hourNormalize}
        minuteFormat={a.minuteFormat}
        minuteName={a.minuteName}
        minuteNormalize={a.minuteNormalize}
        preLabel={a.preLabel}
        preLabelWidth={a.preLabelWidth}
        postLabel={a.postLabel}
        periodName={a.periodName}
        timeFormat={a.timeFormat}
        reduxForm
      />
    } else if (a.type === 'link') {
      field = <FormLink
        onClick={a.onClick}
        text={a.label}
      />
    } else if (a.type === 'on-off') {
      field = <Switch
        format={a.format}
        help={a.help}
        label={a.label}
        name={a.name}
        normalize={a.normalize}
        onChange={a.onChange}
        offText={a.offText}
        onText={a.onText}
        reduxForm
      />
    } else if (a.type === 'special-date-input') {
      field = <CompleteDateInputAndSelect
        dayName={a.dayName}
        help={a.help}
        monthName={a.monthName}
        name={a.name}
        placeholder={a.label}
        reduxForm
        textName={a.textName}
      />
    } else if (a.type === 'weekday-select') {
      field = <WeekDaySelect
        help={a.help}
        name={a.name}
        placeholder={a.label}
        reduxForm
        s={a.withS}
      />
    } else if (a.type === 'billing-weekday-select') {
      field = <WeekDaySelect
        name={a.name}
        placeholder={a.label}
        reduxForm
        billing
      />
    }

    return <div className={`input-group-input-container${a.removable ? ' removable' : ''}`} key={i}>
      {field}
      {a.removable ? <div className='removable-icon'>
        <Button iconOnly='ion-trash-b' onClick={a.removeButtonOnClick} textOnly />
      </div> : null}
    </div>
  })
  render () {
    let {
      columnFormat,
      fields,
      label,
      labelHelp,
      loading,
      mainLabelWidth,
      skinnyBottom
    } = this.props

    return <div className={`InputGroup${columnFormat ? ' column' : ''}${skinnyBottom ? ' skinny-bottom' : ''}`}>
      {label ? <div className='description-section' style={{ width: mainLabelWidth || null }}>
        <FormText text={label} help={labelHelp} />
      </div> : null}
      {fields && fields.length ? <div className='input-section'>
        {(loading ? <div className='loader'>
          <Loader color={'#999999'} fadeIn={'none'} spinnerStyle='circle' />
        </div>
          : null) || (fields && fields.length ? this.renderFields() : null)}
      </div> : null }
    </div>
  }
}

InputGroup.propTypes = {
  columnFormat: PropTypes.bool,
  fields: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  labelHelp: PropTypes.string,
  loading: PropTypes.bool,
  mainLabelWidth: PropTypes.string,
  reduxForm: PropTypes.bool,
  skinnyBottom: PropTypes.bool
}
