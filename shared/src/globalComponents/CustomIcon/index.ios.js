// Libraries
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StyleSheet, View, Text } from 'react-native'

export default class CustomIcon extends React.PureComponent {
  renderIcon = () => {
    const {
      color,
      name,
      size
    } = this.props

    if (this.props.MaterialIcons) return <MaterialIcons name={name} size={size} color={color} />
    if (this.props.MaterialCommunityIcons) return <MaterialCommunityIcons name={name} size={size} color={color} />
    return <Ionicons name={name} size={size} color={color} />
  }

  renderBadge = () => {
    const {
      BadgeCount
    } = this.props

    return <Text style={{
      color: '#FFFFFF',
      fontSize: 12
    }}>{BadgeCount}</Text>
  }

  render () {
    const {
      BadgeCount,
      IconBadgeStyle,
      MainViewStyle
    } = this.props

    if (BadgeCount && BadgeCount > 0) {
      return <View style={[styles.IconContainer]}>
        <View style={[styles.Main, MainViewStyle || {}]}>
          {this.renderIcon()}
          <View style={[styles.IconBadge, IconBadgeStyle || {}]}>
            {this.renderBadge()}
          </View>
        </View>
      </View>
    }

    return this.renderIcon()
  }
}

const styles = StyleSheet.create({
  IconBadge: {
    position: 'absolute',
    top: -3,
    right: 2,
    minWidth: 15,
    height: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000'
  },
  IconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Main: {
    minWidth: 25,
    minHeight: 25
  }
})
