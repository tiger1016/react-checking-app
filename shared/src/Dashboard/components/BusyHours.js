// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BarChart, Bar, YAxis, ResponsiveContainer } from 'recharts'

// Styles
// import '../../scheduler/styles/style.less'

// Components

// Actions

class BusyHours extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this._formatData = this._formatData.bind(this)
  }

  _formatData (data, label) {
    const formattedData = []
    for (var key in data) {
      if (key === '12') {
      } else if (key % 2 === 0) {
        formattedData.push({ name: key, pm: 12 })
      } else {
        formattedData.push({ name: key, pm: 12 })
      }
    }
    if (label === 'pm') {
      formattedData.unshift({ name: '12', pm: 12 })
    }
    return formattedData
  }

  render () {
    const busyHours = this.props.dashboard.busyHours.busy_hours
    console.log('busy hours props', busyHours)
    const am = this._formatData(busyHours.am, 'am')
    const pm = this._formatData(busyHours.pm, 'pm')
    const data = am.concat(pm)
    console.log('data', data)
    const labels = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    console.log('data', this.props, data)
    return (
      <div className='busy-hours-container' style={{ display: 'flex', flexDirection: 'row' }}>
        <div className='barchart-container'>
          <div className='chart-backdrop'>
            <div className='backdrop-container'>
              <div style={{ paddingTop: 5 }} />
              <div className='backdrop-horizontal' />
              <div className='backdrop-horizontal' />
              <div className='backdrop-horizontal' />
              <div className='backdrop-horizontal' />
              <div className='backdrop-vertical' />
            </div>
          </div>
          <ResponsiveContainer width='100%' height={168}>
            <BarChart width='100%' height={157} data={data} >
              <YAxis type='number' domain={[0, 24]} hide axisLine={false} tickLine={false} />
              <Bar dataKey='pm' fill='#979797' barSize={5} />
            </BarChart>
          </ResponsiveContainer>
          <div className='xAxis-labels'>
            {labels.map((label, i) => {
              if (i < 6) {
                if (label % 2 === 0) {
                  return <span style={{ color: '#42B856' }}>{label}</span>
                }
                return <span />
              }
              if (label % 2 === 0) {
                return <span style={{ color: '#1875F0' }}>{label}</span>
              }
              return <span />
            })}
          </div>
          <div className='barchart-legend'>
            <div className='data-color' />
            <span>AM</span>
            <div className='data-color' style={{ backgroundColor: '#1875F0', marginLeft: 5 }} />
            <span>PM</span>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  state => {
    return {

    }
  }
)(BusyHours)
