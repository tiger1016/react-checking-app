// Controllers
import BaseController from '../baseController'

// Selectors
import { dashboardSelector } from '../../selectors'

class DashboardController extends BaseController {
  selectDailySnapshotData = (state = null) => dashboardSelector.selectDailySnapshotData(state)

  selectBusyHoursData = (state = null) => dashboardSelector.selectBusyHoursData(state)

  selectRevenueData = (state = null) => dashboardSelector.selectRevenueData(state)

  selectCustomerBaseData = (state = null) => dashboardSelector.selectCustomerBaseData(state)

  selectBusinessSnapshotData = (state = null) => dashboardSelector.selectBusinessSnapshotData(state)

  selectTopZipsData = (state = null) => dashboardSelector.selectTopZipsData(state)
}

export const dashboardController = new DashboardController()
