// Libraries
import { createSelector } from 'reselect'

// Pure Selectors
export const dashboardSelector = state => state.dashboard
export const businessSnapshotSelector = state => state.dashboard.businessSnapshot
export const busyHoursSelector = state => state.dashboard.busyHours
export const customerBaseSelector = state => state.dashboard.customerBase
export const dailySnapshotSelector = state => state.dashboard.dailySnapshot
export const revenueSelector = state => state.dashboard.revenue
export const topZipsSelector = state => state.dashboard.topZips

export const selectBusinessSnapshotData = createSelector(
  businessSnapshotSelector,
  businessSnapshot => businessSnapshot.businessSnapshot
)
export const selectBusyHoursData = createSelector(
  busyHoursSelector,
  busyHours => busyHours.busyHours
)
export const selectCustomerBaseData = createSelector(
  customerBaseSelector,
  customerBase => customerBase.customerBase
)
export const selectDailySnapshotData = createSelector(
  dailySnapshotSelector,
  dailySnapshot => dailySnapshot.dailySnapshot
)
export const selectRevenueData = createSelector(
  revenueSelector,
  revenue => revenue.revenue
)
export const selectTopZipsData = createSelector(
  topZipsSelector,
  topZips => topZips.topZips
)
