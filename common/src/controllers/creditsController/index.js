// Controllers
import BaseController from '../baseController'

// Selectors
import { creditsSelector } from '../../selectors'

class CreditsController extends BaseController {
  selectCreditsOfCustomer = (state = {}, customerId) => creditsSelector.creditsSelector(state).filter(r => Number(r.customer_id) === Number(customerId))

  selectCreditsUsedOfCustomer = (state = {}, customerId) => creditsSelector.creditsUsedSelector(state).filter(r => Number(r.customer_id) === Number(customerId))
}

export const creditsController = new CreditsController()
