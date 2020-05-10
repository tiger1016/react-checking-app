// Libraries
import React from 'react'
import {
  TouchableHighlight,
  Text,
  View
} from 'react-native'

// Components
import Icon from '../CustomIcon'

// Utils
import { utility } from 'Utils/utility'

// Styles
import styles from './styles'

export default props => {
  const {
    color,
    disabled,
    iconOnly,
    onPress,
    size,
    text
  } = props

  let style = styles.button
  if (props.kind === 'squared') {
    style = styles.buttonSquare
  }
  if (iconOnly) {
    style = styles.iconButton
  }
  if (props.style) {
    const propStyle = utility.isAnArray(props.style) ? props.style : [props.style]
    style = [style, ...propStyle]
  }

  return <TouchableHighlight
    disabled={disabled}
    onPress={onPress}
    style={style}>
    {iconOnly
      ? <View><Icon name={iconOnly} size={size} color={color} /></View>
      : <Text style={styles.buttonText}>{(text || 'missing props.text').toUpperCase()}</Text>}
  </TouchableHighlight>
}
