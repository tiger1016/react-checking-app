// Create a custom Button from Nachos-UI
// Libraries
import React from 'react'
import { StyleSheet } from 'react-native'
import Button from '../../../globalComponents/Button'

export default class CustomButton extends React.Component {
  render () {
    const { title, style, clickable } = this.props
    const { singleButton } = defaultStyle
    const combineStyles = StyleSheet.flatten([singleButton, style])
    return <Button
      uppercase='true'
      kind='squared'
      style={combineStyles}
      onPress={() => clickable()}
      text={title} />
  }
}

// Creating a new CSS style for a single button
const defaultStyle = StyleSheet.create({
  singleButton: {
    flex: 1,
    margin: 0,
    backgroundColor: 'orange'
  }
})
