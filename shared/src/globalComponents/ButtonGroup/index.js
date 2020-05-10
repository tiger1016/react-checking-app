// Libraries
import React from 'react'

// Components
import Button from '../Button'
import { View, StyleSheet } from 'react-native'
// Styles
import styles from './styles'

export default props => <View style={StyleSheet.flatten([styles.ButtonGroup, props.style])}>
  {props.buttons.filter(item => !item.hide).map((button, i) => <Button squared={props.squared} {...button} key={i} />)}
</View>
