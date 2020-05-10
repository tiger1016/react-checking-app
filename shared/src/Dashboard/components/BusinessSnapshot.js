// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PieChart, Pie } from 'recharts'

// Styles
// import '../../scheduler/styles/style.less'

// Components

// Actions

class BusinessSnapshot extends Component {
  render () {
    const invoices = this.props.dashboard.businessSnapshot.invoices
    console.log('business', this.props)
    const dataOne = [{ value: invoices.unpaid }]
    const dataTwo = [{ value: 1 }]
    return (
      <div className='business-snapshot-container'>
        <div className='pie-chart' >
          <div className='pie-container'>
            <div className='inner-pie-data' style={{ color: '#FF9D9D' }}>
              {invoices.unpaid}
            </div>
            <PieChart width={150} height={150}>
              <Pie fill='#FF9D9D' data={dataOne} dataKey='value' cx={70} cy={70} innerRadius={53} outerRadius={67} strokeWidth={0} startAngle={90} endAngle={-270} />
            </PieChart>
            <div className='pie-label' style={{ paddingTop: 17 }}>
              <span>Outstanding Invoices</span>
            </div>
            <div className='more-detail'>
              <button onClick={() => this.props.history.push('/invoicing')}>MORE DETAIL</button>
            </div>
          </div>
        </div>

        <div className='pie-chart'>
          <div className='pie-container'>
            <div className='inner-pie-data' style={{ color: '#FF9D9D' }}>
              0!
            </div>
            <PieChart width={150} height={150}>
              <Pie fill='#FF9D9D' data={dataTwo} dataKey='value' cx={70} cy={70} innerRadius={53} outerRadius={67} strokeWidth={0} startAngle={90} endAngle={-270} />
            </PieChart>
            <div className='pie-label' style={{ paddingTop: 17 }}>
              <span>Remaining Barcodes</span>
            </div>
            <div className='more-detail'>
              <button onClick={() => this.props.history.push('/your-account/qr-codes')}>ORDER MORE</button>
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
)(BusinessSnapshot)
