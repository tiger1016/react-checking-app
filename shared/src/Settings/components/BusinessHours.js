// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Select from 'react-select'

// Styles
import '../styles/style.less'

// Constants
import { START_TIME, MINUTES } from '../../../constants/Constants'

const days = ['Mondays', 'Tuesdays', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

class BusinessHours extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0,
      timeSlot: 0
    }
  }

  render () {
    console.log('customer billing')
    return (
      <div className='business-hours-container'>
        <span style={{ paddingLeft: '3.2%' }}>Business Hours</span>
        <div className='sub-nav-header'>
          <div className='sub-nav-link' >
            <br />
          </div>
          <div className='sub-nav-link' style={{ borderBottom: this.state.selected === 0 ? '2px solid #1875F0' : '2px solid #F5F5F5', padding: '.5e% 0' }} onClick={() => this.setState({ selected: 0 })}>
            <span>Working Hours</span>
          </div>
          <div className='sub-nav-link' >
            <br />
          </div>
          <div className='sub-nav-link' style={{ borderBottom: this.state.selected === 1 ? '2px solid #1875F0' : '2px solid #F5F5F5', padding: '.5% 0' }} onClick={() => this.setState({ selected: 1 })}>
            <span>Holidays</span>
          </div>
          <div className='sub-nav-link' style={{ flex: 1, flexShrink: 1 }}>
            <br />
          </div>
        </div>
        <div className='business-hours-body'>
          <div className='input-container'>
            <div className='input-description' style={{ width: '7%' }}>
              Time Slots
            </div>
            <div className='input-selection' style={{ paddingLeft: 10 }}>
              <label onClick={() => this.setState({ timeSlot: 0 })}>
                <input name='payByTheHour' component='input' type='radio' value='by the hour' />
                {' '}
                <span>By The Hour</span>
              </label>
              <label onClick={() => this.setState({ timeSlot: 1 })}>
                <input name='payByTheHour' component='input' type='radio' value='time windoes' />
                {' '}
                <span>Time Windows</span>
              </label>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <span>WORK DAY</span>
              </div>
              <div>
                <span>OPEN AT</span>
              </div>
              <div>
                <span>CLOSE AT</span>
              </div>
            </div>
            <div>
              {days.map((day, i) => {
                return (
                  <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: i % 2 === 0 ? 'lightgrey' : 'white' }}>
                    <div style={{ width: '15%' }}>
                      <input type='checkbox' value={day} />
                      <span>{day}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '25%' }}>
                      <Select
                        name='form-field-name'
                        value='one'
                        className='services-hour'
                        options={START_TIME}
                        placeholder='-hr-'
                      />
                      <Select
                        name='form-field-name'
                        value='one'
                        className='services-hour'
                        options={MINUTES}
                        placeholder='-mm-'
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '25%' }}>
                      <Select
                        name='form-field-name'
                        value='one'
                        className='services-hour'
                        options={START_TIME}
                        placeholder='-hr-'
                      />
                      <Select
                        name='form-field-name'
                        value='one'
                        className='services-hour'
                        options={MINUTES}
                        placeholder='-mm-'
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {

    }
  }
)(BusinessHours))
