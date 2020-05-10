// Libraries
// import _ from 'lodash'
import React, { Component } from 'react'
import { View } from 'react-native'
import { MapView } from 'expo'

// const AnyReactComponent = props => {
//   var cf = 20
//   return <div style={{width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', backgroundColor: '#1e767a'}}>
//     <span style={{width: cf + 'px', height: cf + 'px', borderRadius: cf + 'px', lineHeight: cf + 'px', color: '#FFF', textAlign: 'center', display: 'block'}}>{props.index}</span>
//   </div>
// }

export default class GMaps extends Component {
  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 20
  }

  render () {
    // var center = {
    //   lat: parseFloat(this.props.walkPath && this.props.walkPath[0] ? this.props.walkPath[0].lat : 59.95),
    //   lng: parseFloat(this.props.walkPath && this.props.walkPath[0] ? this.props.walkPath[0].long : 30.33)
    // }
    return <View style={{ height: 250 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }} />
    </View>
  }
}
