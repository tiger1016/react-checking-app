// Libraries
// import _ from 'lodash'
import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = props => {
  var cf = 20
  return <div style={{ width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', backgroundColor: '#1e767a' }}>
    <span style={{ width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', lineHeight: cf + 'px', color: '#FFF', textAlign: 'center', display: 'block' }}>{props.index}</span>
  </div>
}

export default class GMaps extends Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 20
  }

  render () {
    var center = {
      lat: parseFloat(this.props.walkPath && this.props.walkPath[0] ? this.props.walkPath[0].lat : 59.95),
      lng: parseFloat(this.props.walkPath && this.props.walkPath[0] ? this.props.walkPath[0].long : 30.33)
    }
    return <div style={{ height: '250px' }}>
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={14}
        center={center}
        onGoogleApiLoaded={({ map, maps }) => {
          console.log('map', map)
          console.log('maps', maps)
        }}
        yesIWantToUseGoogleMapApiInternals
      >
        {this.props.walkPath.map((p, index) => <AnyReactComponent
          lat={p.lat}
          lng={p.long}
          time={p.ts}
          key={index}
          index={index}
        />)}
      </GoogleMapReact>
    </div>
  }
}
