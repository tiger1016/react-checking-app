// Models
import BaseModel from '../baseModel'
import moment from 'moment'
import _ from 'lodash'

export default class ServicesModel extends BaseModel {
  /**
   * Adds newly created service to service array
   * @param  {Object} state               [description]
   * @param  {[type]} options.newService  [description]
   * @param  {[type]} options.tempService [description]
   * @return {[type]}                     [description]
   */
  createService (state = {}, { newService, tempService }) {
    const services = state.services.map(s => {
      if (s.id === tempService.id) {
        newService.newAdded = true
        return newService
      }
      return s
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services
    }
  }

  /**
   * Pushes a placeholder service to be edited and later submited to api
   * for save
   * @param  {Object} state           [description]
   * @param  {[type]} options.service [description]
   * @return {[type]}                 [description]
   */
  newTempService (state = {}, { service }) {
    const services = [...state.services]
    services.unshift(service)
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services
    }
  }

  /**
   * [removeTempServices description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  removeTempServices (state = {}) {
    const services = state.services.filter(s => !s.new)
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services
    }
  }

  /**
   * [removeTempServices description]
   * @param  {Object} state [description]
   * @return {[type]}       [description]
   */
  removeServices (state = {}, { service }) {
    const services = state.services.filter(s => Number(s.id) !== Number(service))
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services
    }
  }

  /**
  * [archiveService description]
  * @param  {Object} state          [description]
  * @param  {[type]} options.serviceId [description]
  * @return {[type]}                [description]
  */
  archiveService (state = {}, { serviceId }) {
    const services = state.services.map(s => {
      if (Number(s.id) === Number(serviceId)) {
        s.archived = s.archived === '1' ? '0' : '1'
      }
      return s
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services
    }
  }

  /**
   * Updates a single service
   * @param  {Object} state           [description]
   * @param  {[type]} options.service [description]
   * @return {[type]}                 [description]
   */
  updateService (state = {}, { service, oldServiceId }) {
    const _services = _.cloneDeep(state.services)
    const index = _services.findIndex(s => `${s.id}` === `${oldServiceId || service.id}`)
    const _tempLengthArray = moment(service.length, 'H:mm:ss')
    if (_tempLengthArray.isValid()) {
      service.lengthHours = _tempLengthArray.format('H')
      service.lengthMinutes = _tempLengthArray.format('mm')
    }

    if (index !== -1) {
      _services[index] = service
    } else {
      _services.push(service)
    }

    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services: _.cloneDeep(_services)
    }
  }

  /**
   * Updates services, turns of loading & loading message, and resets error
   * @param  {Object} state               services reducer state
   * @param  {Array} options.services     Services action payload
   * @return {Object}                     Return new reducer state
   */
  updateServices (state = {}, { services }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services
    }
  }

  editService (state = {}, { service }) {
    const services = state.services.map(s => {
      if (s.id === service.id) {
        return service
      }
      return s
    })
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      services
    }
  }

  sortService (state = {}, { sortBy }) {
    return {
      ...state,
      loading: false,
      loadingMessage: null,
      error: null,
      sortBy
    }
  }

  serviceRejected (state = {}, { error }) {
    const _TempState = { ...state }
    _TempState.services.forEach(service => {
      if (service.editMode) {
        service.editMode = false
      }
    })
    return {
      ..._TempState,
      loading: false,
      loadingMessage: null,
      loadingEvent: null,
      error
    }
  }
}

export const servicesModel = new ServicesModel()
