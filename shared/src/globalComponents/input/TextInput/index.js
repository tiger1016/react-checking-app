// Libraries
import React from 'react'
import { TextInput } from 'react-native'

// Utils
import { utility } from 'Utils/utility'

// Styles
import styles from './styles'

export default props => {
  const {
    noBorder,
    onChangeText,
    onFocus,
    placeholder,
    value
  } = props

  let style = styles.input
  if (noBorder) {
    style = styles.inputWithoutBorder
  }
  if (props.style) {
    const propStyle = utility.isAnArray(props.style) ? props.style : [props.style]
    style = [style, ...propStyle]
  }

  return <TextInput
    onChangeText={onChangeText}
    placeholder={placeholder}
    style={style}
    value={value}
    onFocus={onFocus}
  />
}
