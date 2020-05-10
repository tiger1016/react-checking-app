// Base init
import baseInit from './base-init'

export default {
  ...baseInit,
  bulkList: [],
  dailyViewHourlyDivisions: 60,
  dailyViewMinRowHeight: 40,
  dailyViewTotalHours: 24,
  dailyViewWalkerColumnWidth: 160,
  highlightWalkerAndColumn: { walkerId: null, columnData: {} },
  filters: {
    addons: [],
    customers: [],
    pets: [],
    search: [],
    services: [],
    statuses: [],
    walkers: []
  },
  selectAllWalks: false,
  selectedDate: null,
  showFilters: false,
  view: 'day',
  isDragging: false,
  dayViewXUnitWidth: 3
}
