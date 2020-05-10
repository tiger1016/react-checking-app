// Libraries
import React from 'react'
import { Text, View } from 'react-native'

// Components
import Icon from '../CustomIcon'
import Loader from '../Loader'

// Styles
import styles from './styles'

export default props => <View style={styles.fullScreenTextOnly}>
  {props.spinner ? <View>
    <View style={styles.loaderContainer}>
      <Loader />
    </View>
  </View> : null}
  {props.error ? <View>
    <Icon name='alert' size={80} color='#9b405c' />
  </View> : null}
  <View >
    <Text style={[styles.text, (props.error ? { color: '#9b405c' } : {})]}>{props.text || (props.error ? 'Error' : 'Loading')}</Text>
  </View>
</View>
