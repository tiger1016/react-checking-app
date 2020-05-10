// Libraries
import _ from 'lodash'

// Models
import BaseModel from '../baseModel'

export default class SchedulerModel extends BaseModel {
  changeSchedulerView (state = {}, { view }) {
    return {
      ...state,
      error: null,
      loading: false,
      view
    }
  }

  clearBulkList (state = {}) {
    return {
      ...state,
      bulkList: []
    }
  }

  filterSchedulerWalks (state = {}, { payload }) {
    return {
      ...state,
      error: null,
      loading: false,
      filters: {
        ...state.filters,
        [payload.filterType.trim().toLowerCase()]: payload.value
      }
    }
  }

  selectAllWalks (state = {}, { selectAllWalks }) {
    return {
      ...state,
      selectAllWalks
    }
  }

  toggleFiltersView (state = {}, { showFilters }) {
    return {
      ...state,
      showFilters
    }
  }

  toggleWalkOnBulkList (state = {}, { walkId }) {
    var bulkList = state.bulkList.slice()
    if (_.indexOf(state.bulkList, walkId) > -1) {
      _.remove(bulkList, id => Number(id) === Number(walkId))
    } else {
      bulkList.push(walkId)
    }
    return {
      ...state,
      bulkList
    }
  }
}

export const schedulerModel = new SchedulerModel()
