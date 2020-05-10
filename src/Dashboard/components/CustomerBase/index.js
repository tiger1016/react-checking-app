// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'

// Controllers
import { dashboardController } from 'Controllers'

// Styles
import './index.css'

class CustomerBase extends Component {
  render () {
    let {
      customerBase
    } = this.props

    if (!customerBase || !customerBase.customer_base) {
      return <div>NO DATA</div>
    }

    customerBase = customerBase.customer_base

    return <div className='customer-base-container content'>
      <div className='customer-data'>
        <div style={{ borderRight: '2px solid rgba(151, 151, 151, 0.5)' }}>
          <span style={{ color: '#42B856' }}>{customerBase.active}</span>
        </div>
        <div style={{ borderRight: '2px solid rgba(151, 151, 151, 0.5)' }}>
          <span style={{ color: '#1875F0' }}>{customerBase.new}</span>
        </div>
        <div>
          <span style={{ color: '#B3B3B3' }}>{customerBase.inactive}</span>
        </div>
        {/* <div> */}
        {/*   <span style={{ color: '#FF9D9D' }}>{customerBase.outstanding_invoices || 0}</span> */}
        {/* </div> */}
      </div>
      <div className='customer-legend'>
        <div className='legend-row'>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div className='data-color' style={{ backgroundColor: '#42B856', marginBottom: 2 }} />
            <span style={{ paddingLeft: 22 }}>Active Customers</span>
          </div>
          <div>
            {customerBase.active}
          </div>
        </div>
        <div className='legend-row'>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div className='data-color' style={{ backgroundColor: '#1875F0', marginBottom: 2 }} />
            <span style={{ paddingLeft: 22 }}>New Customers (Last 30 Days)</span>
          </div>
          <div>
            {customerBase.new}
          </div>
        </div>
        <div className='legend-row'>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div className='data-color' style={{ backgroundColor: '#B3B3B3', marginBottom: 2 }} />
            <span style={{ paddingLeft: 22 }}>Inactive Customers</span>
          </div>
          <div>
            {customerBase.inactive}
          </div>
        </div>
        {/* <div className='legend-row'> */}
        {/*   <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}> */}
        {/*     <div className='data-color' style={{ backgroundColor: '#FF9D9D', marginBottom: 2 }} /> */}
        {/*     <span style={{ paddingLeft: 22 }}>Customers with Outstanding Invoices</span> */}
        {/*   </div> */}
        {/*   <div> */}
        {/*     {customerBase.outstanding_invoices || 0} */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </div>
  }
}

let mapStateToProps = state => {
  let customerBase = dashboardController.selectCustomerBaseData(state)

  return {
    customerBase
  }
}

export default connect(mapStateToProps)(CustomerBase)
