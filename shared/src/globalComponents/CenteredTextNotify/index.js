// Libraries
import React from 'react'
import { Text, View } from 'react-native'
import Icon from '../CustomIcon'
// Styles
import styles from './styles'

export default props => <View style={styles.CenteredTextNotify}>
  <View style={styles.container}>
    <View style={styles.icon}><Icon name={props.icon} size={24} color='#999' /></View>
    <Text style={styles.text}>{props.text}</Text>
  </View>
</View>
