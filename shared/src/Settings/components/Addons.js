// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// Styles
import '../styles/style.less'

class Addons extends Component {
  render () {
    return (
      <div className='services-container'>
        <div className='services-container-header'>
          <span>Add-ons</span>
          <div className='create-service' style={{ paddingRight: '2%' }}>
            <button onClick={() => console.log('create-service')} className='add-service-button'>
              <div style={{ fontFamily: 'Late', fontSize: '22px' }}>+</div>
              <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '1px', lineHeight: '11px', paddingTop: '2px', paddingLeft: '10px' }}>NEW ADD-ON</div>
            </button>
          </div>
        </div>
        <div className='services-body'>
          <span style={{ fontSize: '47%' }}>Order of add-ons ?</span>
          <div className='services-header'>
            <div className='services-row-title' >
              <span>ADD-ON NAME</span>
            </div>
            <div className='services-row-title'>
              <span>COMPANY PRICE</span>
            </div>
            <div className='services-row-title'>
              <span>STAFF PAY RATE</span>
            </div>
            <div className='services-row-title'>
              <span>ARCHIVE</span>
            </div>
          </div>
          <div className='services-row-container'>
            <div className='services-row' >
              <span>1 hour 30 minute dog walk</span>
            </div>
            <div className='services-row' >
              <span>$25.00</span>
            </div>
            <div className='services-row' >
              <div style={{ border: '2px solid gray', height: 45, width: '55%' }}>
                <span>$</span>
              </div>
            </div>
            <div className='services-row' >
              <span>insert icon</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', paddingBottom: '7%', paddingTop: '3%', fontSize: 12 }}>
            <button action='submit' style={{ width: 100 }}>Save</button>
            <div onClick={() => console.log('cancel')} style={{ marginLeft: '6.5%', cursor: 'pointer' }}>cancel</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  state => {
    return {

    }
  }
)(Addons))
