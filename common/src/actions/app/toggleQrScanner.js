// Constants
import { TOGGLE_QR_SCANNER } from '../../constants/app/Actions'

export default ({ qrIsVisible = true }) => ({
  type: TOGGLE_QR_SCANNER,
  payload: { qrIsVisible }
})
