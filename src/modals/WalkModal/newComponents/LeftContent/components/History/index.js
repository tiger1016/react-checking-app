// Libraries
import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

// Components
import FieldGroup from '../../../FieldGroup'
import ButtonGroup from 'GlobalComponents/ButtonGroup'

// Styles
import './index.css'

// Controllers
import { walksController } from 'Controllers'

class History extends React.Component {
  state = {
    endWalk: false,
    start_time_hour: '',
    start_time_minute: '',
    start_time_ampm: '',
    end_time_hour: '',
    end_time_minute: '',
    end_time_ampm: '',
    pee: {},
    poo: {},
    walker_comments: '',
    formSubmitted: false
  }

  endWalk = () => {
    const { modalData } = this.props
    const _tempStart = moment(modalData.walk.requested_time)
    _tempStart.set({ hour: this.state.start_time_ampm === 'pm' ? this.state.start_time_hour + 12 : this.state.start_time_hour, minute: this.state.start_time_minute, second: 0 })
    const _tempEnd = moment(modalData.walk.requested_time)
    _tempEnd.set({ hour: this.state.end_time_ampm === 'pm' ? this.state.end_time_hour + 12 : this.state.end_time_hour, minute: this.state.end_time_minute, second: 0 })

    if (_tempStart.isBefore(_tempEnd)) {
      this.setState({ formSubmitted: true }, () => {
        if (!this.submissionFailedFor('all')) {
          const updatedWalk = {
            ...modalData.walk,
            addons: modalData.walk.addons ? modalData.walk.addons.map(p => p.active_addon_id || p.id).join(',') : null,
            requestedTime: modalData.walk.requested_time,
            status: 'completed',
            pee: this.state.pee,
            poo: this.state.poo,
            walker_comments: this.state.walker_comments,
            start_time: _tempStart.format('YYYY-MM-DD HH:mm:ss'),
            end_time: _tempEnd.format('YYYY-MM-DD HH:mm:ss')
          }

          walksController.actions.updateWalk({ updatedWalk }, (err) => {
            if (!err) {
              this.setState({ endWalk: false, formSubmitted: false })
            }
          })
        }
      })
    }
  }

  getDuration (start, end) {
    if (moment(start).isValid() && moment(end).isValid()) {
      const startDate = moment(start, 'YYYY-MM-DD HH:mm:ss')
      const endDate = moment(end, 'YYYY-MM-DD HH:mm:ss')
      const duration = moment.duration(endDate.diff(startDate))
      const hours = duration.asHours()
      if (hours < 1) {
        if (Math.round((hours * 60)) === 1) {
          return Math.round((hours * 60)) + ' minute'
        }
        return Math.round((hours * 60)) + ' minutes'
      }
      let _hourFormat = Math.round(hours) + ' hours '
      if (Math.round(hours) === 1) {
        _hourFormat = Math.round(hours) + ' hour '
      }
      const _mins = Math.round((Number(hours) % 1) * 60)
      if (_mins) {
        let _minFormat = _mins + ' minutes'
        if (_mins === 1) {
          _minFormat = _mins + ' minute'
        }
        return _hourFormat + _minFormat
      }
      return _hourFormat
    }
    return null
  }

  toggleEndWalk = () => {
    this.setState(prevState => ({ endWalk: !prevState.endWalk, formSubmitted: false }))
  }

  submissionFailedFor = field => {
    const {
      start_time_hour, // eslint-disable-line camelcase
      start_time_minute, // eslint-disable-line camelcase
      start_time_ampm, // eslint-disable-line camelcase
      end_time_hour, // eslint-disable-line camelcase
      end_time_minute, // eslint-disable-line camelcase
      end_time_ampm, // eslint-disable-line camelcase
      formSubmitted
    } = this.state

    switch (field.toLowerCase()) {
      case 'start_time_hour':
        return !start_time_hour && formSubmitted // eslint-disable-line camelcase
      case 'start_time_minute':
        return !start_time_minute && formSubmitted // eslint-disable-line camelcase
      case 'start_time_ampm':
        return !start_time_ampm && formSubmitted // eslint-disable-line camelcase
      case 'end_time_hour':
        return !end_time_hour && formSubmitted // eslint-disable-line camelcase
      case 'end_time_minute':
        return !end_time_minute && formSubmitted // eslint-disable-line camelcase
      case 'end_time_ampm':
        return !end_time_ampm && formSubmitted // eslint-disable-line camelcase
      case 'all':
        return !start_time_hour && !start_time_minute && !start_time_ampm && !end_time_hour && !end_time_minute && !end_time_ampm // eslint-disable-line camelcase
      default:
        return false
    }
  }

  handlePeePooChange = (e) => {
    if (e && e.petId && e.value) {
      if (e.value.type === 'pee') {
        let _pee = { ...this.state.pee }
        if (e.value.value) {
          _pee[e.petId] = 1
        } else {
          _pee[e.petId] = 0
        }
        this.setState({ pee: _pee })
      }
      if (e.value.type === 'poo') {
        let _poo = { ...this.state.poo }
        if (e.value.value) {
          _poo[e.petId] = 1
        } else {
          _poo[e.petId] = 0
        }
        this.setState({ poo: _poo })
      }
    }
  }

