// Libraries
import React, { Component } from 'react'
import { LineChart, Line, YAxis, Tooltip } from 'recharts'
import moment from 'moment'
import { connect } from 'react-redux'

// Controllers
import { dashboardController } from 'Controllers'

// Styles
import './index.css'

// Components
import ChartBackDrop from '../ChartBackDrop'
import CustomToolTip from '../CustomToolTip'
import ErrorDisplay from 'GlobalComponents/ErrorDisplay'

class Revenue extends Component {
  render () {
    let {
      revenue,
      windowWidth
    } = this.props

    if (!revenue || !revenue.invoices_paids) {
      return <ErrorDisplay message='No data to display' />
    }

    revenue = revenue.invoices_paids

    const chartHeight = 168
    let chartWidth = 500 + 200

    if (windowWidth < 990) {
      chartWidth = 580
    } else if (windowWidth < 1100) {
      chartWidth = 450
    } else if (windowWidth < 1360) {
      chartWidth = 500
    } else if (windowWidth < 1380) {
      chartWidth = 600
    } else if (windowWidth < 1470) {
      chartWidth = 650
    }

    let labels = []
    let sortedData = []
    const compareDate = (d) => moment(d).format('MDD')

    for (var month in revenue) {
      labels.push(month)
      for (var day in revenue[month]) {
        const date = moment(day).format('M/D/YY')
        if (!revenue[month][day]) {
          sortedData.push({ name: `$0 ${date}`, pv: 0, amt: 1000, compareDate: `${compareDate(day)}` })
        } else {
          sortedData.push({ name: `$${revenue[month][day]} ${date}`, pv: Number(revenue[month][day]), amt: 1000, compareDate: `${compareDate(day)}` })
        }
      }
    }
    sortedData.sort((a, b) => Number(b.compareDate) - Number(a.compareDate))
    labels.sort((a, b) => moment(a).isAfter(b) ? 1 : -1)
    labels.reverse()
    sortedData.reverse()
    return <div className='revenue-container content'>
      <div className='line-chart-container'>
        <ChartBackDrop right />
        <LineChart width={chartWidth} height={chartHeight} data={sortedData} margin={{ top: 0, right: 30, left: 20, bottom: 10 }}>
          <Tooltip content={<CustomToolTip />} />
          <Line type='monotone' dataKey='pv' stroke='#50D166' strokeWidth='3px' activeDot={false} dot={false} />
          <YAxis type='number' domain={[0, 'dataMax']} hide axisLine={false} tickLine={false} tick={false} />
        </LineChart>
        <div className='line-chart-label' style={{ width: chartWidth }}>
          {labels.map((l, i) => <div key={i}>
            <span>{l}</span>
          </div>)}
        </div>
        <div className='line-chart-legend' style={{ width: chartWidth }}>
          <div className='data-color' style={{ backgroundColor: '#50D166' }} />
          <span>Revenue</span>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  const revenue = dashboardController.selectRevenueData(state)

  return {
    revenue
  }
}

export default connect(mapStateToProps)(Revenue)
