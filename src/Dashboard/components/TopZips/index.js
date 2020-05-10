// Libraries
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import { connect } from 'react-redux'

// Utils
import { utility } from 'Utils/utility'

// Controllers
import { dashboardController } from 'Controllers/dashboardController'

// Styles
import './index.css'

class TopZips extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 0
    }
    this._handleClick = this._handleClick.bind(this)
  }

  componentWillMount () {
    if (window.trtr) {
      let {
        topZips
      } = this.props

      topZips = topZips || {}
      let topZip = topZips.top_zip || []

      if (topZips && utility.isAnArray(topZip)) {
        if (topZip.length < 1) {
          // this.props.fetch.zipCodes(60622)
        } else if (topZip[0].zip) {
          // this.props.fetch.zipCodes(topZip[0].zip)
        }
      }
    }
    window.trtr = true
  }

  _handleClick (zip, selected) {
    this.setState({ selected })
    this.props.fetch && this.props.fetch.zipCodes(zip)
  }

  render () {
    let {
      topZips
    } = this.props

    topZips = topZips || {}
    let topZip = topZips.top_zip || []

    if (!topZip) return <div>NO DATA</div>

    // topZip = this.props.dashboard.zipCodes

    let lat = topZip ? topZip.lat : null
    let lng = topZip ? topZip.lng : null

    const AnyReactComponent = ({ text }) => (
      <div style={{
        position: 'relative',
        color: 'black',
        height: 40,
        width: 60,
        top: -20,
        left: -30
      }}>
        <div className='ion-ios-location' style={{ fontSize: 30, color: '#1875F0' }} />
      </div>
    )
    return (
      <div className='top-zips-container content'>
        <div className='map-container'>
          <GoogleMapReact
            defaultCenter={{ lat: 41.92, lng: -87.67 }}
            defaultZoom={15}
          >
            <AnyReactComponent lat={lat} lng={lng} />
          </GoogleMapReact>
        </div>
        <div className='top-zips-sidebar'>
          <div className='top-zips-sidebar-header'>
            <span style={{ padding: '5px 0' }}>zip</span>
            <span>net income</span>
          </div>
          {topZips && topZips.top_zip && topZips.top_zip.map((z, i) => {
            return (
              <button key={i} className={`sidebar-item ${i === this.state.selected ? 'highlighted' : ''}`} onClick={() => this._handleClick(z.zip, i)}>
                <span>{z.zip}</span>
                <span className='zip-amount'>{`$ ${z.amount}`}</span>
              </button>
            )
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
    )
  }
}

let mapStateToProps = state => {
  let topZips = dashboardController.selectTopZipsData(state)

  return {
    topZips
  }
}

export default connect(mapStateToProps)(TopZips)
