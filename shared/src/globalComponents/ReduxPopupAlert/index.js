
// Libraries
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import Modal from '../Modal'
import Icon from '../CustomIcon'

import Styles from './styles'

export default class ReduxPopupAlert extends React.Component {
  render () {
    console.log('ReduxPopupAlert', this.props)
    return <Modal animationType={'fade'} transparent
      visible={this.props.show}
      onRequestClose={() => this.props.onCancel()} >
      <View style={Styles.closeButtonContainer}><TouchableOpacity onPress={this.props.onCancel ? this.props.onCancel : () => null} ><Icon name='close' size={24} color='#fff' /></TouchableOpacity></View>
      <View style={Styles.mainBody}>
        {!this.props.noIcon && <View style={Styles.mainIconContainer}><Icon style={Styles.mainIcon} name={this.props.icon || ''} /></View>}
        <Text style={Styles.alertText}>{this.props.text}</Text>
        {!this.props.noAction && <View style={Styles.actionContainer}>
          <TouchableOpacity onPress={() => this.props.onConfirm()} style={{ borderRadius: 5, flex: 1, backgroundColor: this.props.confirmButtonColor ? this.props.confirmButtonColor : '#ffa8a8', justifyContent: 'center', alignItems: 'center', marginRight: 20, marginLeft: 40 }}><Text style={{ color: '#fff' }}>{this.props.confirmButtonText ? this.props.confirmButtonText : ''}</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onCancel()} style={{ borderRadius: 5, flex: 1, backgroundColor: '#b2b2b2', justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginRight: 40 }} ><Text style={{ color: '#fff' }}>{this.props.cancelButtonText ? this.props.cancelButtonText : ''}</Text></TouchableOpacity>
        </View>}
      </View>
    </Modal>
  }
}
