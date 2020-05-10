// Libraries
import React, { Component } from 'react'
import { PieChart, Pie } from 'recharts'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// Controllers
import { dashboardController } from 'Controllers'

// Components
import DashboardButton from '../DashboardButton'

// Styles
import './index.css'

class BusinessSnapshot extends Component {
  render () {
    let {
      businessSnapshot,
      history
    } = this.props

    if (!businessSnapshot || !businessSnapshot.invoices) {
      return <div>NO DATA</div>
    }

    let invoices = businessSnapshot.invoices

    let chartWidth = 150
    let chartHeight = 150
    let cx = 70
    let cy = 70
    let innerRadius = 53
    let outerRadius = 67

    let dataOne = [{ value: invoices.unpaid }]
    // let dataTwo = [{ value: 1 }]
    // let assigned = this.props.qrcodes && this.props.qrcodes.qr_info ? this.props.qrcodes.qr_info.assigned : 0
    let unAssigned = this.props.qrcodes && this.props.qrcodes.qr_info ? this.props.qrcodes.qr_info.un_assigned : 0
    return <div className='business-snapshot-container content'>
      <div className='pie-chart' >
        <div className='pie-container'>
          <div className='inner-pie-data' style={{ color: '#FF9D9D' }}>
            {invoices.unpaid}
          </div>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie fill='#FF9D9D' data={dataOne} dataKey='value' cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} strokeWidth={0} startAngle={90} endAngle={-270} />
          </PieChart>
          <div className='pie-label' style={{ paddingTop: 17 }}>
            <span>Outstanding Invoices</span>
          </div>
          <DashboardButton onClick={() => history.push('/invoices/unpaid')} text={'MORE DETAIL'} />
        </div>
      </div>
      <div className='pie-chart'>
        <div className='pie-container'>
          <div className='inner-pie-data' style={{ color: '#FF9D9D' }}>
            {unAssigned}
          </div>
          <PieChart width={chartWidth} height={chartHeight}>
            <Pie fill='#FF9D9D' data={[{ value: unAssigned }]} dataKey='value' cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} strokeWidth={0} startAngle={90} endAngle={-270} />
          </PieChart>
          <div className='pie-label' style={{ paddingTop: 17 }}>
            <span>Remaining Barcodes</span>
          </div>
          <DashboardButton onClick={() => history.push('/profile/qr-codes')} text={'ORDER MORE'} />
        </div>
      </div>
    </div>
  }
}

let mapStateToProps = state => {
  let businessSnapshot = dashboardController.selectBusinessSnapshotData(state)

  return {
    businessSnapshot,
    qrcodes: state.profile.profile
  }
}

export default withRouter(connect(mapStateToProps)(BusinessSnapshot))
