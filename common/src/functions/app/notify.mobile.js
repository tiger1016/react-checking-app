// Libraries
import { Toast } from 'native-base'

export default (type = '', message = '') => {
  Toast.show({ text: message, buttonText: 'Okay', duration: 3000, type: type, position: 'bottom' })
}
