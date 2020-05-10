// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
// import GoogleMapReact from 'google-map-react'

// Styles
// import '../../scheduler/styles/style.less'

// Actions
// import fetch from '../../../actions/dashboard/fetch'

class TopZips extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: 0 }
    this._handleClick = this._handleClick.bind(this)
  }

  componentWillMount () {
    const dashboard = this.props.dashboard || {}
    const topZips = dashboard.topZips || {}
    const topZip = topZips.top_zip || []

    if (topZip.length < 1) {
      this.props.fetch.zipCodes(60622)
    } else if (topZips[0].zip) {
      this.props.fetch.zipCodes(topZip[0].zip)
    }
  }

  _handleClick (zip, selected) {
    this.setState({ selected })
    this.props.fetch.zipCodes(zip)
  }

  render () {
    // let topZips = this.props.dashboard.topZips.top_zip
    // let zipCode = this.props.dashboard.zipCodes
    // let lat = zipCode ? zipCode.lat : null
    // let lng = zipCode ? zipCode.lng : null

    // const AnyReactComponent = ({ text }) => (
    //   <div style={{
    //     position: 'relative',
    //     color: 'black',
    //     height: 40,
    //     width: 60,
    //     top: -20,
    //     left: -30
    //   }}>
    //     <div className='ion-ios-location' style={{ fontSize: 30, color: '#1875F0' }} />
    //   </div>
    // )

    const data = [
      {
        user_id: 36396,
        invoice_id: 8703,
        zip: 60622,
        amount: '186.00'
      },
      {
        user_id: 14750,
        invoice_id: 1101,
        zip: 60642,
        amount: '185.00'
      },
      {
        user_id: 36396,
        invoice_id: 8703,
        zip: 60647,
        amount: '186.00'
      },
      {
        user_id: 36396,
        invoice_id: 8703,
        zip: 60614,
        amount: '186.00'
      },
      {
        user_id: 36396,
        invoice_id: 8703,
        zip: 60607,
        amount: '186.00'
      }
    ]

    return <div className='top-zips-container'>
      <div className='top-zips-sidebar'>
        <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #F5F5F5', paddingLeft: 28, paddingRight: 44, justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <span style={{ padding: '5px 0' }}>zip</span>
          <span>net income</span>
        </div>
        {data.map((z, i) => {
          return <button className={`sidebar-item ${i === this.state.selected ? 'highlighted' : ''}`} onClick={() => this._handleClick(z.zip, i)}>
            <span>{z.zip}</span>
            <span className='zip-amount'>{`$ ${z.amount}`}</span>
          </button>
        })}
        {/*
        <div className='sidebar-item'>
          <span>10065</span>
          <span>$ 4173.21</span>
        </div>
        <div className='sidebar-item'>
          <span>10065</span>
          <span>$ 4173.21</span>
        </div>
        <div className='sidebar-item'>
          <span>10065</span>
          <span>$ 4173.21</span>
        </div>
        <div className='sidebar-item'>
          <span>10065</span>
          <span>$ 4173.21</span>
        </div>
        <div className='sidebar-item'>
          <span>10065</span>
          <span>$ 4173.21</span>
        </div>
      */}
      </div>
    </div>
  }
}

export default connect(state => {
  return {}
}
)(TopZips)