  render () {
    const { modalData } = this.props
    const revisionHistory = modalData.walk.revision_history
    let _label = false
    const _walkStatus = walksController.getStatus(modalData.walk)
    const isChangeRequestedOrPending = _walkStatus === 'change_requested' || _walkStatus === 'cancel_requested' || _walkStatus === 'pending'
    if (_walkStatus === 'completed' || _walkStatus === 'canceled' || _walkStatus === 'rejected') {
      _label = true
    }
    let _petFields = []
    modalData.walk && modalData.walk.pets && modalData.walk.pets.map(pet => {
      let _pee = false
      let _poo = false
      let temp

      if (modalData.walk.walk_meta && typeof modalData.walk.walk_meta === 'string') {
        temp = JSON.parse(modalData.walk.walk_meta)
      }

      if (temp && temp.pee) {
        if (Number(temp.pee[pet.id]) === 1) {
          _pee = true
        }
      }
      if (temp && temp.poo) {
        if (Number(temp.poo[pet.id]) === 1) {
          _poo = true
        }
      }
      _petFields.push({
        label: pet.name,
        type: 'petPeePooSelect',
        endWalk: this.state.endWalk,
        onChange: (value) => this.handlePeePooChange({ petId: pet.id, value }),
        value: { pee: _pee, poo: _poo },
        skip: isChangeRequestedOrPending || (!this.state.endWalk && !_label) || (!this.state.endWalk && !_pee && !_poo)
      })
    })
    return <div id='History'>
      {_walkStatus === 'in_process' && !this.state.endWalk && <FieldGroup items={[
        {
          label: 'Scan In',
          type: 'label',
          timeFormat: 12,
          value: moment(modalData.walk.start).isValid() ? moment(modalData.walk.start).format('LT') : ''
        }]} />}
      {!this.state.endWalk && !_label && !isChangeRequestedOrPending && <span className='endWalkBtn' onClick={this.toggleEndWalk}>Click to end appointment</span>}
      <FieldGroup items={[
        {
          error: this.submissionFailedFor('start_time_hour') || this.submissionFailedFor('start_time_minute') || this.submissionFailedFor('start_time_ampm'),
          amPmOnChange: selectedAmPm => this.setState({ start_time_ampm: selectedAmPm.value }),
          amPmValue: this.state.start_time_ampm,
          hourOnChange: selectedHour => this.setState({ start_time_hour: selectedHour.value }),
          hourValue: this.state.start_time_hour,
          minuteOnChange: selectedMinute => this.setState({ start_time_minute: selectedMinute.value }),
          minuteValue: this.state.start_time_minute,
          label: 'Scan In',
          type: !this.state.endWalk && _label ? 'label' : 'hour-minute',
          timeFormat: 12,
          value: moment(modalData.walk.start).isValid() ? moment(modalData.walk.start).format('LT') : '',
          skip: isChangeRequestedOrPending || (!this.state.endWalk && !_label)
        },
        {
          error: this.submissionFailedFor('end_time_hour') || this.submissionFailedFor('end_time_minute') || this.submissionFailedFor('end_time_ampm'),
          amPmOnChange: selectedAmPm => this.setState({ end_time_ampm: selectedAmPm.value }),
          amPmValue: this.state.end_time_ampm,
          hourOnChange: selectedHour => this.setState({ end_time_hour: selectedHour.value }),
          hourValue: this.state.end_time_hour,
          minuteOnChange: selectedMinute => this.setState({ end_time_minute: selectedMinute.value }),
          minuteValue: this.state.end_time_minute,
          label: 'Scan Out',
          type: !this.state.endWalk && _label ? 'label' : 'hour-minute',
          timeFormat: 12,
          value: moment(modalData.walk.end).isValid() ? moment(modalData.walk.end).format('LT') : '',
          skip: isChangeRequestedOrPending || (!this.state.endWalk && !_label)
        },
        {
          label: 'Duration',
          type: 'label',
          value: this.getDuration(modalData.walk.start, modalData.walk.end),
          skip: isChangeRequestedOrPending || this.state.endWalk || !_label
        },
        ..._petFields,
        {
          label: 'Walker Comments',
          type: 'comment',
          onChange: e => this.setState({ walker_comments: e.target.value }),
          value: this.state.walker_comments,
          skip: isChangeRequestedOrPending || (!this.state.endWalk && !_label) || _label
        }
      ]} />
      {(!isChangeRequestedOrPending && !_label && this.state.endWalk) && <div className='actionButtons'>
        <ButtonGroup buttons={[
          {
            onClick: this.toggleEndWalk,
            text: 'CANCEL',
            disabled: this.state.formSubmitted,
            textOnly: true,
            color: '#fff'
          }, {
            green: true,
            loading: this.state.formSubmitted,
            onClick: this.endWalk,
            text: 'SAVE'
          }
        ]} /></div>}
      {
        (modalData.walk.walker_comments && _label) && <div className='info-container'>
          <span className='label'>Walker Comments</span>
          <span className='description'>{modalData.walk.walker_comments}</span>
        </div>
      }
      {
        revisionHistory.length > 0 && <div className='info-container'>
          <span className='label'>Revision History</span>
          {revisionHistory.map((h, ind) => <span key={ind} className='description' dangerouslySetInnerHTML={{ __html: h.revision_message }} />)}
        </div>
      }
    </div >
  }
}

let mapStateToProps = state => {
  return {
    modalData: state.app.modal.data
  }
}

export default connect(mapStateToProps)(History)
