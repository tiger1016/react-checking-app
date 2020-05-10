// Libraries
import React, { Component } from 'react'
import { BarChart, Bar, YAxis } from 'recharts'
import { connect } from 'react-redux'

// Controllers
import { dashboardController } from 'Controllers'

// Utils
import { utility } from 'Utils'

// Styles
import './index.css'

// Components
import ChartBackDrop from '../ChartBackDrop'

class BusyHours extends Component {
  formatData = (data, label) => {
    const formattedData = []
    for (var key in data) {
      formattedData.push({ name: key, pm: data[key], label })
    }
    return formattedData
  }

  render () {
    const {
      busyHours,
      windowWidth
    } = this.props

    if (!busyHours || !busyHours.busy_hours) { return <div>NO DATA</div> }

    const busyHoursData = busyHours.busy_hours

    const am = this.formatData(busyHoursData.am, 'am')
    const pm = this.formatData(busyHoursData.pm, 'pm')
    const index = pm.findIndex(d => d.name === '12' && d.label === 'pm')
    utility.arrayMoveInPlace(pm, index, 0)
    const data = am.concat(pm)

    let chartWidth = 413
    let chartHeight = 157

    if (windowWidth < 990) {
      chartWidth = 550
    } else if (windowWidth < 1055) {
      chartWidth = 263
    } else if (windowWidth < 1450) {
      chartWidth = 313
    }

    return <div className='busy-hours-container content' style={{ display: 'flex', flexDirection: 'row' }}>
      <div className='barchart-container' style={{ width: chartWidth }}>
        <ChartBackDrop />
        <BarChart width={chartWidth} height={chartHeight} data={data} >
          <YAxis type='number' domain={[0, 24]} hide axisLine={false} tickLine={false} />
          <Bar dataKey='pm' fill='#979797' barSize={5} />
        </BarChart>
        <div className='xAxis-labels' style={{ width: chartWidth }}>
          {data.map((item, i) => {
            if (item) {
              return <span
                key={i}
                style={{ color: item.label === 'am' ? '#42B856' : '#1875F0' }}>
                {item.name}
              </span>
            }
            return <span key={i} />
          })}
        </div>
        <div className='barchart-legend' style={{ width: chartWidth }}>
          <div className='data-color' />
          <span>AM</span>
          <div className='data-color' style={{ backgroundColor: '#1875F0', marginLeft: 5 }} />
          <span>PM</span>
        </div>
      </div>
    </div>
  }
}

let mapStateToProps = state => {
  let busyHours = dashboardController.selectBusyHoursData(state)

  return {
    busyHours
  }
}

export default connect(mapStateToProps)(BusyHours)
