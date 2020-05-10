// Libraries
import React from 'react'
import { View, Text } from 'react-native'
// Utils
import { utility } from '../../../utils'

// Controllers
import { appController } from '../../../controllers'

// Components
import Button from '../Button'

// Styles
import Styles from './styles'

export default props => {
  return <View style={Styles.ModalTemplate}>
    {!props.noHeader ? <View style={Styles.ModalTemplate__ModalTemplate_header}>
      <Text style={Styles.ModalTemplate__ModalTemplate_header__title}>{props.title}</Text>
      <View style={Styles.ModalTemplate__ModalTemplate_header__close}>
        <Button
          iconOnly='ios-close'
          onPress={() => { appController.closeModal() }}
          textOnly
          color={'#FFF'}
          size={30}
        />
      </View>
    </View> : null}
    <View style={Styles.ModalTemplate__ModalTemplate_body}>
      {props.children || (utility.isAFunction(props.body) ? props.body() : props.body)}
    </View>
    {props.actions ? <View style={Styles.ModalTemplate__ModalTemplate_actions}>
      {props.actions.filter(item => !item.hide).map((button, i) => <Button kind='squared' {...button} key={i} />)}
    </View> : null}
  </View>
}
