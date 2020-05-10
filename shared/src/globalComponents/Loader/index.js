import React from 'react'
import { ActivityIndicator } from 'react-native'

export default class loader extends React.Component {
  render () {
    return <ActivityIndicator size={this.props.size || 'large'} color={this.props.color || 'rgb(2,86,138)'} />
  }
}
