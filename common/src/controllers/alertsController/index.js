// Utils
import { utility } from '../../utils/utility'

// Controllers
import BaseController from '../baseController'

class AlertsController extends BaseController {
  noAlerts (alerts = {}) {
    if (!utility.isAnArray(alerts.late) &&
      !utility.isAnArray(alerts.customer_requests) &&
      !utility.isAnArray(alerts.credit_card) &&
      !utility.isAnArray(alerts.total)) {
      return true
    }
    if (!alerts.late.length &&
      !alerts.customer_requests.length &&
      !alerts.credit_card.length &&
      !alerts.total.length) {
      return true
    }
  }
}

export const alertsController = new AlertsController()
