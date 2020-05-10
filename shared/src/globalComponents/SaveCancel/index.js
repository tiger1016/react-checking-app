// Libraries
import React from 'react'
import { View } from 'react-native'
// Components
import ButtonGroup from '../ButtonGroup'

// Styles
import Styles from './styles'

export default props => <View style={Styles.SaveCancel}><ButtonGroup buttons={[

  {
    hide: props.loading,
    // disabled: props.disabled,
    onPress: props.cancelOnClick,
    style: Styles.cancelButton,
    text: props.cancelText || 'Cancel',
    textOnly: true
  },
  {
    disabled: props.disabled,
    loading: props.loading,
    onPress: props.saveOnClick,
    style: Styles.saveButton,
    text: props.saveText || 'Save'
  }
]} /></View>
