// Libraries
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { MapView, Location, Permissions } from 'expo'
// Helpers

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null
    }
  }

  componentDidMount () {
    this._getLocationAsync()
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion)
    this.setState({ mapRegion })
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied'
      })
    } else {
      this.setState({ hasLocationPermissions: true })
    }

    const location = await Location.getCurrentPositionAsync({})
    this.setState({ locationResult: JSON.stringify(location) })

    // Center the map on the location we just fetched.
    this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } })
  }

  render () {
    return (<View><View><Text>Dashboard</Text></View>
      {
        this.state.locationResult === null
          ? <Text>Finding your current location...</Text>
          : this.state.hasLocationPermissions === false
            ? <Text>Location permissions are not granted.</Text>
            : this.state.mapRegion === null
              ? <Text>Map region doesn't exist.</Text>
              : <MapView
                style={{ alignSelf: 'stretch', height: 400 }}
                region={this.state.mapRegion}
                onRegionChange={this._handleMapRegionChange}><MapView.Marker
                  key={1}
                  coordinate={{ latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude }}
                  title={'Some Title'}
                  description={'Hello world'}
                /></MapView>
      }
      <Text>
        Location: {this.state.locationResult}
      </Text>
    </View>
    )
  }
}

export default connect(
  state => {
    return {
      dashboard: state.dashboard
    }
  },
  dispatch => ({
    dispatch
  })
)(Dashboard)
