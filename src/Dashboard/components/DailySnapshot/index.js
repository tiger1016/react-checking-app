// Libraries
import React, { Component } from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import { connect } from 'react-redux'

// Controllers
import { dashboardController } from 'Controllers'

// Styles
import './index.css'

class DailySnapshot extends Component {
  render () {
    // const data02 = [{name: 'A1', value: 110}]

    let {
      dailySnapshot
    } = this.props

    if (!dailySnapshot || !dailySnapshot.services) {
      return <div>NO DATA</div>
    }

    let services = dailySnapshot.services
    let chartHeight = 140 + 8
    let chartWidth = 140 + 8
    let cx = 70
    let cy = 70
    let innerRadius = 47 + 2 + 4
    let outerRadius = 60 + 4 + 4

    let dataOne = [{ name: 'services', value: 1 }]
    let dataTwo = [{ name: 'In Progress', value: parseInt(services.in_process || 0) }, { name: 'Late', value: parseInt(services.late || 0) }]
    let dataThree = [{ name: 'Completed', value: parseInt(services.completed || 0) }, { name: 'Scheduled', value: parseInt(services.approved || 0) }]

    return <div className='daily-snapshot-container content'>
      <div className='pie-chart' >
        <div className='pie-container'>
          <div className='inner-pie-data' style={{ color: '#808080' }}>
            <span>{parseInt(services.pending || 0)}</span>
          </div>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie fill='#FFF1AA' data={dataOne} dataKey='value' cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} strokeWidth={0} startAngle={90} endAngle={-270} />
          </PieChart>
          <div className='pie-label' style={{ paddingTop: 17 }}>
            <span>Pending</span>
            <span>(unassigned)</span>
          </div>
        </div>
      </div>
      <div className='pie-chart'>
        <div className='pie-container'>
          <div className='inner-pie-data' style={{ color: '#FFC7C7' }}>
            <span>{parseInt(services.in_process || 0) + parseInt(services.late || 0)}</span>
          </div>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie fill='#B6E4EB' data={dataTwo} dataKey='value' cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} strokeWidth={0} startAngle={90} endAngle={-270}>
              <Cell fill='#B6E4EB' />
              <Cell fill='#FFC7C7' />
            </Pie>
          </PieChart>
          <div className='pie-label'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='data-color' style={{ backgroundColor: '#B6E4EB' }} />
                <span style={{ paddingTop: 2, paddingLeft: 20 }}>{`${services.in_process} in Progress`}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                <div className='data-color' style={{ backgroundColor: '#FFC7C7' }} />
                <span style={{ paddingTop: 2, paddingLeft: 20 }}>{`${services.late} Late`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pie-chart'>
        <div className='pie-container'>
          <div className='inner-pie-data' style={{ color: '#1875F0' }}>
            <span>{parseInt(services.completed || 0) + parseInt(services.approved || 0)}</span>
          </div>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie data={dataThree} fill='#e5e5e5' dataKey='value' cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} strokeWidth={0} startAngle={90} endAngle={-270}>
              <Cell fill='#e5e5e5' />
              <Cell fill='#1875F0' />
            </Pie>
          </PieChart>
          <div className='pie-label'>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='data-color' style={{ backgroundColor: '#e5e5e5' }} />
                <span style={{ paddingTop: 2, paddingLeft: 20 }}>{`${services.completed} Completed`}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                <div className='data-color' style={{ backgroundColor: '#1875F0' }} />
                <span style={{ paddingTop: 2, paddingLeft: 20 }}>{`${services.approved} Scheduled`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}

let mapStateToProps = state => {
  let dailySnapshot = dashboardController.selectDailySnapshotData(state)

  return {
    dailySnapshot
  }
}

export default connect(mapStateToProps)(DailySnapshot)
