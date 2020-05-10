// Models
import BaseModel from '../baseModel'
import _ from 'lodash'

export default class WalksModel extends BaseModel {
  cancelWalk (state, { applyToAll, walkId }) {
    // TO DO: Apply to all
    const walks = state.walks.filter(w => Number(w.walk_id) !== Number(walkId))
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      walks
    }
  }

  cancelWalks (state, { walksIds }) {
    // TO DO: Apply to all
    const walks = state.walks.filter(w => {
      const walkIsToBeDeleted = walksIds.filter(id => Number(id) === Number(w.walk_id))
      return walkIsToBeDeleted.length > 0
    })
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      walks
    }
  }

  createWalk (state, { walk }) {
    const walks = [...state.walks, ...walk]

    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      walks
    }
  }

  updateWalk (state, { updatedWalk }) {
    if (!updatedWalk || updatedWalk.length === 0) {
      return {
        ...state,
        error: null,
        loading: false,
        loadingMessage: null,
        loadingEvent: null
      }
    }

    const oldWalks = state.walks.filter(w => {
      const duplicatedWalks = updatedWalk.filter(w2 => Number(w2.walk_id) === Number(w.walk_id))
      return duplicatedWalks.length < 1
    })
    const walks = [...oldWalks, ...updatedWalk]
    return {
      ...state,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      walks
    }
  }

  updateWalks (state, { endTime, startTime, newWalks }) { // eslint-disable-line camelcase
    const isCurrentUpdate = state.start_time === startTime

    return isCurrentUpdate ? {
      ...state,
      end_time: endTime,
      error: null,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      walks: _.cloneDeep(newWalks)
    } : state
  }

  updateFilter (state, payload) {
    return {
      ...state,
      ...payload
    }
  }
}

export const walksModel = new WalksModel()
