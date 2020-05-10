// Create Status Component that it is shown when AllStatusComponent is clicked
// Importing all the necessary libraries
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Radio } from 'nachos-ui'

// Utils
import format_number from '../../../utils/format_number' // eslint-disable-line camelcase

export default class StatusComponent extends React.Component {
  // Constructor
  constructor (props) {
    super(props)
    this.state = {
      radioIsChecked: false
    }
  }

  // Handling when the user clicks a button
  handleClick = (radioIsChecked) => {
    this.setState({ radioIsChecked })
  }

  // Rendering
  render () {
    const {
      title,
      circleColor,
      clickable
      // buttonSelected,
      // showCircle
    } = this.props
    const { circleStyle } = styles
    const combineStyles = StyleSheet.flatten([circleStyle, circleColor])

    return <View style={styles.viewContainer}>
      <View style={styles.childContainer}>
        <Radio style={styles.radioStyle} checked={this.props.buttonSelected} onValueChange={() => clickable()} />
        <Text style={styles.textStyle}>{title}</Text>
      </View>
      {this.props.showCircle ? <View style={combineStyles} /> : <View />}
    </View>
  }
}
/*
<TouchableHighlight style={styles.touchableStyle} onPress={this.handleClick }>
</TouchableHighlight>
*/
const styles = StyleSheet.create({
  touchableStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: format_number(105, 'px')
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  radioStyle: {
    margin: format_number(7, 'px'),
    height: format_number(14, 'px'),
    width: format_number(14, 'px')
  },
  textStyle: {
    color: '#999999',
    fontSize: format_number(12, 'px'),
    fontFamily: 'Roboto'
  },
  circleStyle: {
    backgroundColor: 'red',
    height: format_number(12, 'px'),
    width: format_number(12, 'px'),
    borderRadius: format_number(6, 'px')
  }
})
