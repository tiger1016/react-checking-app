// Libraries
import { StyleSheet, Dimensions } from 'react-native'
const styles = StyleSheet.create(
  {
    ModalTemplate: {
      borderRadius: 11,
      display: 'flex',
      flexDirection: 'column',
      height: Dimensions.get('window').height - (Dimensions.get('window').height * 10 / 100),
      width: Dimensions.get('window').width - (Dimensions.get('window').width * 10 / 100),
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#FFF'
    },
    ModalTemplate__ModalTemplate_header: {
      alignItems: 'stretch',
      backgroundColor: 'rgb(19, 77, 119)',
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 40,
      padding: 5,
      flexDirection: 'row'
    },
    ModalTemplate__ModalTemplate_body: {
      backgroundColor: '#FFF',
      display: 'flex',
      flex: 1,
      overflow: 'hidden',
      padding: 20
    },
    ModalTemplate__ModalTemplate_actions: {
      backgroundColor: '#FFF',
      paddingTop: 10
    },
    ModalTemplate__ModalTemplate_header__title: {
      alignItems: 'center',
      display: 'flex',
      flex: 1,
      padding: 10,
      justifyContent: 'flex-start',
      color: '#FFF'
    },
    ModalTemplate__ModalTemplate_header__close: {
      alignItems: 'center',
      display: 'flex',
      width: 40
    },
    ModalTemplate__ModalTemplate_actions__ButtonGroup: {
      justifyContent: 'flex-end'
    },
    ModalTemplate__ModalTemplate_header__close__button_container_text_only_icon_only__icon_only_button__icon_container__icon_wrapper__icon: {
      color: '#FFF'
    },
    ModalTemplate_span_pad10: {
      display: 'flex',
      width: 10
    },
    ModalTemplate__dualInput: {
      display: 'flex'
    }
  })

export default styles
