// Libraries
import _ from 'lodash'

// Models
import BaseModel from '../baseModel'

export default class MapsModel extends BaseModel {
  /**
   * Updates maps, turns of loading & loading message, and resets error
   * @param  {Object} state          maps reducer state
   * @param  {Array} options.maps    Maps action payload
   * @return {Object}                Return new reducer state
   */
  updateMaps (state, { maps }) {
    const walkMaps = state.walk_maps.slice()
    const index = _.findIndex(walkMaps, map => Number(map.walk_id) === Number(maps.walk_id))
    if (index > -1) {
      walkMaps[index] = maps
    } else {
      walkMaps.push(maps)
    }
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      walk_maps: walkMaps,
      error: null
    }
  }
}

export const mapsModel = new MapsModel()
