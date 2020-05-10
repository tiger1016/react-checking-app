// Constants
import {
  CHANGE_SCHEDULER_VIEW,
  CLEAR_BULK_LIST,
  FILTER_SCHEDULER_WALKS,
  SELECT_ALL_WALKS,
  TOGGLE_FILTERS_VIEW,
  TOGGLE_WALK_ON_BULK_LIST,
  HIGHLIGHT_WALKER_AND_TIME,
  TOGGLE_IS_DRAGGING
} from '../constants/scheduler/Actions'

// Initial state
import initialstate from '../initialstate/scheduler-init'

// Model
import { schedulerModel } from '../models'

export default (state = initialstate, action) => {
  switch (action.type) {
    case CHANGE_SCHEDULER_VIEW:
      return schedulerModel.changeSchedulerView(state, { view: action.payload })
    case CLEAR_BULK_LIST:
      return schedulerModel.clearBulkList(state)
    case FILTER_SCHEDULER_WALKS:
      return schedulerModel.filterSchedulerWalks(state, { payload: action.payload })
    case SELECT_ALL_WALKS:
      return schedulerModel.selectAllWalks(state, { selectAllWalks: action.payload })
    case TOGGLE_WALK_ON_BULK_LIST:
      return schedulerModel.toggleWalkOnBulkList(state, { walkId: Number(action.payload) })
    case TOGGLE_FILTERS_VIEW:
      return schedulerModel.toggleFiltersView(state, { showFilters: action.payload })
    case TOGGLE_IS_DRAGGING:
      return {
        ...state,
        isDragging: action.payload
      }

    case HIGHLIGHT_WALKER_AND_TIME:
      return {
        ...state,
        highlightWalkerAndColumn: action.payload
      }
  }
  return state
}
