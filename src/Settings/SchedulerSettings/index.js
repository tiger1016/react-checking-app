// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import moment from 'moment'
import { withRouter, Prompt } from 'react-router-dom'
import _ from 'lodash'

// Controllers
import { appController, profileController } from 'Controllers'

// Components
import CustomForm from 'Web/globalContainers/input/CustomForm'
import InputGroup from 'GlobalComponents/input/InputGroup'
import SaveCancel from 'GlobalComponents/SaveCancel'
import SectionHeader from 'GlobalComponents/SectionHeader'

// Constants
import { SCHEDULER } from 'Constants/settings/FormNames'

// Styles
import './index.css'

require('moment-duration-format')

class SchedulerSettings extends Component {
  componentWillMount () {
    profileController.actions.fetchSchedulerSettings()
  }
  isStateChanged = () => {
    const {
      formData,
      initialValues
    } = this.props
    return !_.isEqual(formData.values, initialValues)
  }
  /**
   * Cancel button action
   * @return {Void}
   */
  cancel = () => {
    const { reset, history } = this.props
    appController.confirmDiscardChanges(() => { reset(); history.push('/dashboard') })
  }
  submit = (values) => {
    let {
      formData,
      initialValues
    } = this.props
    if (!_.isEqual(formData.values, initialValues)) {
      let _cancel_deadline_time_hours = parseInt(values['cancel_deadline_time-hours'] || 0) // eslint-disable-line camelcase
      _cancel_deadline_time_hours = values['cancel_deadline_time-period'] === 'pm' ? _cancel_deadline_time_hours + 12 : _cancel_deadline_time_hours // eslint-disable-line camelcase
      let _edit_deadline_time_hours = parseInt(values['edit_deadline_time-hours'] || 0) // eslint-disable-line camelcase
      _edit_deadline_time_hours = values['edit_deadline_time-period'] === 'pm' ? _edit_deadline_time_hours + 12 : _edit_deadline_time_hours // eslint-disable-line camelcase
      let _request_deadline_time_hours = parseInt(values['request_deadline_time-hours'] || 0) // eslint-disable-line camelcase
      _request_deadline_time_hours = values['request_deadline_time-period'] === 'pm' ? _request_deadline_time_hours + 12 : _request_deadline_time_hours // eslint-disable-line camelcase
      let data = {
        cancel_deadline_days: values.cancel_deadline_days,
        cancel_deadline_time: `${_cancel_deadline_time_hours}:${values['cancel_deadline_time-minutes'] ? values['cancel_deadline_time-minutes'] : '00'}:00`, // eslint-disable-line camelcase
        enable_cancel_deadlines: values.enable_cancel_deadlines,
        enable_edit_deadlines: values.enable_edit_deadlines,
        enable_request_deadlines: values.enable_request_deadlines,
        edit_deadline_days: values.edit_deadline_days,
        edit_deadline_time: `${_edit_deadline_time_hours}:${values['edit_deadline_time-minutes'] ? values['edit_deadline_time-minutes'] : '00'}:00`, // eslint-disable-line camelcase
        request_deadline_days: values.request_deadline_days,
        request_deadline_time: `${_request_deadline_time_hours}:${values['request_deadline_time-minutes'] ? values['request_deadline_time-minutes'] : '00'}:00` // eslint-disable-line camelcase
      }
      profileController.actions.updateSchedulerSettings(data)
    }
  }
  render () {
    const {
      formData,
      handleSubmit,
      profileIsLoading
    } = this.props

    const inputGroupLabelWidth = '212px'
    const smallerInputGroupLabelWidth = '106px'

    const cutoffOptions = [
      { label: 'Current Date', value: '0' },
      { label: '1 Day Prior', value: '1' },
      { label: '2 Days Prior', value: '2' }
    ]

    return <div id='SchedulerSettings' className='settings-section'>
      <SectionHeader title='Scheduler' noPadding />
      <div className='section-content'>
        <CustomForm>
          <InputGroup
            fields={[
              {
                format: v => v === 'Y',
                name: 'enable_request_deadlines',
                normalize: v => v ? 'Y' : 'N',
                offText: 'NO',
                onText: 'YES',
                // onChange: () => window.alert(),
                type: 'on-off'
              }
            ]}
            label='Customer Scheduling Request Deadline'
            loading={profileIsLoading && (formData.values ? !formData.values.enable_request_deadlines : true)}
            mainLabelWidth={inputGroupLabelWidth}
            reduxForm
          />
          <InputGroup
            fields={[
              {
                name: 'request_deadline_days',
                options: cutoffOptions,
                type: 'custom-select'
              }
            ]}
            label='Cutoff Date'
            loading={profileIsLoading && (formData.values ? !formData.values.request_deadline_days : true)}
            mainLabelWidth={smallerInputGroupLabelWidth}
            reduxForm
            skinnyBottom
          />
          <InputGroup
            fields={[
              {
                hourName: 'request_deadline_time-hours',
                minuteName: 'request_deadline_time-minutes',
                periodName: 'request_deadline_time-period',
                timeFormat: 12,
                type: 'hour-minute'
              }
            ]}
            label='Cutoff Time'
            loading={profileIsLoading && (formData.values ? !formData.values.request_deadline_time : true)}
            mainLabelWidth={smallerInputGroupLabelWidth}
            reduxForm
          />
          <InputGroup
            fields={[
              {
                format: v => v === 'Y',
                name: 'enable_edit_deadlines',
                normalize: v => v ? 'Y' : 'N',
                offText: 'NO',
                onText: 'YES',
                // onChange: () => window.alert(),
                type: 'on-off'
              }
            ]}
            label='Customer Service Edit Deadline'
            loading={profileIsLoading && (formData.values ? !formData.values.enable_edit_deadlines : true)}
            mainLabelWidth={inputGroupLabelWidth}
            reduxForm
          />
          <InputGroup
            fields={[
              {
                name: 'edit_deadline_days',
                options: cutoffOptions,
                type: 'custom-select'
              }
            ]}
            label='Cutoff Date'
            loading={profileIsLoading && (formData.values ? !formData.values.edit_deadline_days : true)}
            mainLabelWidth={smallerInputGroupLabelWidth}
            reduxForm
            skinnyBottom
          />
          <InputGroup
            fields={[
              {
                hourName: 'edit_deadline_time-hours',
                minuteName: 'edit_deadline_time-minutes',
                periodName: 'edit_deadline_time-period',
                timeFormat: 12,
                type: 'hour-minute'
              }
            ]}
            label='Cutoff Time'
            loading={profileIsLoading && (formData.values ? !formData.values.edit_deadline_time : true)}
            mainLabelWidth={smallerInputGroupLabelWidth}
            reduxForm
          />
          <InputGroup
            fields={[
              {
                format: v => v === 'Y',
                name: 'enable_cancel_deadlines',
                normalize: v => v ? 'Y' : 'N',
                offText: 'NO',
                onText: 'YES',
                // onChange: () => window.alert(),
                type: 'on-off'
              }
            ]}
            label='Customer Cancellation Deadline'
            loading={profileIsLoading && (formData.values ? !formData.values.enable_cancel_deadlines : true)}
            mainLabelWidth={inputGroupLabelWidth}
            reduxForm
          />
          <InputGroup
            fields={[
              {
                name: 'cancel_deadline_days',
                options: cutoffOptions,
                type: 'custom-select'
              }
            ]}
            label='Cutoff Date'
            loading={profileIsLoading && (formData.values ? !formData.values.cancel_deadline_days : true)}
            mainLabelWidth={smallerInputGroupLabelWidth}
            reduxForm
            skinnyBottom
          />
          <InputGroup
            fields={[
              {
                hourName: 'cancel_deadline_time-hours',
                minuteName: 'cancel_deadline_time-minutes',
                periodName: 'cancel_deadline_time-period',
                timeFormat: 12,
                type: 'hour-minute'
              }
            ]}
            label='Cutoff Time'
            loading={profileIsLoading && (formData.values ? !formData.values.cancel_deadline_time : true)}
            mainLabelWidth={smallerInputGroupLabelWidth}
            reduxForm
          />
        </CustomForm>
      </div>
      <SaveCancel
        loading={this.props.profileIsLoading}
        cancelOnClick={this.cancel}
        saveOnClick={handleSubmit(values => this.submit(values))}
      />
      <Prompt when={this.isStateChanged()} message='Are you sure you wanna discard the information you entered?' />
    </div>
  }
}

