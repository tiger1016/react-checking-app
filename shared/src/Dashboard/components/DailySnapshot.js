// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie, Cell } from 'recharts'

// Styles
// import '../../scheduler/styles/style.less'

// Components

// Actions

class DailySnapshot extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const services = this.props.dashboard.dailySnapshot.services

    console.log('daily snaps', services)
    const dataOne = [{ value: services.pending < 1 ? 12 : services.pending }]
    const dataTwo = [{ name: 'In Progress', value: 14 }, { name: 'Late', value: 2 }]
    const dataThree = [{ name: 'Completed', value: 58 }, { name: 'Scheduled', value: 4 }]
    return (
      <div className='daily-snapshot-container'>
        <div className='pie-chart' >
          <div className='pie-container'>
            <div className='inner-pie-data' style={{ color: '#808080' }}>
              <span>{services.pending}</span>
            </div>
            <PieChart width={140} height={140}>
              <Pie fill='#FFF1AA' data={dataOne} dataKey='value' cx={70} cy={70} innerRadius={47} outerRadius={60} strokeWidth={0} startAngle={90} endAngle={-270} />
            </PieChart>
            <div className='pie-label' style={{ paddingTop: 17 }}>
              <span>Pending</span>
              <span>(unassigned)</span>
            </div>
          </div>
        </div>
        <div className='pie-chart'>
          <div className='pie-container'>
            <div className='inner-pie-data' style={{ color: '#B6E4EB' }}>
              <span>{services.in_process + services.late}</span>
            </div>
            <PieChart width={140} height={140}>
              <Pie fill='#B6E4EB' data={dataTwo} dataKey='value' cx={70} cy={70} innerRadius={47} outerRadius={60} strokeWidth={0} startAngle={90} endAngle={-270}>
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
        <div className='pie-chart-full'>
          <div className='pie-container-full'>
            <div className='inner-pie-data' style={{ color: '#808080' }}>
              <span>{services.completed + services.approved}</span>
            </div>
            <PieChart width={140} height={140}>
              <Pie data={dataThree} fill='#e5e5e5' dataKey='value' cx={70} cy={70} innerRadius={47} outerRadius={60} strokeWidth={0} startAngle={90} endAngle={-270}>
                <Cell fill='#e5e5e5' />
                <Cell fill='#1875F0' />
              </Pie>
            </PieChart>
            <div className='pie-label-full'>
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
    )
  }
}

export default connect(
  state => {
    return {

    }
  }
)(DailySnapshot)
