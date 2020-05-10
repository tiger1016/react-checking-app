// Libraries
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default props => <View style={styles.container}>
  <Text style={styles.text}>{props.text}</Text>
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(160,182,206,1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold'
  }
})
