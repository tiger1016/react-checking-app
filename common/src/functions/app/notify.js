// Libraries
import { toast } from 'react-toastify'

/**
 * Opens notification
 * @param  {String} type    [description]
 * @param  {String} message [description]
 * @return {[type]}         [description]
 */
export default (type = '', message = '') => {
  switch (type) {
    case 'success':
      toast.success(message, { autoClose: 1000 })
      break
    case 'warn':
      toast.warn(message)
      break
    case 'error':
      toast.error(message, { autoClose: false })
      break
    case 'info':
      toast.info(message)
      break
    default:
      toast(message)
      break
  }
}