const SchedulerSettingsForm = reduxForm({
  enableReinitialize: true,
  form: SCHEDULER
})(SchedulerSettings)

const mapStateToProps = state => {
  let _cancel_deadline_time = moment(state.profile.profile.cancel_deadline_time, 'hh:mm:ss').format('hh') // eslint-disable-line camelcase
  _cancel_deadline_time = _cancel_deadline_time > 12 ? _cancel_deadline_time - 12 : _cancel_deadline_time // eslint-disable-line camelcase
  let _edit_deadline_time = Number(moment.duration(state.profile.profile.edit_deadline_time).format('hh')) // eslint-disable-line camelcase
  _edit_deadline_time = _edit_deadline_time > 12 ? _edit_deadline_time - 12 : _edit_deadline_time // eslint-disable-line camelcase
  let _request_deadline_time = Number(moment.duration(state.profile.profile.request_deadline_time).format('hh')) // eslint-disable-line camelcase
  _request_deadline_time = _request_deadline_time > 12 ? _request_deadline_time - 12 : _request_deadline_time // eslint-disable-line camelcase
  return {
    formData: state.form[SCHEDULER] || {},
    initialValues: {
      ...state.profile.profile,
      'cancel_deadline_time-hours': _cancel_deadline_time,
      'cancel_deadline_time-minutes': Number(state.profile.profile.cancel_deadline_time ? state.profile.profile.cancel_deadline_time.split(':')[1] : 0),
      'cancel_deadline_time-period': state.profile.profile.cancel_deadline_time ? state.profile.profile.cancel_deadline_time.split(':')[0] > 12 ? 'pm' : 'am' : '',
      'edit_deadline_time-hours': _edit_deadline_time,
      'edit_deadline_time-minutes': Number(state.profile.profile.edit_deadline_time ? state.profile.profile.edit_deadline_time.split(':')[1] : 0),
      'edit_deadline_time-period': state.profile.profile.edit_deadline_time ? state.profile.profile.edit_deadline_time.split(':')[0] > 12 ? 'pm' : 'am' : '',
      'request_deadline_time-hours': _request_deadline_time,
      'request_deadline_time-minutes': Number(state.profile.profile.request_deadline_time ? state.profile.profile.request_deadline_time.split(':')[1] : 0),
      'request_deadline_time-period': state.profile.profile.request_deadline_time ? state.profile.profile.request_deadline_time.split(':')[0] > 12 ? 'pm' : 'am' : ''
    },
    profileIsLoading: state.profile.loading
  }
}

const SchedulerSettingsFormConnected = connect(mapStateToProps)(SchedulerSettingsForm)

export default withRouter(SchedulerSettingsFormConnected)
