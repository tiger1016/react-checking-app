// Libraries
import _ from 'lodash'

// Models
import BaseModel from '../baseModel'

export default class PhotosModel extends BaseModel {
  /**
   * Updates photos, turns of loading & loading message, and resets error
   * @param  {Object} state          photos reducer state
   * @param  {Array} options.photos    Photos action payload
   * @return {Object}                Return new reducer state
   */
  updatePhotos (state, { photos }) {
    const walkPhotos = state.walk_photos.slice()
    const index = _.findIndex(walkPhotos, p => Number(p.walk_id) === Number(photos.walk_id))
    if (index > -1) {
      walkPhotos[index] = photos
    } else {
      walkPhotos.push(photos)
    }
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      walk_photos: walkPhotos,
      error: null
    }
  }
}

export const photosModel = new PhotosModel()
