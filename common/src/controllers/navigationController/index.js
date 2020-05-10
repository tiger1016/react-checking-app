// Controllers
import BaseController from '../baseController'

// Constants
import {
  CUSTOMER_ROUTES,
  LICENSEE_ROUTES,
  WALKER_ROUTES
} from '../../constants/navigation/NavBarRoutes'

class NavigationController extends BaseController {
  navBarRoutes (navBarFor = 'licensee') {
    switch (navBarFor) {
      case 'customer':
        return CUSTOMER_ROUTES
      case 'licensee':
        return LICENSEE_ROUTES
      case 'scheduling_admin':
        return WALKER_ROUTES
      case 'full_scheduling_admin':
        return LICENSEE_ROUTES
      case 'walker':
        return WALKER_ROUTES
    }
    return []
  }
}

export const navigationController = new NavigationController()
