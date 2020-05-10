// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import CustomToolTip from './CustomToolTip'
import moment from 'moment'

// Styles
// import '../../scheduler/styles/style.less'

// Components

// Actions

class Revenue extends Component {
  render () {
    const revenue = this.props.dashboard.revenue.invoices_paids
    const labels = []
    const sortedData = []
    const compareDate = (d) => { return moment(d).format('MDD') }

    for (var month in revenue) {
      labels.push(month)
      for (var week in revenue[month]) {
        const date = moment(week).format('MM/DD/YY')
        if (!revenue[month][week]) {
          sortedData.push({ name: `$00.00 ${date}`, pv: 0, amt: 1000, compareDate: `${compareDate(week)}` })
        } else {
          sortedData.push({ name: `$${revenue[month][week]} ${date}`, pv: Number(revenue[month][week]), amt: 1000, compareDate: `${compareDate(week)}` })
        }
      }
    }
    sortedData.sort((a, b) => {
      return Number(a.compareDate) - Number(b.compareDate)
    })

    labels.sort((a, b) => { return (moment(a).isAfter(b) ? -1 : 1) })
    sortedData.reverse()
    labels.reverse()
    return (
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'row' }}>
        <div className='revenue-container'>
          <div className='chart-backdrop'>
            <div className='backdrop-container'>
              <div style={{ paddingTop: 5 }} />
              <div className='backdrop-horizontal' />
              <div className='backdrop-horizontal' />
              <div className='backdrop-horizontal' />
              <div className='backdrop-horizontal' />
              <div className='backdrop-vertical' style={{ right: '35px' }} />
            </div>
          </div>
          <div className='line-chart-container'>
            <ResponsiveContainer width='100%' height={168}>
              <LineChart width='100%' height={168} data={sortedData} margin={{ top: 0, right: 30, left: 20, bottom: 10 }}>
                <Tooltip content={<CustomToolTip />} />
                <Line type='monotone' dataKey='pv' stroke='#50D166' strokeWidth='3px' activeDot={false} dot={false} points={[{ x: 12, y: 12, value: 240 }]} />
                <YAxis type='number' domain={[0, 1000]} hide axisLine={false} tickLine={false} tick={false} />
              </LineChart>
            </ResponsiveContainer>

            <div className='line-chart-label'>
              {labels.map((l) => {
                return (
                  <div>
                    <span>{l}</span>
                  </div>
                )
              })}
            </div>
            <div className='line-chart-legend'>
              <div className='data-color' style={{ backgroundColor: '#50D166' }} />
              <span>Revenue</span>
            </div>
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
)(Revenue)
