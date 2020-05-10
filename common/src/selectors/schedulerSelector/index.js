// Libraries
import { createSelector } from 'reselect'

// Base Selectors
export const bulkListSelector = state => state.scheduler.bulkList
export const dailyViewHourlyDivisionsSelector = state => state.scheduler.dailyViewHourlyDivisions
export const dailyViewMinRowHeightSelector = state => state.scheduler.dailyViewMinRowHeight
export const dailyViewTotalHoursSelector = state => state.scheduler.dailyViewTotalHours
export const dailyViewWalkerColumnWidthSelector = state => state.scheduler.dailyViewWalkerColumnWidth
export const errorSelector = state => state.scheduler.error
export const filtersSelector = state => state.scheduler.filters
export const loadingMessageSelector = state => state.scheduler.loadingMessage
export const loadingSelector = state => state.scheduler.loading
export const selectAllWalksSelector = state => state.scheduler.selectAllWalks
export const selectedDateSelector = state => state.scheduler.selectedDate
export const showFiltersSelector = state => state.scheduler.showFilters
export const viewSelector = state => state.scheduler.view
export const dayViewXUnitWidthSelector = state => state.scheduler.dayViewXUnitWidth

export const filtersAddonsSelector = createSelector(filtersSelector, filters => filters.addons)
export const filtersCustomersSelector = createSelector(filtersSelector, filters => filters.customers)
export const filtersPetsSelector = createSelector(filtersSelector, filters => filters.pets)
export const filtersSearchSelector = createSelector(filtersSelector, filters => filters.search)
export const filtersServicesSelector = createSelector(filtersSelector, filters => filters.services)
export const filtersStatusesSelector = createSelector(filtersSelector, filters => filters.statuses)
export const filtersWalkersSelector = createSelector(filtersSelector, filters => filters.walkers)
